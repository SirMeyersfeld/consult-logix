
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Play, Square, Download } from "lucide-react";
import { toast } from 'sonner';

const PrescriptionRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [recordingName, setRecordingName] = useState('');
  const [recordings, setRecordings] = useState<Array<{name: string, url: string}>>([]);
  
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
      const newRecording = {
        name: recordingName,
        url: audioURL
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
    <Card className="p-6 shadow-md border border-border/50">
      <h3 className="text-xl font-semibold mb-4">Audio Consultation Recorder</h3>
      
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
        
        {recordings.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Saved Recordings</h4>
            <div className="space-y-2">
              {recordings.map((recording, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-md">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{recording.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <audio src={recording.url} controls className="w-48 h-8" />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => downloadRecording(recording.url, recording.name)}
                      className="flex items-center gap-1"
                    >
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PrescriptionRecorder;
