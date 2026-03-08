'use client';
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, FileText, Sparkles } from 'lucide-react';
import type { ComposeEssayInput } from '@/ai/flows/compose-essay';

type EssayFormProps = {
  form: UseFormReturn<ComposeEssayInput>;
  onSubmit: (data: ComposeEssayInput) => void;
  isLoading: boolean;
  onSurpriseMe: () => void;
}

export function EssayGeneratorForm({ form, onSubmit, isLoading, onSurpriseMe }: EssayFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="topic" render={({ field }) => (
           <FormItem>
            <FormLabel>Topic</FormLabel>
            <FormControl><Input placeholder="e.g., The impact of renewable energy" {...field} /></FormControl>
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
                  <SelectItem value="none">Standard Essay</SelectItem>
                  <SelectItem value="orwell">George Orwell</SelectItem>
                  <SelectItem value="emerson">Ralph Waldo Emerson</SelectItem>
                  <SelectItem value="baldwin">James Baldwin</SelectItem>
                  <SelectItem value="woolf">Virginia Woolf</SelectItem>
                  <SelectItem value="montaigne">Michel de Montaigne</SelectItem>
                  <SelectItem value="sontag">Susan Sontag</SelectItem>
                  <SelectItem value="russell">Bertrand Russell</SelectItem>
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
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="informal">Informal</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="informative">Informative</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={form.control} name="structure" render={({ field }) => (
            <FormItem>
              <FormLabel>Structure</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="argumentative">Argumentative</SelectItem>
                  <SelectItem value="descriptive">Descriptive</SelectItem>
                  <SelectItem value="narrative">Narrative</SelectItem>
                  <SelectItem value="expository">Expository</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <FormField control={form.control} name="length" render={({ field }) => (
            <FormItem>
              <FormLabel>Length</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="short">Short</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="long">Long</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )} />
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onSurpriseMe} disabled={isLoading} className="w-1/3">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Surprise Me
          </Button>
          <Button type="submit" disabled={isLoading} className="w-2/3" size="lg">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
            Compose Essay
          </Button>
        </div>
      </form>
    </Form>
  );
}
