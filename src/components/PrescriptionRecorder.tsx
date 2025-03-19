
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Download } from "lucide-react";
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const PrescriptionRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingName, setRecordingName] = useState('');
  const [recordings, setRecordings] = useState<Array<{name: string, url: string, date: string, doctor: string}>>([
    {
      name: "Initial Consultation", 
      url: "#", 
      date: "2024-04-15",
      doctor: "Dr. Sarah Johnson"
    },
    {
      name: "Follow-up Appointment", 
      url: "#", 
      date: "2024-05-02",
      doctor: "Dr. Michael Chen"
    }
  ]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  
  const startRecording = async () => {
    audioChunksRef.current = [];
    
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
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingStatus('recording');
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
      
      const newRecording = {
        name: recordingName,
        url: audioURL,
        date: formattedDate,
        doctor: "Self-recorded" // Default for self-recordings
      };
      
      setRecordings(prev => [...prev, newRecording]);
      setRecordingName('');
      setAudioURL(null);
      setRecordingStatus('idle');
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
          Record important details from your doctor visits. These recordings are securely stored in your personal health record.
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
                <span className="text-sm text-red-500">Recording...</span>
              </div>
            )}
          </div>
          
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
                  <TableCell className="font-medium">{recording.name}</TableCell>
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
