'use client';
import { useState } from 'react';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { composeEssay, type ComposeEssayInput } from '@/ai/flows/compose-essay';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { EssayGeneratorForm } from '@/components/essay-generator-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export default function EssayPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({ title: 'Your Essay', content: 'The essay you compose will be thoughtfully structured and displayed here.' });
  const { toast } = useToast();

  const form = useForm<ComposeEssayInput>({
    defaultValues: {
      topic: "",
      tone: "informative",
      structure: "argumentative",
      length: "medium",
    },
  });

  const handleGenerate = async (data: ComposeEssayInput) => {
    setIsLoading(true);
    setGeneratedContent({ title: 'Composing Your Essay...', content: 'The AI is structuring your arguments. Please wait...' });
    try {
      const result = await composeEssay(data);
      setGeneratedContent({ title: result.title, content: result.essay });
    } catch (error: any) {
      console.error(error);
      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota');
      toast({
        title: isQuotaError ? "Quota Exceeded" : "An error occurred",
        description: isQuotaError 
          ? "You've reached your Gemini API limit. Please try again in a few minutes." 
          : "Failed to compose essay. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent({ 
        title: 'Error', 
        content: isQuotaError 
          ? "The AI model is currently at its free-tier limit. Please wait a moment before trying again." 
          : 'Could not compose the essay. The argument was lost in the digital ether.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${generatedContent.title}\n\n${generatedContent.content}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Essay copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleSurpriseMe = async () => {
    setIsSuggesting(true);
    try {
      const result = await generateSuggestions({ generatorType: 'essay' });
      if (result.essay) {
        Object.keys(result.essay).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.essay?.[key as keyof typeof result.essay];
            if (value && form.getValues(formKey) !== value) {
                form.setValue(formKey, value, { shouldValidate: true });
            }
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to generate suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <main className="grid md:grid-cols-2 gap-12 h-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-bold">Essay Composer</h2>
          <p className="text-muted-foreground">
            Create well-structured essays. Specify a topic, tone, and structure to generate compelling arguments or narratives.
          </p>
        </div>
        <EssayGeneratorForm 
            form={form}
            onSubmit={handleGenerate} 
            isLoading={isLoading || isSuggesting} 
            onSurpriseMe={handleSurpriseMe}
        />
      </div>
      <div className="h-full">
        {isLoading && !isSuggesting ? (
            <Card className="h-full min-h-[500px] flex flex-col">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <Skeleton className="h-full w-full" />
                </CardContent>
            </Card>
        ) : (
            <Card className="h-full min-h-[500px] flex flex-col shadow-lg border-primary/10">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline font-bold">{generatedContent.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <pre className="whitespace-pre-wrap font-body text-base leading-relaxed">{generatedContent.content}</pre>
                </CardContent>
                {generatedContent.content.length > 100 && (
                  <CardFooter className="justify-end border-t pt-4">
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {isCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                      {isCopied ? "Copied" : "Copy Essay"}
                    </Button>
                  </CardFooter>
                )}
            </Card>
        )}
      </div>
    </main>
  );
}
