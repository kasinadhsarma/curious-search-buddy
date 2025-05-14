
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SearchResult, Source } from "@/types/search";

interface ResultCardProps {
  result: SearchResult;
}

const SourceCitation: React.FC<{ source: Source }> = ({ source }) => {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border rounded-md hover:bg-accent transition-colors mb-2"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-sm line-clamp-1">{source.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-1">{source.url}</p>
        </div>
      </div>
    </a>
  );
};

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  // Function to render markdown-like content with proper formatting
  const renderContent = (content: string) => {
    // Split content by newlines to handle paragraphs
    return content.split('\n\n').map((paragraph, idx) => {
      // Replace ** with bold
      let formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Replace * with italic
      formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      return (
        <p 
          key={idx} 
          className="mb-4" 
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">{result.query}</h2>
        
        <div className="prose max-w-none mb-6">
          {renderContent(result.content)}
        </div>
        
        {result.sources.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Sources</h3>
            <div className="space-y-2">
              {result.sources.map((source, index) => (
                <SourceCitation key={index} source={source} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;
