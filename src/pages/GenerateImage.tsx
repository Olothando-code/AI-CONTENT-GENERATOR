import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ImageIcon, Loader2, Download } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { OutputCard } from "@/components/shared/OutputCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface LayoutContext {
  openSidebar: () => void;
}

export default function GenerateImage() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setImageUrl("");
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt },
      });

      if (error) {
        throw new Error(error.message || "Failed to generate image");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        toast({
          title: "Image generated!",
          description: "Your AI-generated image is ready.",
        });
      } else {
        throw new Error("No image was generated");
      }
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

  const handleDownload = async () => {
    if (!imageUrl) return;
    
    try {
      // For base64 images, create a download link directly
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Downloaded!",
        description: "Image saved to your device.",
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header onMenuClick={openSidebar} title="Generate Image" />
      
      <div className="flex-1 p-4 lg:p-6 space-y-6 max-w-4xl mx-auto w-full">
        {/* Input Section */}
        <div className="space-y-4">
          <Textarea
            placeholder="Describe the image you want to create... Be as detailed as possible!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[120px]"
          />
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full lg:w-auto"
            size="lg"
            variant="accent"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Generate
              </>
            )}
          </Button>
        </div>

        {/* Output Section */}
        <OutputCard isEmpty={!imageUrl} emptyMessage="Your generated image will appear here.">
          {imageUrl && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button variant="secondary" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={imageUrl}
                  alt="AI Generated"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}
        </OutputCard>
      </div>
    </div>
  );
}
