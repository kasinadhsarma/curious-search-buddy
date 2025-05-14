
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileUp, X, File, Search } from "lucide-react";
import { toast } from "sonner";

interface FileUploadInputProps {
  onFileContent: (content: string, filename: string) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ onFileContent }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file type - only accept text files for now
      if (!selectedFile.type.match('text.*') && 
          selectedFile.type !== 'application/pdf' && 
          selectedFile.type !== 'application/json') {
        toast.error("Only text, PDF, and JSON files are supported");
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    try {
      // For text files, read directly
      if (file.type.match('text.*') || file.type === 'application/json') {
        const content = await file.text();
        onFileContent(content, file.name);
        toast.success("File processed successfully");
      }
      // For PDF files, you would need a PDF parsing library
      // Here we just show a message that it's not fully implemented
      else if (file.type === 'application/pdf') {
        toast.info("PDF processing functionality would be implemented with a PDF parsing library");
        onFileContent(`Content from PDF file: ${file.name}`, file.name);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Error processing file");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.pdf,.json"
      />
      
      {!file ? (
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            Upload a file to search within its contents
          </p>
          <Button onClick={handleUploadClick} variant="outline">
            Select File
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Supports TXT, PDF, JSON (up to 5MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <File className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 rounded-full p-0"
              onClick={clearFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            className="w-full"
            onClick={processFile}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Search className="h-4 w-4 mr-2" />
                <span>Search in Document</span>
              </div>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
