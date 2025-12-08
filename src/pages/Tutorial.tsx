import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronRight, ChevronLeft, X, Type, Image, Code, Copy, Download, Github } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutContext {
  openSidebar: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to AI Studio",
    icon: null,
    content: "This tutorial will guide you through all the features of AI Studio. You can access this tutorial anytime from the sidebar menu.",
  },
  {
    title: "Generate Text",
    icon: Type,
    content: "Enter a prompt describing what you want to write, then click Generate. The AI will create text content based on your description. Use this for articles, stories, emails, or any written content.",
  },
  {
    title: "Generate Images",
    icon: Image,
    content: "Describe the image you want to create in detail. The more specific your description, the better the results. Click Generate to create your image.",
  },
  {
    title: "Generate Code",
    icon: Code,
    content: "Describe the functionality you need, and the AI will generate code for you. Specify the programming language and any specific requirements in your prompt.",
  },
  {
    title: "Copy Content",
    icon: Copy,
    content: "After generating text or code, click the Copy button to copy the content to your clipboard. You can then paste it anywhere you need.",
  },
  {
    title: "Download Images",
    icon: Download,
    content: "Generated images can be downloaded directly to your device. Click the Download button to save the image file.",
  },
  {
    title: "Share to GitHub",
    icon: Github,
    content: "Share your generated code directly to GitHub Gist. This opens a new tab where you can create a public or private gist with your code.",
  },
];

export default function Tutorial() {
  const { openSidebar } = useOutletContext<LayoutContext>();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <div className="flex flex-col h-full">
      <Header onMenuClick={openSidebar} title="Tutorial" />
      
      <div className="flex-1 p-4 lg:p-6 max-w-4xl mx-auto w-full">
        {/* Tutorial Cards */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Learn AI Studio</h2>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {tutorialSteps.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>

          {/* Current Step Card */}
          <div className="glass rounded-2xl p-8 space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
              {step.icon && (
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <step.icon className="w-8 h-8" />
                </div>
              )}
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {step.content}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === tutorialSteps.length - 1}
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Interactive Overlay Button */}
          <div className="pt-6 border-t border-border">
            <Button
              variant="glow"
              size="lg"
              className="w-full"
              onClick={() => setShowOverlay(true)}
            >
              Try Interactive Walkthrough
            </Button>
          </div>
        </div>
      </div>

      {/* Tutorial Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="max-w-md space-y-6">
              <div className={cn(
                "p-4 rounded-2xl border-2 border-dashed",
                currentStep === 0 ? "border-primary glow-primary" : "border-border"
              )}>
                {step.icon && <step.icon className="w-16 h-16 mx-auto text-primary mb-4" />}
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.content}</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                {currentStep === tutorialSteps.length - 1 ? (
                  <Button onClick={() => setShowOverlay(false)}>
                    Finish
                  </Button>
                ) : (
                  <Button onClick={nextStep}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">
                {currentStep + 1} / {tutorialSteps.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
