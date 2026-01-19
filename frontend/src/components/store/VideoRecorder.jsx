import { useState, useRef, useCallback } from 'react';
import { Video, StopCircle, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const VideoRecorder = ({ onVideoRecorded, orderId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
        audio: true
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Nie można uzyskać dostępu do kamery. Sprawdź uprawnienia.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startRecording = useCallback(async () => {
    if (!stream) {
      await startCamera();
      return;
    }

    chunksRef.current = [];
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9'
    });
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedBlob(blob);
      setRecordedUrl(URL.createObjectURL(blob));
      stopCamera();
    };
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000);
    setIsRecording(true);
  }, [stream, startCamera, stopCamera]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const retryRecording = useCallback(() => {
    setRecordedBlob(null);
    setRecordedUrl(null);
    startCamera();
  }, [startCamera]);

  const confirmRecording = useCallback(() => {
    if (recordedBlob && onVideoRecorded) {
      onVideoRecorded(recordedBlob, orderId);
    }
  }, [recordedBlob, onVideoRecorded, orderId]);

  // Initialize camera on mount
  useState(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Video className="w-5 h-5 text-primary" />
          Nagranie weryfikacyjne
        </CardTitle>
        <CardDescription>
          Nagraj krótkie wideo, pokazując twarz i potwierdzając zamówienie
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Instructions */}
        <Alert className="bg-primary/5 border-primary/20">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-sm text-foreground">
            <strong>Co powinieneś zrobić:</strong>
            <ul className="mt-2 space-y-1 text-muted-foreground">
              <li>• Pokaż wyraźnie swoją twarz</li>
              <li>• Powiedz: "Potwierdzam zamówienie numer {orderId}"</li>
              <li>• Nagranie powinno trwać 5-10 sekund</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Video container */}
        <div className="video-container aspect-video bg-muted rounded-lg overflow-hidden relative">
          {recordedUrl ? (
            <video 
              src={recordedUrl} 
              controls 
              className="w-full h-full object-cover"
            />
          ) : (
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              playsInline
              className="w-full h-full object-cover mirror"
              style={{ transform: 'scaleX(-1)' }}
            />
          )}
          
          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-destructive/90 rounded-full">
              <div className="recording-indicator" />
              <span className="text-sm font-medium text-destructive-foreground">REC</span>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!recordedUrl ? (
            <>
              {!isRecording ? (
                <Button 
                  onClick={stream ? startRecording : startCamera}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Video className="w-4 h-4 mr-2" />
                  {stream ? 'Rozpocznij nagrywanie' : 'Włącz kamerę'}
                </Button>
              ) : (
                <Button 
                  onClick={stopRecording}
                  variant="destructive"
                >
                  <StopCircle className="w-4 h-4 mr-2" />
                  Zatrzymaj nagrywanie
                </Button>
              )}
            </>
          ) : (
            <>
              <Button 
                onClick={retryRecording}
                variant="outline"
                className="border-border hover:bg-muted"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Nagraj ponownie
              </Button>
              <Button 
                onClick={confirmRecording}
                className="bg-success text-success-foreground hover:bg-success/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Zatwierdź nagranie
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoRecorder;
