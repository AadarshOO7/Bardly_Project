'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { generateBlogPost, type GenerateBlogPostInput } from '@/ai/flows/generate-blog-post';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { BlogGeneratorForm } from '@/components/blog-generator-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Loader2, Copy, Check } from 'lucide-react';

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({ title: 'Your Blog Post', content: 'Tailored blog content for your industry and audience will be generated here.', imageUrl: '' });
  const { toast } = useToast();

  const form = useForm<GenerateBlogPostInput>({
    defaultValues: {
      industry: "",
      topic: "",
      audience: "",
      tone: "Informative",
      length: "medium",
      wordCount: 500,
    },
  });

  const handleGenerate = async (data: GenerateBlogPostInput) => {
    setIsLoading(true);
    setGeneratedContent({ title: 'Smithing Your Post...', content: 'The AI is forging your blog post. Please stand by...', imageUrl: '' });
    try {
      const result = await generateBlogPost(data, false);
      if (result.error) {
        throw new Error(result.error);
      }
      setGeneratedContent({ title: result.title, content: result.content, imageUrl: '' });
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Failed to generate blog post. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent({ 
        title: 'Error', 
        content: 'Could not generate the blog post. The content strategy needs rethinking.', 
        imageUrl: '' 
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
        description: "Blog post content copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const blogData = form.getValues();
      const result = await generateBlogPost(blogData, true);
      setGeneratedContent(prev => ({...prev, title: result.title, content: result.content, imageUrl: result.imageUrl || ''}));
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  const handleSurpriseMe = async () => {
    setIsSuggesting(true);
    try {
      const result = await generateSuggestions({ generatorType: 'blog' });
      if (result.blog) {
        Object.keys(result.blog).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.blog?.[key as keyof typeof result.blog];
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
          <h2 className="text-3xl font-headline font-bold">Blog Post Smith</h2>
          <p className="text-muted-foreground">
            Generate blog posts tailored to your needs. Define the industry, topic, and audience to create engaging content.
          </p>
        </div>
        <BlogGeneratorForm 
            form={form}
            onSubmit={handleGenerate} 
            isLoading={isLoading || isGeneratingImage || isSuggesting} 
            onSurpriseMe={handleSurpriseMe}
        />
      </div>
      <div className="h-full">
        {isLoading && !isGeneratingImage ? (
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
                    {generatedContent.content.length > 50 && !generatedContent.imageUrl && !isLoading && (
                    <CardDescription>
                        <Button variant="outline" size="sm" onClick={handleGenerateImage} disabled={isGeneratingImage}>
                            {isGeneratingImage ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <ImageIcon className="mr-2 h-4 w-4"/> }
                            Generate Header Image
                        </Button>
                    </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    {isGeneratingImage && !generatedContent.imageUrl && <Skeleton className="w-full h-48 rounded-md" />}
                    {generatedContent.imageUrl && <Image src={generatedContent.imageUrl} alt={generatedContent.title} width={600} height={400} className="rounded-md shadow-md w-full" />}
                    <pre className="whitespace-pre-wrap font-body text-base leading-relaxed">{generatedContent.content}</pre>
                </CardContent>
                {generatedContent.content.length > 100 && (
                  <CardFooter className="justify-end border-t pt-4">
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {isCopied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
                      {isCopied ? "Copied" : "Copy Post"}
                    </Button>
                  </CardFooter>
                )}
            </Card>
        )}
      </div>
    </main>
  );
}
