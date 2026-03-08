'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen, Sparkles } from 'lucide-react';
import type { GenerateBlogPostInput } from '@/ai/flows/generate-blog-post';

type BlogFormProps = {
  form: UseFormReturn<GenerateBlogPostInput>;
  onSubmit: (data: GenerateBlogPostInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function BlogGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: BlogFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="industry" render={({ field }) => (
          <FormItem>
             <FormLabel>Industry</FormLabel>
            <FormControl><Input placeholder="e.g., Tech, Healthcare, Fashion" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="topic" render={({ field }) => (
          <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl><Input placeholder="e.g., The Future of AI in Marketing" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="audience" render={({ field }) => (
            <FormItem>
              <FormLabel>Target Audience</FormLabel>
              <FormControl><Input placeholder="e.g., Marketing professionals, students" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="authorStyle" render={({ field }) => (
            <FormItem>
              <FormLabel>Master's Style</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Inspired by..." /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="none">Standard Blog</SelectItem>
                  <SelectItem value="godin">Seth Godin</SelectItem>
                  <SelectItem value="ferriss">Tim Ferriss</SelectItem>
                  <SelectItem value="patel">Neil Patel</SelectItem>
                  <SelectItem value="popova">Maria Popova</SelectItem>
                  <SelectItem value="vaynerchuk">Gary Vaynerchuk</SelectItem>
                  <SelectItem value="huffington">Arianna Huffington</SelectItem>
                  <SelectItem value="clear">James Clear</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="tone" render={({ field }) => (
            <FormItem>
               <FormLabel>Tone</FormLabel>
              <FormControl><Input placeholder="e.g., Professional, Casual" {...field} /></FormControl>
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="length" render={({ field }) => (
            <FormItem>
              <FormLabel>Length Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="short">Short (~300 words)</SelectItem>
                  <SelectItem value="medium">Medium (~800 words)</SelectItem>
                  <SelectItem value="long">Long (1500+ words)</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="wordCount" render={({ field }) => (
            <FormItem>
              <FormLabel>Target Word Count (up to 10k)</FormLabel>
              <FormControl><Input type="number" min={100} max={10000} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onSurpriseMe} disabled={isLoading} className="w-1/3">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Surprise Me
          </Button>
          <Button type="submit" disabled={isLoading} className="w-2/3" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookOpen className="mr-2 h-4 w-4" />}
            Generate Blog Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
