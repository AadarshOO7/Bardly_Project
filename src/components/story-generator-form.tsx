'use client';
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookText, Sparkles } from 'lucide-react';

export const formSchema = z.object({
  genre: z.string().min(2, "Genre is required."),
  characters: z.string().min(2, "Characters are required."),
  setting: z.string().min(2, "Setting is required."),
  plot: z.string().min(10, "Plot must be at least 10 characters."),
  authorStyle: z.string().default('none'),
  length: z.coerce.number().min(100, { message: "Must be at least 100 words."}).max(5000, { message: "Cannot exceed 5000 words." }).optional(),
  totalChapters: z.coerce.number().min(1).max(10, { message: "Please enter a number between 1 and 10." }).optional(),
});

export type StoryGeneratorFormValues = z.infer<typeof formSchema>;

type StoryFormProps = {
  form: UseFormReturn<StoryGeneratorFormValues>;
  onSubmit: (data: StoryGeneratorFormValues) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function StoryGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: StoryFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="genre" render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl><Input placeholder="e.g., Fantasy, Sci-Fi" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="setting" render={({ field }) => (
            <FormItem>
              <FormLabel>Setting</FormLabel>
              <FormControl><Input placeholder="e.g., A futuristic city" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="authorStyle" render={({ field }) => (
            <FormItem>
              <FormLabel>Master's Style</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Inspired by..." /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="none">Standard Fiction</SelectItem>
                  <SelectItem value="tolkien">J.R.R. Tolkien</SelectItem>
                  <SelectItem value="hemingway">Ernest Hemingway</SelectItem>
                  <SelectItem value="king">Stephen King</SelectItem>
                  <SelectItem value="austen">Jane Austen</SelectItem>
                  <SelectItem value="marquez">Gabriel García Márquez</SelectItem>
                  <SelectItem value="christie">Agatha Christie</SelectItem>
                  <SelectItem value="murakami">Haruki Murakami</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="characters" render={({ field }) => (
            <FormItem>
              <FormLabel>Characters</FormLabel>
              <FormControl><Input placeholder="e.g., A rogue android, a curious scientist" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="plot" render={({ field }) => (
          <FormItem>
            <FormLabel>Plot Outline</FormLabel>
            <FormControl><Textarea placeholder="Describe the main conflict or story idea..." {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="totalChapters" render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Chapters</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormDescription>1 to 10 chapters.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="length" render={({ field }) => (
            <FormItem>
              <FormLabel>Words per Chapter</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormDescription>100 to 5000 words.</FormDescription>
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
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BookText className="mr-2 h-4 w-4" />}
            Generate Story
          </Button>
        </div>
      </form>
    </Form>
  );
}
