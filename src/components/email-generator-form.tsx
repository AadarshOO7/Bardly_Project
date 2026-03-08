'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Mail, Sparkles } from 'lucide-react';
import type { GenerateEmailInput } from '@/ai/flows/generate-email';

type EmailFormProps = {
  form: UseFormReturn<GenerateEmailInput>;
  onSubmit: (data: GenerateEmailInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function EmailGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: EmailFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="emailType" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Type</FormLabel>
              <FormControl><Input placeholder="e.g., Cover Letter, Marketing" {...field} /></FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="topic" render={({ field }) => (
            <FormItem>
              <FormLabel>Topic / Subject</FormLabel>
              <FormControl><Input placeholder="e.g., Job Application" {...field} /></FormControl>
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField control={form.control} name="authorStyle" render={({ field }) => (
            <FormItem>
              <FormLabel>Master's Style</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Inspired by..." /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="none">Standard Email</SelectItem>
                  <SelectItem value="jobs">Steve Jobs</SelectItem>
                  <SelectItem value="carnegie">Dale Carnegie</SelectItem>
                  <SelectItem value="brown">Brené Brown</SelectItem>
                  <SelectItem value="gladwell">Malcolm Gladwell</SelectItem>
                  <SelectItem value="branson">Richard Branson</SelectItem>
                  <SelectItem value="bezos">Jeff Bezos</SelectItem>
                  <SelectItem value="sandberg">Sheryl Sandberg</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="tone" render={({ field }) => (
            <FormItem>
                <FormLabel>Tone</FormLabel>
              <FormControl><Input placeholder="e.g., Friendly, Persuasive" {...field} /></FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="length" render={({ field }) => (
            <FormItem>
              <FormLabel>Length</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="short">Short & Concise</SelectItem>
                  <SelectItem value="medium">Standard</SelectItem>
                  <SelectItem value="long">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="additionalInstructions" render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Instructions (optional)</FormLabel>
            <FormControl><Textarea placeholder="Mention my 5 years of experience with React..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onSurpriseMe} disabled={isLoading} className="w-1/3">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Surprise Me
            </Button>
            <Button type="submit" disabled={isLoading} className="w-2/3" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
            Generate Email
            </Button>
        </div>
      </form>
    </Form>
  );
}
