'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Newspaper, Sparkles } from 'lucide-react';
import type { GenerateArticleInput } from '@/ai/flows/generate-article';

type ArticleFormProps = {
  form: UseFormReturn<GenerateArticleInput>;
  onSubmit: (data: GenerateArticleInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function ArticleGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: ArticleFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="topic" render={({ field }) => (
          <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl><Input placeholder="e.g., The future of space exploration" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="keywords" render={({ field }) => (
          <FormItem>
            <FormLabel>Keywords</FormLabel>
            <FormControl><Input placeholder="e.g., Mars, SpaceX, NASA, colonization" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="outlet" render={({ field }) => (
                <FormItem>
                    <FormLabel>Target Outlet</FormLabel>
                    <FormControl><Input placeholder="e.g., Forbes, TechCrunch, a personal blog" {...field} /></FormControl>
                </FormItem>
            )} />
            <FormField control={form.control} name="authorStyle" render={({ field }) => (
                <FormItem>
                    <FormLabel>Master's Style</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Inspired by..." /></SelectTrigger></FormControl>
                        <SelectContent>
                        <SelectItem value="none">Standard Journalistic</SelectItem>
                        <SelectItem value="thompson">Hunter S. Thompson (Gonzo)</SelectItem>
                        <SelectItem value="didion">Joan Didion (Observational)</SelectItem>
                        <SelectItem value="hitchens">Christopher Hitchens (Polemical)</SelectItem>
                        <SelectItem value="gellhorn">Martha Gellhorn (War Correspondent)</SelectItem>
                        <SelectItem value="wallace">David Foster Wallace (Maximalist)</SelectItem>
                        <SelectItem value="bly">Nellie Bly (Investigative)</SelectItem>
                        <SelectItem value="coates">Ta-Nehisi Coates (Social Commentary)</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField control={form.control} name="tone" render={({ field }) => (
                <FormItem>
                    <FormLabel>Tone</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>
                        <SelectItem value="journalistic">Journalistic</SelectItem>
                        <SelectItem value="opinionated">Opinionated</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        </SelectContent>
                    </Select>
                </FormItem>
            )} />
            <FormField control={form.control} name="length" render={({ field }) => (
                <FormItem>
                    <FormLabel>Length Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="short">Short Form (~500 words)</SelectItem>
                        <SelectItem value="medium">Standard (~1200 words)</SelectItem>
                        <SelectItem value="long">In-depth (2000+ words)</SelectItem>
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
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Newspaper className="mr-2 h-4 w-4" />}
            Write Article
            </Button>
        </div>
      </form>
    </Form>
  );
}
