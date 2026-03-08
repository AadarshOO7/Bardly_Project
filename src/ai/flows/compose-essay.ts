'use server';

/**
 * @fileOverview A flow for generating essays (Simulation Mode) with Author Styles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComposeEssayInputSchema = z.object({
  topic: z.string().describe('The topic of the essay.'),
  tone: z.enum(['formal', 'informal', 'persuasive', 'informative']).describe('The tone of the essay.'),
  authorStyle: z.enum(['none', 'orwell', 'emerson', 'baldwin', 'woolf', 'montaigne', 'sontag', 'russell']).default('none'),
  structure: z.enum(['argumentative', 'descriptive', 'narrative', 'expository']).describe('The structure of the essay.'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the essay.'),
});
export type ComposeEssayInput = z.infer<typeof ComposeEssayInputSchema>;

const ComposeEssayOutputSchema = z.object({
  title: z.string().describe('The title of the essay.'),
  essay: z.string().describe('The generated essay content.'),
});
export type ComposeEssayOutput = z.infer<typeof ComposeEssayOutputSchema>;

export async function composeEssay(input: ComposeEssayInput): Promise<ComposeEssayOutput> {
  await new Promise(resolve => setTimeout(resolve, 1200));

  const styleNames: Record<string, string> = {
    orwell: "Orwellian",
    emerson: "Transcendentalist (Emerson)",
    baldwin: "Baldwin-esque",
    woolf: "Modernist (Woolf)",
    montaigne: "Montaignian",
    sontag: "Sontag-style",
    russell: "Analytic (Russell)",
    none: input.tone.charAt(0).toUpperCase() + input.tone.slice(1)
  };

  const title = `The ${styleNames[input.authorStyle]} Perspective on ${input.topic}`;
  let paragraphs: string[] = [];
  
  // Style markers for simulation
  const stylePrefix = input.authorStyle !== 'none' ? `[In the style of ${styleNames[input.authorStyle]}]\n\n` : '';

  // 1. Introduction
  paragraphs.push(`Introduction:\nThe significance of ${input.topic} cannot be understated in modern discourse. As we navigate the complexities of today's world, understanding the foundations of ${input.topic} becomes essential to grasping the broader implications of current societal shifts.`);

  // 2. Body Paragraph 1
  paragraphs.push(`Body Paragraph 1:\nFrom a ${input.tone} perspective, one must consider the historical context. Many experts argue that ${input.topic} has evolved through several distinct phases, each defined by unique challenges and breakthroughs that have shaped our present understanding.`);

  // 3. Body Paragraph 2 (for medium and long)
  if (input.length === 'medium' || input.length === 'long') {
    paragraphs.push(`Body Paragraph 2:\nFurthermore, the ${input.structure} analysis reveals a deeper connection between ${input.topic} and our daily lives. This relationship suggests that any progress made in this field will have ripple effects across various sectors, from technology to ethics.`);
  }

  // 4. Body Paragraph 3 (minimum 5 total for long - so we need one more body here)
  if (input.length === 'long') {
    paragraphs.push(`Body Paragraph 3:\nIn addition to the previous points, we must examine the sociopolitical implications of ${input.topic}. Recent studies indicate that public perception is shifting, leading to new paradigms in how we interact with this subject on a global scale. This shift necessitates a reevaluation of our standard frameworks.`);
    
    paragraphs.push(`Body Paragraph 4 (Extended Analysis):\nWhen diving deeper into ${input.topic}, it becomes clear that the nuances of ${input.authorStyle !== 'none' ? styleNames[input.authorStyle] : 'this'} methodology offer a unique lens. It challenges the conventional wisdom of ${input.structure} structures, pushing us to ask not just 'how' but 'why' ${input.topic} persists in its current form.`);
  }

  // 5. Conclusion
  paragraphs.push(`Conclusion:\nIn summary, ${input.topic} remains a pivotal subject. By adopting a ${input.tone} approach, we can better appreciate the intricate balance of forces at play. Future research will likely continue to uncover the profound impact of this topic for generations to come.`);

  return {
    title,
    essay: stylePrefix + paragraphs.join('\n\n'),
  };
}

ai.defineFlow(
  {
    name: 'composeEssayFlow',
    inputSchema: ComposeEssayInputSchema,
    outputSchema: ComposeEssayOutputSchema,
  },
  async input => composeEssay(input)
);
