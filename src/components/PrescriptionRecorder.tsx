import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Download, Type } from "lucide-react";
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const PrescriptionRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingName, setRecordingName] = useState('');
  const [transcript, setTranscript] = useState('');
  const [processedTranscript, setProcessedTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [recordings, setRecordings] = useState<Array<{name: string, url: string, date: string, doctor: string, transcript?: string}>>([
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
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fullTranscriptRef = useRef<string>('');
  
  // List of medical and prescription-related keywords to highlight
  const keywordPatterns = [
    // Medications and dosages
    /\b\d+\s*mg\b/i, /\b\d+\s*mcg\b/i, /\b\d+\s*ml\b/i, /\b\d+\s*tablets?\b/i, 
    /\b\d+\s*capsules?\b/i, /\b\d+\s*times?\s*daily\b/i, /\b\d+\s*times?\s*a\s*day\b/i,
    /\btake\s+\w+\b/i, /\btablet(s)?\b/i, /\bcapsule(s)?\b/i, /\bpill(s)?\b/i,
    
    // Common prescription medications
    /\b(amoxicillin|lisinopril|metformin|atorvastatin|amlodipine|losartan|albuterol|omeprazole|levothyroxine|gabapentin)\b/i,
    
    // Instructions and timing
    /\b(before|after|with)\s+meals?\b/i, /\b(before|at|after)\s+bedtime\b/i, /\bon\s+an\s+empty\s+stomach\b/i,
    /\bevery\s+\d+\s+hours?\b/i, /\btwice\s+daily\b/i, /\bonce\s+daily\b/i, /\bthree\s+times\s+daily\b/i,
    
    // Medical terms and sections
    /\bprescri(be|ption|bed)\b/i, /\bdiagnosis\b/i, /\btreatment\b/i, /\bfollow[\s-]up\b/i,
    /\bsymptoms?\b/i, /\ballerg(y|ies|ic)\b/i, /\bside[\s-]effects?\b/i, /\bdosage\b/i,
    /\binstructions?\b/i, /\bcontinue\b/i, /\bnext\s+appointment\b/i, /\breferral\b/i,
    /\blab\s+test(s)?\b/i, /\bblood\s+test(s)?\b/i, /\bx[\s-]ray\b/i, /\bscan\b/i,
    
    // Duration terms
    /\bfor\s+\d+\s+(day|week|month)(s)?\b/i, /\buntil\s+\w+\b/i,
    
    // Routes of administration
    /\boral(ly)?\b/i, /\btopical(ly)?\b/i, /\binject(ion|able)\b/i, /\binhal(er|e|ation)\b/i
  ];
  
  // Function to extract and highlight medical keywords
  const extractKeywords = (text: string): string => {
    if (!text) return '';
    
    // Split the text into sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let keywordResults: string[] = [];
    
    sentences.forEach(sentence => {
      const trimmedSentence = sentence.trim();
      // Check if the sentence contains any of our keywords
      if (keywordPatterns.some(pattern => pattern.test(trimmedSentence))) {
        // Identify the specific categories present
        if (/\bprescri(be|ption|bed)\b/i.test(trimmedSentence)) {
          keywordResults.push(`PRESCRIPTION: ${trimmedSentence}`);
        } else if (/\bdiagnosis\b/i.test(trimmedSentence)) {
          keywordResults.push(`DIAGNOSIS: ${trimmedSentence}`);
        } else if (/\bfollow[\s-]up\b/i.test(trimmedSentence)) {
          keywordResults.push(`FOLLOW-UP: ${trimmedSentence}`);
        } else if (/\binstruction/i.test(trimmedSentence)) {
          keywordResults.push(`INSTRUCTIONS: ${trimmedSentence}`);
        } else if (/\b(take|dosage|mg|tablet|capsule|pill)/i.test(trimmedSentence)) {
          keywordResults.push(`MEDICATION: ${trimmedSentence}`);
        } else {
          keywordResults.push(trimmedSentence); // Other medical-related sentences
        }
      }
    });
    
    return keywordResults.join('. ');
  };
  
  // Initialize speech recognition
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
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
        // Process the transcript to extract medical keywords
        const keywords = extractKeywords(fullTranscriptRef.current);
        setProcessedTranscript(keywords);
      }
      
      // Keep the original transcript for reference
      setTranscript(fullTranscriptRef.current);
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
    setTranscript('');
    setProcessedTranscript('');
    
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
        
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
        
        // Stop transcription
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          setIsTranscribing(false);
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStatus('recording');
      
      // Start transcription if supported
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
  
  const saveRecording = () => {
    if (audioURL && recordingName.trim()) {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10);
      
      // Get subscription type from localStorage
      const subscriptionType = localStorage.getItem("subscriptionPlan") || "patient";
      const doctorName = subscriptionType === "doctor" 
        ? localStorage.getItem("userEmail") || "Doctor" 
        : "Self-recorded";
      
      const newRecording = {
        name: recordingName,
        url: audioURL,
        date: formattedDate,
        doctor: doctorName,
        transcript: processedTranscript || transcript || undefined
      };
      
      setRecordings(prev => [...prev, newRecording]);
      setRecordingName('');
      setAudioURL(null);
      setRecordingStatus('idle');
      setTranscript('');
      setProcessedTranscript('');
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

  return (
    <div className="space-y-6">
      <div className="bg-secondary/30 rounded-lg p-5 mb-6">
        <h4 className="font-medium mb-3">Record a Medical Consultation</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Record important details from your doctor visits. Only prescription-related keywords will be highlighted in the transcript.
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
              Keywords extraction is active
            </div>
          )}
          
          {processedTranscript && (
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Prescription Keywords:</h5>
              <Textarea 
                value={processedTranscript} 
                onChange={(e) => setProcessedTranscript(e.target.value)}
                className="min-h-[100px] text-sm"
                placeholder="Prescription keywords will appear here..."
              />
            </div>
          )}
          
          {transcript && !processedTranscript && (
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">Full Transcript:</h5>
              <Textarea 
                value={transcript} 
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[100px] text-sm opacity-60"
                placeholder="No medical keywords detected in the transcript..."
              />
            </div>
          )}
          
          {audioURL && (
            <div className="space-y-3 mt-4 p-3 bg-secondary/30 rounded-md">
              <audio src={audioURL} controls className="w-full" />
              
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter recording name"
                  value={recordingName}
                  onChange={(e) => setRecordingName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button variant="outline" onClick={saveRecording}>Save</Button>
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
