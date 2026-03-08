'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PenSquare, Sparkles, User } from 'lucide-react';
import type { GeneratePoemInput } from '@/ai/flows/generate-poem';

type PoemFormProps = {
  form: UseFormReturn<GeneratePoemInput>;
  onSubmit: (data: GeneratePoemInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function PoemGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: PoemFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Autumn solitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
          )}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Poetic Style</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="free_verse">Free Verse</SelectItem>
                    <SelectItem value="sonnet">Sonnet</SelectItem>
                    <SelectItem value="haiku">Haiku</SelectItem>
                    <SelectItem value="limerick">Limerick</SelectItem>
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="authorStyle"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Master's Style</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Inspired by..." />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="none">Original Style</SelectItem>
                    <SelectItem value="shakespeare">William Shakespeare</SelectItem>
                    <SelectItem value="dickinson">Emily Dickinson</SelectItem>
                    <SelectItem value="poe">Edgar Allan Poe</SelectItem>
                    <SelectItem value="frost">Robert Frost</SelectItem>
                    <SelectItem value="angelou">Maya Angelou</SelectItem>
                    <SelectItem value="rumi">Rumi</SelectItem>
                    <SelectItem value="neruda">Pablo Neruda</SelectItem>
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Tone</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="melancholic">Melancholic</SelectItem>
                    <SelectItem value="joyful">Joyful</SelectItem>
                    <SelectItem value="mystical">Mystical</SelectItem>
                    <SelectItem value="rebellious">Rebellious</SelectItem>
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="length"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Length</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectItem value="short">Short (2 Stanzas)</SelectItem>
                    <SelectItem value="medium">Medium (3 Stanzas)</SelectItem>
                    <SelectItem value="long">Long (4-5 Stanzas)</SelectItem>
                    </SelectContent>
                </Select>
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Keywords (optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., golden leaves, mist" {...field} />
                </FormControl>
                </FormItem>
            )}
        />
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onSurpriseMe} disabled={isLoading} className="w-1/3">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Surprise Me
          </Button>
          <Button type="submit" disabled={isLoading} className="w-2/3" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PenSquare className="mr-2 h-4 w-4"/>}
            Generate Poem
          </Button>
        </div>
      </form>
    </Form>
  );
}
