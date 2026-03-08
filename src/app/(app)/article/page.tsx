'use client';
import { useState } from 'react';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { generateArticle, type GenerateArticleInput } from '@/ai/flows/generate-article';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { ArticleGeneratorForm } from '@/components/article-generator-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export default function ArticlePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({ title: 'Your Article', content: 'Your well-researched and engaging article will be generated here.' });
  const { toast } = useToast();

  const form = useForm<GenerateArticleInput>({
    defaultValues: {
      topic: "",
      keywords: "",
      outlet: "Online News Site",
      tone: "journalistic",
      length: "medium",
      wordCount: 1200,
    },
  });

  const handleGenerate = async (data: GenerateArticleInput) => {
    setIsLoading(true);
    setGeneratedContent({ title: 'Writing Your Article...', content: 'The AI is gathering information and drafting your article. Please wait...' });
    try {
      const result = await generateArticle(data);
      setGeneratedContent({ title: result.title, content: result.article });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Failed to generate article. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent({ 
        title: 'Error', 
        content: 'Could not generate the article. The sources are unavailable.' 
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
        description: "Article copied to clipboard.",
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
      const result = await generateSuggestions({ generatorType: 'article' });
      if (result.article) {
        Object.keys(result.article).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.article?.[key as keyof typeof result.article];
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
          <h2 className="text-3xl font-headline font-bold">Article Writer</h2>
          <p className="text-muted-foreground">
            Produce well-researched articles on any topic, optimized for your target outlet and audience.
          </p>
        </div>
        <ArticleGeneratorForm 
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
                      {isCopied ? "Copied" : "Copy Article"}
                    </Button>
                  </CardFooter>
                )}
            </Card>
        )}
      </div>
    </main>
  );
}
