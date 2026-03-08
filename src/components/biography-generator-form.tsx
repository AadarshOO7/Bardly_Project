'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UserCircle, Sparkles } from 'lucide-react';
import type { GenerateBiographyInput } from '@/ai/flows/generate-biography';

type BiographyFormProps = {
  form: UseFormReturn<GenerateBiographyInput>;
  onSubmit: (data: GenerateBiographyInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function BiographyGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: BiographyFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="personName" render={({ field }) => (
          <FormItem>
            <FormLabel>Person's Name</FormLabel>
            <FormControl><Input placeholder="e.g., Marie Curie, Leonardo da Vinci" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="keyAchievements" render={({ field }) => (
          <FormItem>
            <FormLabel>Key Achievements / Points</FormLabel>
            <FormControl><Textarea placeholder="Pioneering research on radioactivity, Nobel prizes in two different scientific fields..." {...field} /></FormControl>
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
                  <SelectItem value="none">Standard Bio</SelectItem>
                  <SelectItem value="isaacson">Walter Isaacson</SelectItem>
                  <SelectItem value="chernow">Ron Chernow</SelectItem>
                  <SelectItem value="goodwin">Doris Kearns Goodwin</SelectItem>
                  <SelectItem value="caro">Robert Caro</SelectItem>
                  <SelectItem value="plutarch">Plutarch</SelectItem>
                  <SelectItem value="zweig">Stefan Zweig</SelectItem>
                  <SelectItem value="angelou">Maya Angelou</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="tone" render={({ field }) => (
            <FormItem>
              <FormLabel>Tone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                  <SelectItem value="medium">Medium (3-5 paragraphs)</SelectItem>
                  <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
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
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCircle className="mr-2 h-4 w-4" />}
                Generate Biography
            </Button>
        </div>
      </form>
    </Form>
  );
}
