import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Sparkles, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OutputCard } from "@/components/shared/OutputCard";
import { CopyButton } from "@/components/shared/CopyButton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LayoutContext {
  openSidebar: () => void;
}

export default function GenerateText() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setOutput("");
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-text", {
        body: { prompt },
      });

      if (error) {
        throw new Error(error.message || "Failed to generate text");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setOutput(data.text || "No response generated");
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header onMenuClick={openSidebar} title="Generate Text" />
      
      <div className="flex-1 p-4 lg:p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Input Section */}
        <div className="space-y-4">
          <Textarea
            placeholder="Enter your prompt here... What would you like me to write?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[140px]"
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
                <Sparkles className="w-5 h-5" />
                Generate
              </>
            )}
          </Button>
        </div>

        {/* Output Section */}
        <OutputCard isEmpty={!output} emptyMessage="Your generated text will appear here.">
          {output && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <CopyButton text={output} />
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                  {output}
                </p>
              </div>
            </div>
          )}
        </OutputCard>
      </div>
    </div>
  );
}
