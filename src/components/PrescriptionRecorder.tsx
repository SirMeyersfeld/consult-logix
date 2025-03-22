import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Download, Type, FileText, Save } from "lucide-react";
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { processTranscript, generatePrescriptionSuggestion, saveRecording, getRecordings, isSpeechRecognitionSupported } from '@/utils/transcriptionUtils';

const PrescriptionRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingName, setRecordingName] = useState('');
  const [rawTranscript, setRawTranscript] = useState('');
  const [processedTranscript, setProcessedTranscript] = useState('');
  const [prescriptionSuggestion, setPrescriptionSuggestion] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordings, setRecordings] = useState<Array<{name: string, url: string, date: string, doctor: string, transcript?: string}>>([]);
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fullTranscriptRef = useRef<string>('');
  
  useEffect(() => {
    const savedRecordings = getRecordings();
    if (savedRecordings.length > 0) {
      setRecordings(savedRecordings);
    } else {
      setRecordings([
        {
          name: "Initial Consultation", 
          url: "#", 
          date: "2024-04-15",
          doctor: "Dr. Sarah Johnson",
          transcript: "PRESCRIPTION: Loratadine 10mg daily for allergies. DIAGNOSIS: Seasonal rhinitis. INSTRUCTIONS: Take in the morning with water."
        },
        {
          name: "Follow-up Appointment", 
          url: "#", 
          date: "2024-05-02",
          doctor: "Dr. Michael Chen",
          transcript: "FOLLOW-UP: Allergy symptoms improved. CONTINUE: Current regimen for two weeks. NEXT APPOINTMENT: In one month if symptoms persist."
        }
      ]);
    }
  }, []);
  
  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      toast.error("Speech recognition is not supported in this browser");
      return;
    }
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          fullTranscriptRef.current += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        const processed = processTranscript(fullTranscriptRef.current);
        setProcessedTranscript(processed);
      }
      
      setRawTranscript(fullTranscriptRef.current);
    };
    
    recognitionRef.current.onerror = (event: Event) => {
      console.error('Speech recognition error', event);
      if (event.type === 'error' && 'error' in event && event.error === 'not-allowed') {
        toast.error("Microphone access was denied. Please allow microphone access to use transcription.");
      }
    };
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  
  const startRecording = async () => {
    audioChunksRef.current = [];
    fullTranscriptRef.current = '';
    setRawTranscript('');
    setProcessedTranscript('');
    setPrescriptionSuggestion('');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setRecordingStatus('stopped');
        
        stream.getTracks().forEach(track => track.stop());
        
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsTranscribing(false);
        }
        
        if (processedTranscript) {
          setIsGeneratingSuggestion(true);
          setTimeout(() => {
            const suggestion = generatePrescriptionSuggestion(processedTranscript);
            setPrescriptionSuggestion(suggestion);
            setIsGeneratingSuggestion(false);
          }, 1500);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStatus('recording');
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsTranscribing(true);
      }
      
      toast.info("Recording started");
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording saved");
    }
  };
  
  const saveRecordingData = () => {
    if (audioURL && recordingName.trim()) {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10);
      
      const subscriptionType = localStorage.getItem("subscriptionPlan") || "patient";
      const doctorName = subscriptionType === "doctor" 
        ? localStorage.getItem("userEmail") || "Doctor" 
        : "Self-recorded";
      
      const newRecording = {
        name: recordingName,
        url: audioURL,
        date: formattedDate,
        doctor: doctorName,
        transcript: processedTranscript || rawTranscript || undefined
      };
      
      const updatedRecordings = saveRecording(newRecording);
      setRecordings(updatedRecordings);
      
      setRecordingName('');
      setAudioURL(null);
      setRecordingStatus('idle');
      setRawTranscript('');
      setProcessedTranscript('');
      setPrescriptionSuggestion('');
      toast.success(`Recording "${recordingName}" saved successfully`);
    } else {
      toast.error("Please enter a name for the recording");
    }
  };
  
  const downloadRecording = (url: string, name: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const downloadTranscript = (transcript: string, name: string) => {
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}_transcript.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleTranscriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProcessedTranscript(e.target.value);
    
    if (e.target.value.length > 20) {
      setIsGeneratingSuggestion(true);
      setTimeout(() => {
        const suggestion = generatePrescriptionSuggestion(e.target.value);
        setPrescriptionSuggestion(suggestion);
        setIsGeneratingSuggestion(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 rounded-lg p-5 mb-6">
        <h4 className="font-medium mb-3">Record a Medical Consultation</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Record important details from your doctor visits. Our AI will extract prescription-related information and suggest a structured prescription.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              variant={isRecording ? "destructive" : "default"}
              className="flex items-center gap-2"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <Square size={18} /> : <Mic size={18} />}
              {isRecording ? "Stop Recording" : "Record Consultation"}
            </Button>
            
            {recordingStatus === 'recording' && (
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm text-red-500">
                  {isTranscribing ? 'Recording & Extracting Keywords...' : 'Recording...'}
                </span>
              </div>
            )}
          </div>
          
          {isTranscribing && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Type size={16} className="mr-2" />
              Automatic medical keyword extraction active
            </div>
          )}
          
          {processedTranscript && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium">Structured Medical Information:</h5>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => downloadTranscript(processedTranscript, recordingName || 'medical-notes')}
                >
                  <FileText size={14} className="mr-1" />
                  Save as Text
                </Button>
              </div>
              <Textarea 
                value={processedTranscript} 
                onChange={handleTranscriptChange}
                className="min-h-[120px] text-sm font-mono"
                placeholder="Medical information will appear here..."
              />
            </div>
          )}
          
          {isGeneratingSuggestion && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
              <span className="text-sm text-muted-foreground">Generating prescription suggestion...</span>
            </div>
          )}
          
          {prescriptionSuggestion && (
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-md">
              <h5 className="text-sm font-medium mb-2 text-primary">AI-Generated Prescription Suggestion:</h5>
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {prescriptionSuggestion}
              </pre>
            </div>
          )}
          
          {rawTranscript && !processedTranscript && (
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Raw Transcript:</h5>
              <Textarea 
                value={rawTranscript} 
                onChange={(e) => setRawTranscript(e.target.value)}
                className="min-h-[100px] text-sm opacity-60"
                placeholder="No medical keywords detected in the transcript..."
              />
            </div>
          )}
          
          {audioURL && (
            <div className="space-y-3 mt-4 p-3 bg-secondary/30 rounded-md">
              <audio src={audioURL} controls className="w-full" />
              
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Enter recording name"
                  value={recordingName}
                  onChange={(e) => setRecordingName(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="default" 
                  className="flex items-center gap-1"
                  onClick={saveRecordingData}
                >
                  <Save size={16} />
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-4">Your Medical Recordings</h4>
        {recordings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recording</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recordings.map((recording, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div>
                      {recording.name}
                      {recording.transcript && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {recording.transcript}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{recording.doctor}</TableCell>
                  <TableCell>
                    {new Date(recording.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Play size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => downloadRecording(recording.url, recording.name)}
                      >
                        <Download size={16} />
                      </Button>
                      {recording.transcript && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => downloadTranscript(recording.transcript || '', recording.name)}
                        >
                          <FileText size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No recordings yet</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2"
              onClick={startRecording}
            >
              <Mic size={16} className="mr-2" />
              Record your first consultation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionRecorder;
