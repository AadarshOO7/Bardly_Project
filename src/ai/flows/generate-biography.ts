'use server';

/**
 * @fileOverview Biography generation (Simulation Mode) with Author Styles and Word Count.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBiographyInputSchema = z.object({
  personName: z.string().describe('The full name of the person.'),
  keyAchievements: z.string().describe('Key achievements.'),
  authorStyle: z.enum(['none', 'isaacson', 'chernow', 'goodwin', 'caro', 'plutarch', 'zweig', 'angelou']).default('none'),
  tone: z.enum(['professional', 'inspirational', 'academic', 'casual']).describe('The tone.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length category.'),
  wordCount: z.coerce.number().min(100).max(10000).default(800).describe('Specific word count target.'),
});
export type GenerateBiographyInput = z.infer<typeof GenerateBiographyInputSchema>;

const GenerateBiographyOutputSchema = z.object({
  title: z.string().describe('The title.'),
  biography: z.string().describe('The generated biography.'),
});
export type GenerateBiographyOutput = z.infer<typeof GenerateBiographyOutputSchema>;

export async function generateBiography(input: GenerateBiographyInput): Promise<GenerateBiographyOutput> {
  await new Promise(resolve => setTimeout(resolve, 900));

  const styleNames: Record<string, string> = {
    isaacson: "Walter Isaacson (Narrative Non-fiction)",
    chernow: "Ron Chernow (Detailed Historical)",
    goodwin: "Doris Kearns Goodwin (Political Context)",
    caro: "Robert Caro (Power & Infrastructure)",
    plutarch: "Classical Parallel (Plutarch)",
    zweig: "Psychological (Stefan Zweig)",
    angelou: "Poetic & Autobiographical (Angelou)",
    none: "Standard"
  };

  const title = `The Life and Times of ${input.personName}`;
  let bio = `[Simulated Length: ${input.wordCount} words]\n`;
  bio += input.authorStyle !== 'none' ? `[Style: ${styleNames[input.authorStyle]}]\n\n` : '';
  
  bio += `${input.personName} is a figure of remarkable influence. Known primarily for ${input.keyAchievements}, their journey has been characterized by a constant pursuit of excellence.\n\n`;
  
  if (input.authorStyle === 'isaacson') {
    bio += `Like all great innovators, ${input.personName} understood that the intersection of the humanities and technology was where the magic happened. Their focus on ${input.keyAchievements} wasn't just about skill; it was about vision. In this ${input.wordCount}-word exploration, we see the sparks of that genius.\n\n`;
  } else {
    bio += `In this ${input.tone} biography, we explore how ${input.personName} transformed challenges into milestones. Their work has left an indelible mark on the field.\n\n`;
  }
  
  if (input.wordCount > 1500) {
      bio += `The Early Years and Foundational Struggles:\nTo truly understand the ${input.wordCount} words of this life, one must go back to the beginning. ${input.personName} did not start with ${input.keyAchievements}. It was a path forged in the fires of early adversity and a relentless intellectual curiosity that defined their character long before the world took notice.\n\n`;
      bio += `A Legacy in Detail:\nAs we delve deeper into the mid-career achievements, the influence of ${input.personName} becomes undeniable. Their contribution to the fields related to ${input.keyAchievements} shifted the paradigm entirely, setting a standard for future generations.\n\n`;
  }
  
  bio += `Ultimately, the legacy of ${input.personName} is one of ${input.tone === 'inspirational' ? 'hope and progress' : 'dedication and skill'}.`;

  return {
    title,
    biography: bio,
  };
}

ai.defineFlow(
  {
    name: 'generateBiographyFlow',
    inputSchema: GenerateBiographyInputSchema,
    outputSchema: GenerateBiographyOutputSchema,
  },
  async input => generateBiography(input)
);
