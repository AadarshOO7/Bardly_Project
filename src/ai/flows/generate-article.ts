'use server';

/**
 * @fileOverview Article generation (Simulation Mode) with Author Styles and Word Count.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleInputSchema = z.object({
  topic: z.string().describe('The topic of the article.'),
  keywords: z.string().describe('Keywords to include.'),
  outlet: z.string().describe('The target outlet.'),
  authorStyle: z.enum(['none', 'thompson', 'didion', 'hitchens', 'gellhorn', 'wallace', 'bly', 'coates']).default('none'),
  tone: z.enum(['journalistic', 'opinionated', 'technical', 'conversational']).describe('The tone.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length category.'),
  wordCount: z.coerce.number().min(100).max(10000).default(1200).describe('Specific word count target.'),
});
export type GenerateArticleInput = z.infer<typeof GenerateArticleInputSchema>;

const GenerateArticleOutputSchema = z.object({
  title: z.string().describe('The title.'),
  article: z.string().describe('The generated article content.'),
});
export type GenerateArticleOutput = z.infer<typeof GenerateArticleOutputSchema>;

export async function generateArticle(input: GenerateArticleInput): Promise<GenerateArticleOutput> {
  await new Promise(resolve => setTimeout(resolve, 1100));

  const styleNames: Record<string, string> = {
    thompson: "Gonzo Journalism (Hunter S. Thompson)",
    didion: "Observational (Joan Didion)",
    hitchens: "Polemical (Christopher Hitchens)",
    gellhorn: "War Correspondent (Martha Gellhorn)",
    wallace: "Maximalist (David Foster Wallace)",
    bly: "Investigative (Nellie Bly)",
    coates: "Social Commentary (Ta-Nehisi Coates)",
    none: "Standard"
  };

  const title = `Special Report: The ${input.topic} Phenomenon`;
  let article = `[Reported for ${input.outlet} | Simulated Length: ${input.wordCount} words]\n`;
  if (input.authorStyle !== 'none') {
    article += `[Style: ${styleNames[input.authorStyle]}]\n\n`;
  }
  
  if (input.authorStyle === 'thompson') {
    article += `We were somewhere around the edge of ${input.topic} when the drugs began to take hold. This isn't just news; it's a war for reality in ${input.outlet}. The keywords ${input.keywords} are just the beginning of a long, strange trip. A ${input.wordCount}-word descent into the heart of the American dream.`;
  } else if (input.authorStyle === 'didion') {
    article += `I am telling you how it was. In ${input.outlet}, the talk was all of ${input.topic}. It was a time when the center could not hold, and ${input.keywords} seemed like the only anchor left in a shifting world. We watched the ${input.wordCount} words unfold like a slow-motion catastrophe.`;
  } else {
    article += `Dateline: Today's World. In a significant development for those following ${input.topic}, new data suggests a major shift. Using a ${input.tone} lens, we can see how ${input.keywords} are playing a central role.\n\n`;
    
    if (input.wordCount > 2000) {
        article += `Extensive Analysis:\nGiven the depth required for this ${input.wordCount}-word feature, we must examine the underlying structural shifts. Experts at ${input.outlet} have noted that ${input.topic} is no longer just a niche interest. It has become a cornerstone of modern innovation, affecting everything from policy to personal habits.\n\n`;
        article += `Case Study: ${input.keywords.split(',')[0] || 'The Primary Factor'}\nWhen looking at the role of ${input.keywords.split(',')[0]}, we see a pattern of rapid adoption followed by critical re-evaluation. This cycle is essential for the long-term viability of the ${input.topic} sector.\n\n`;
    } else {
        article += `Experts at ${input.outlet} have noted that ${input.topic} is no longer just a niche interest. It has become a cornerstone of modern innovation.\n\n`;
    }
  }

  article += `Final word on ${input.topic}: As we continue to track ${input.keywords}, the ${input.tone} implications will remain at the forefront of the discussion at ${input.outlet}.`;

  return {
    title,
    article,
  };
}

ai.defineFlow(
  {
    name: 'generateArticleFlow',
    inputSchema: GenerateArticleInputSchema,
    outputSchema: GenerateArticleOutputSchema,
  },
  async input => generateArticle(input)
);
