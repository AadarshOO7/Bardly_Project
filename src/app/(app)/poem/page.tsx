'use client';
import { useState } from 'react';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { generatePoem, type GeneratePoemInput } from '@/ai/flows/generate-poem';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { PoemGeneratorForm } from '@/components/poem-generator-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export default function PoemPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({ title: 'Your Poem', content: 'The poem you generate will appear here, a canvas for your literary art.' });
  const { toast } = useToast();

  const form = useForm<GeneratePoemInput>({
    defaultValues: {
      theme: "",
      style: "free_verse",
      authorStyle: "none",
      keywords: "",
      tone: "mystical",
      length: "medium",
    },
  });

  const handleGenerate = async (data: GeneratePoemInput) => {
    setIsLoading(true);
    setGeneratedContent({ title: 'Crafting Your Verse...', content: 'The digital muse is at work. Please wait...' });
    try {
      const result = await generatePoem(data);
      setGeneratedContent({ title: result.title, content: result.poem });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Failed to generate poem. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent({ 
        title: 'Inspiration Interrupted', 
        content: 'Could not generate the poem. The muse seems to be on a break.' 
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
        description: "Poem copied to clipboard.",
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
      const result = await generateSuggestions({ generatorType: 'poem' });
      if (result.poem) {
         Object.keys(result.poem).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.poem?.[key as keyof typeof result.poem];
            if (value && form.getValues(formKey) !== value) {
                form.setValue(formKey, value, { shouldValidate: true });
            }
        });
      }
    } catch (error) {
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
          <h2 className="text-3xl font-headline font-bold">Poem Generator</h2>
          <p className="text-muted-foreground">
            Craft beautiful poems in various styles. Provide a theme, choose a style, and add keywords to inspire the muse.
          </p>
        </div>
        <PoemGeneratorForm 
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
                {generatedContent.content.length > 50 && (
                  <CardFooter className="justify-end border-t pt-4">
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {isCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                      {isCopied ? "Copied" : "Copy Poem"}
                    </Button>
                  </CardFooter>
                )}
            </Card>
        )}
      </div>
    </main>
  );
}
