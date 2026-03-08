'use client';
import { useState } from 'react';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { generateStory } from '@/ai/flows/generate-story';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { StoryGeneratorForm, type StoryGeneratorFormValues } from '@/components/story-generator-form';
import { Button } from '@/components/ui/button';
import { BookText, Loader2, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function StoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [storyTitle, setStoryTitle] = useState('Your Story');
  const [storyChapters, setStoryChapters] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<StoryGeneratorFormValues | null>(null);

  const { toast } = useToast();

  const form = useForm<StoryGeneratorFormValues>({
    defaultValues: {
      genre: "Fantasy",
      characters: "",
      setting: "",
      plot: "",
      length: 1000,
      totalChapters: 3,
    },
  });

  const handleGenerate = async (data: StoryGeneratorFormValues) => {
    setIsLoading(true);
    setStoryTitle('Weaving Your Tale...');
    setStoryChapters([]);
    setFormValues(data);
    
    try {
      const result = await generateStory({
        ...data,
        chapterNumber: 1,
        totalChapters: data.totalChapters || 3,
      });
      setStoryTitle(result.title || `A story about ${data.plot.substring(0,20)}...`);
      setStoryChapters([result.story]);
    } catch (error: any) {
      console.error(error);
      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota');
      toast({
        title: isQuotaError ? "Quota Exceeded" : "An error occurred",
        description: isQuotaError 
          ? "You've reached your Gemini API limit. Please try again in a few minutes." 
          : "Failed to generate the story. Please try again.",
        variant: "destructive",
      });
      setStoryTitle('Error');
      setStoryChapters([isQuotaError 
        ? "The AI model is currently at its free-tier limit. Please wait a moment before trying again." 
        : 'The story could not be written. The ink has run dry.']);
      setFormValues(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const fullStoryText = `${storyTitle}\n\n${storyChapters.map((c, i) => `Chapter ${i+1}\n\n${c}`).join('\n\n\n')}`;
      await navigator.clipboard.writeText(fullStoryText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Full story copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateNextChapter = async () => {
    if (!formValues || isLoading || storyChapters.length >= (formValues.totalChapters || 3)) {
      return;
    }
    setIsLoading(true);
    setIsContinuing(true);
    const storySoFar = storyChapters.join('\n\n');
    const nextChapterNumber = storyChapters.length + 1;

    try {
      const result = await generateStory({
        ...formValues,
        storySoFar,
        chapterNumber: nextChapterNumber,
        totalChapters: formValues.totalChapters || 3,
      });
      setStoryChapters(prev => [...prev, result.story]);
    } catch (error: any) {
      console.error(error);
      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota');
      toast({
        title: isQuotaError ? "Quota Exceeded" : "An error occurred",
        description: isQuotaError 
          ? "You've reached your Gemini API limit. Please try again in a few minutes." 
          : "Failed to generate the next chapter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsContinuing(false);
    }
  };

  const handleSurpriseMe = async () => {
    setIsSuggesting(true);
    try {
      const result = await generateSuggestions({ generatorType: 'story' });
      if (result.story) {
        Object.keys(result.story).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.story?.[key as keyof typeof result.story];
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

  const fullStory = storyChapters.length > 0 
    ? storyChapters.map((chapter, index) => `Chapter ${index + 1}\n\n${chapter}`).join('\n\n\n')
    : 'A new adventure awaits. Fill out the details and let the AI bring your world to life.';


  return (
    <main className="grid md:grid-cols-2 gap-12 h-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-headline font-bold">Story Generator</h2>
          <p className="text-muted-foreground">
            Bring your ideas to life. Define the genre, characters, and plot to create a unique story, chapter by chapter.
          </p>
        </div>
        <StoryGeneratorForm 
            form={form}
            onSubmit={handleGenerate} 
            isLoading={isLoading || isContinuing || isSuggesting} 
            onSurpriseMe={handleSurpriseMe}
        />
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-grow h-full">
            {(isLoading && !isContinuing) ? (
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
                        <CardTitle className="text-2xl font-headline font-bold">{storyTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <pre className="whitespace-pre-wrap font-body text-base leading-relaxed">{fullStory}</pre>
                    </CardContent>
                    {storyChapters.length > 0 && (
                      <CardFooter className="justify-end border-t pt-4">
                        <Button variant="ghost" size="sm" onClick={handleCopy}>
                          {isCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                          {isCopied ? "Copied" : "Copy Story"}
                        </Button>
                      </CardFooter>
                    )}
                </Card>
            )}
        </div>
        {formValues && storyChapters.length > 0 && storyChapters.length < (formValues.totalChapters || 3) && (
            <div className="mt-4 flex justify-end">
                <Button onClick={handleGenerateNextChapter} disabled={isLoading}>
                    {isContinuing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookText className="mr-2 h-4 w-4" />}
                    Generate Chapter {storyChapters.length + 1}
                </Button>
            </div>
        )}
      </div>
    </main>
  );
}
