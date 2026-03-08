'use client';
import { useState } from 'react';
import { useForm, type FieldValue, type Path } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { generateEmail, type GenerateEmailInput } from '@/ai/flows/generate-email';
import { generateSuggestions } from '@/ai/flows/generate-suggestions';
import { EmailGeneratorForm } from '@/components/email-generator-form';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

export default function EmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({ title: 'Your Email', content: 'Your generated email, from formal inquiries to marketing campaigns, will appear here.' });
  const { toast } = useToast();

  const form = useForm<GenerateEmailInput>({
    defaultValues: {
      emailType: "Formal",
      topic: "",
      tone: "Professional",
      length: "medium",
      additionalInstructions: "",
    },
  });

  const handleGenerate = async (data: GenerateEmailInput) => {
    setIsLoading(true);
    setGeneratedContent({ title: 'Generating Your Email...', content: 'The AI is drafting your message. Please wait a moment...' });
    try {
      const result = await generateEmail(data);
      setGeneratedContent({ title: `Email: ${data.topic}`, content: result.emailContent });
    } catch (error: any) {
      console.error(error);
      const isQuotaError = error.message?.includes('429') || error.message?.includes('quota');
      toast({
        title: isQuotaError ? "Quota Exceeded" : "An error occurred",
        description: isQuotaError 
          ? "You've reached your Gemini API limit. Please try again in a few minutes." 
          : "Failed to generate email. Please try again.",
        variant: "destructive",
      });
      setGeneratedContent({ 
        title: 'Error', 
        content: isQuotaError 
          ? "The AI model is currently at its free-tier limit. Please wait a moment before trying again." 
          : 'Could not generate the email. The message was lost in transit.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Email content copied to clipboard.",
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
      const result = await generateSuggestions({ generatorType: 'email' });
      if (result.email) {
        Object.keys(result.email).forEach(key => {
            const formKey = key as Path<FieldValue<typeof form>>;
            const value = result.email?.[key as keyof typeof result.email];
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
          <h2 className="text-3xl font-headline font-bold">Email Generator</h2>
          <p className="text-muted-foreground">
            Create emails for any occasion. From formal cover letters to friendly marketing messages, let AI handle the draft.
          </p>
        </div>
        <EmailGeneratorForm 
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
                      {isCopied ? "Copied" : "Copy Email"}
                    </Button>
                  </CardFooter>
                )}
            </Card>
        )}
      </div>
    </main>
  );
}
