'use server';

/**
 * @fileOverview Suggestion generation (Simulation Mode) with Author Styles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestionsInputSchema = z.object({
  generatorType: z.enum([
    'poem',
    'essay',
    'blog',
    'email',
    'story',
    'biography',
    'article'
  ]),
});
export type GenerateSuggestionsInput = z.infer<typeof GenerateSuggestionsInputSchema>;

const PoemSuggestionSchema = z.object({
  theme: z.string().optional(),
  style: z.enum(['free_verse', 'sonnet', 'haiku', 'limerick']).optional(),
  authorStyle: z.string().optional(),
  keywords: z.string().optional(),
  tone: z.enum(['melancholic', 'joyful', 'mystical', 'rebellious']).optional(),
  length: z.enum(['short', 'medium', 'long']).optional(),
});

const EssaySuggestionSchema = z.object({
    topic: z.string().optional(),
    tone: z.enum(['formal', 'informal', 'persuasive', 'informative']).optional(),
    authorStyle: z.string().optional(),
    structure: z.enum(['argumentative', 'descriptive', 'narrative', 'expository']).optional(),
});

const BlogSuggestionSchema = z.object({
    industry: z.string().optional(),
    topic: z.string().optional(),
    audience: z.string().optional(),
    tone: z.string().optional(),
    authorStyle: z.string().optional(),
});

const EmailSuggestionSchema = z.object({
    emailType: z.string().optional(),
    topic: z.string().optional(),
    tone: z.string().optional(),
    authorStyle: z.string().optional(),
});

const StorySuggestionSchema = z.object({
    genre: z.string().optional(),
    characters: z.string().optional(),
    setting: z.string().optional(),
    plot: z.string().optional(),
    authorStyle: z.string().optional(),
});

const BiographySuggestionSchema = z.object({
    personName: z.string().optional(),
    keyAchievements: z.string().optional(),
    tone: z.enum(['professional', 'inspirational', 'academic', 'casual']).optional(),
    authorStyle: z.string().optional(),
});

const ArticleSuggestionSchema = z.object({
    topic: z.string().optional(),
    keywords: z.string().optional(),
    outlet: z.string().optional(),
    tone: z.enum(['journalistic', 'opinionated', 'technical', 'conversational']).optional(),
    authorStyle: z.string().optional(),
});


const GenerateSuggestionsOutputSchema = z.object({
    poem: PoemSuggestionSchema.optional(),
    essay: EssaySuggestionSchema.optional(),
    blog: BlogSuggestionSchema.optional(),
    email: EmailSuggestionSchema.optional(),
    story: StorySuggestionSchema.optional(),
    biography: BiographySuggestionSchema.optional(),
    article: ArticleSuggestionSchema.optional(),
});
export type GenerateSuggestionsOutput = z.infer<typeof GenerateSuggestionsOutputSchema>;

export async function generateSuggestions(input: GenerateSuggestionsInput): Promise<GenerateSuggestionsOutput> {
  await new Promise(resolve => setTimeout(resolve, 400));

  const type = input.generatorType;
  const result: GenerateSuggestionsOutput = {};

  if (type === 'poem') {
    result.poem = { theme: 'Ocean solitude', style: 'haiku', authorStyle: 'neruda', keywords: 'salt, mist, horizon', tone: 'mystical', length: 'short' };
  } else if (type === 'essay') {
    result.essay = { topic: 'The Ethics of Virtual Reality', authorStyle: 'woolf', tone: 'formal', structure: 'argumentative' };
  } else if (type === 'blog') {
    result.blog = { industry: 'Sustainability', topic: 'Circular Economy in Cities', audience: 'Urban planners', tone: 'Informative', authorStyle: 'godin' };
  } else if (type === 'email') {
    result.email = { emailType: 'Partnership Inquiry', topic: 'Cross-platform collaboration', tone: 'Professional', authorStyle: 'jobs' };
  } else if (type === 'story') {
    result.story = { genre: 'Cyberpunk', characters: 'Vance, a neon-tech smuggler', setting: 'Sector 7 Slums', plot: 'A heist involving a lost memory chip', authorStyle: 'murakami' };
  } else if (type === 'biography') {
    result.biography = { personName: 'Ada Lovelace', keyAchievements: 'Writing the first algorithm for a machine', tone: 'inspirational', authorStyle: 'isaacson' };
  } else if (type === 'article') {
    result.article = { topic: 'Renewable Energy breakthroughs', keywords: 'Perovskite, solar, efficiency', outlet: 'Scientific American', tone: 'technical', authorStyle: 'thompson' };
  }

  return result;
}

ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: GenerateSuggestionsInputSchema,
    outputSchema: GenerateSuggestionsOutputSchema,
  },
  async input => generateSuggestions(input)
);
