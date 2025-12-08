import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Code, Loader2, Github } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OutputCard } from "@/components/shared/OutputCard";
import { CopyButton } from "@/components/shared/CopyButton";
import { toast } from "@/hooks/use-toast";

interface LayoutContext {
  openSidebar: () => void;
}

export default function GenerateCode() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // Simulated API call - replace with actual code generation API
    setTimeout(() => {
      setOutput(
`// Generated code based on: "${prompt}"

function generateResponse(input: string): string {
  // Process the input
  const processed = input.trim().toLowerCase();
  
  // Generate a response
  const responses = {
    greeting: "Hello! How can I help you today?",
    farewell: "Goodbye! Have a great day!",
    default: "I understand. Let me help you with that."
  };
  
  if (processed.includes("hello") || processed.includes("hi")) {
    return responses.greeting;
  }
  
  if (processed.includes("bye") || processed.includes("goodbye")) {
    return responses.farewell;
  }
  
  return responses.default;
}

// Example usage
const result = generateResponse("${prompt}");
console.log(result);`
      );
      setIsLoading(false);
    }, 1500);
  };

  const handleShareToGithub = () => {
    if (!output) return;
    
    const gistContent = encodeURIComponent(output);
    const gistUrl = `https://gist.github.com/?filename=generated-code.ts&description=AI%20Generated%20Code&content=${gistContent}`;
    window.open(gistUrl, "_blank");
    
    toast({
      title: "Opening GitHub Gist",
      description: "Create a new gist with your code.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <Header onMenuClick={openSidebar} title="Generate Code" />
      
      <div className="flex-1 p-4 lg:p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Input Section */}
        <div className="space-y-4">
          <Textarea
            placeholder="Describe the code you need... What function or feature should it implement?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px]"
          />
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full lg:w-auto"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Code className="w-5 h-5" />
                Generate
              </>
            )}
          </Button>
        </div>

        {/* Output Section */}
        <OutputCard isEmpty={!output} emptyMessage="Your generated code will appear here.">
          {output && (
            <div className="space-y-4">
              <div className="flex gap-2 justify-end flex-wrap">
                <CopyButton text={output} />
                <Button variant="outline" size="sm" onClick={handleShareToGithub}>
                  <Github className="w-4 h-4" />
                  Share to GitHub
                </Button>
              </div>
              <pre className="bg-background/50 rounded-xl p-4 overflow-x-auto">
                <code className="text-sm text-foreground/90 font-mono whitespace-pre">
                  {output}
                </code>
              </pre>
            </div>
          )}
        </OutputCard>
      </div>
    </div>
  );
}
