
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, X } from "lucide-react";
import { toast } from "sonner";

interface VoiceSearchInputProps {
  onTranscription: (text: string) => void;
}

const VoiceSearchInput: React.FC<VoiceSearchInputProps> = ({ onTranscription }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setTranscript(currentTranscript);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast.error("Speech recognition error: " + event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      // Submit the transcript if any
      if (transcript.trim()) {
        onTranscription(transcript.trim());
      }
    } else {
      setTranscript("");
      recognition.start();
      setIsListening(true);
      toast.info("Listening...");
    }
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  const submitTranscript = () => {
    if (transcript.trim()) {
      onTranscription(transcript.trim());
      setTranscript("");
      if (isListening) {
        recognition.stop();
        setIsListening(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {transcript && (
        <div className="relative mb-4 p-4 border rounded-md bg-background">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 h-6 w-6 rounded-full p-0"
            onClick={clearTranscript}
          >
            <X className="h-3 w-3" />
          </Button>
          <p className="pr-6">{transcript}</p>
          {transcript.trim() && (
            <Button 
              size="sm" 
              className="mt-2"
              onClick={submitTranscript}
            >
              Search
            </Button>
          )}
        </div>
      )}
      <div className="flex justify-center">
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="lg"
          className="rounded-full h-14 w-14 flex items-center justify-center"
          onClick={toggleListening}
        >
          {isListening ? (
            <MicOff className="h-6 w-6" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      </div>
      <div className="text-center mt-2 text-sm text-muted-foreground">
        {isListening ? "Tap to stop" : "Tap to speak"}
      </div>
    </div>
  );
};

export default VoiceSearchInput;
