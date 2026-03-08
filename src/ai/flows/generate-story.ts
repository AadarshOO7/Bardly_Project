'use server';

/**
 * @fileOverview Story generation (Simulation Mode) with Author Styles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryInputSchema = z.object({
  genre: z.string().describe('The genre of the story.'),
  characters: z.string().describe('The main characters.'),
  setting: z.string().describe('The setting or world.'),
  plot: z.string().describe('The main plot.'),
  authorStyle: z.enum(['none', 'tolkien', 'hemingway', 'king', 'austen', 'marquez', 'christie', 'murakami']).default('none'),
  length: z.coerce.number().describe('The desired length per chapter.'),
  chapterNumber: z.number().describe('The current chapter number.'),
  totalChapters: z.number().describe('The total number of chapters.'),
  storySoFar: z.string().optional().describe('A summary of the story so far.'),
});
export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
  title: z.string().optional().describe('A suitable title.'),
  story: z.string().describe('The generated story content.'),
});
export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const styleNames: Record<string, string> = {
    tolkien: "High Fantasy (Tolkien)",
    hemingway: "Minimalist (Hemingway)",
    king: "Suspenseful (Stephen King)",
    austen: "Satirical Regency (Jane Austen)",
    marquez: "Magical Realism (Márquez)",
    christie: "Mystery (Agatha Christie)",
    murakami: "Surreal (Murakami)",
    none: "Standard"
  };

  const isFirstChapter = input.chapterNumber === 1;
  const title = isFirstChapter ? `The ${input.genre} Saga: ${input.setting}` : undefined;
  
  let story = input.authorStyle !== 'none' ? `[Style: ${styleNames[input.authorStyle]}]\n\n` : '';
  story += `Chapter ${input.chapterNumber}: The ${input.chapterNumber === input.totalChapters ? 'Resolution' : 'Journey Continues'}\n\n`;
  
  if (input.authorStyle === 'hemingway') {
    story += `The sun was hot. ${input.characters} sat by the table in ${input.setting}. They did not talk about ${input.plot}. It was better not to talk. The air felt like rain.`;
  } else if (input.authorStyle === 'tolkien') {
    story += `Long ago, in the ancient reaches of ${input.setting}, there lived ${input.characters}. The weight of ${input.plot} was a burden few could bear, but the stars whispered of a destiny forged in the fires of old magic.`;
  } else {
    if (isFirstChapter) {
      story += `In the heart of ${input.setting}, ${input.characters} stood facing the unknown. The conflict surrounding ${input.plot} reached a turning point.`;
    } else {
      story += `With the memories of the past weighing heavy, ${input.characters} pressed further into the depths of ${input.setting}.`;
    }
  }
  
  if (input.chapterNumber === input.totalChapters) {
    story += `\n\nAs the final curtain fell on this chapter of ${input.setting}, the legacy of ${input.characters} was cemented.`;
  }

  return { title, story };
}

ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async input => generateStory(input)
);
