'use server';

/**
 * @fileOverview Blog post generation (Simulation Mode) with Author Styles and Word Count.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostInputSchema = z.object({
  industry: z.string().describe('The industry the blog post is for.'),
  topic: z.string().describe('The topic of the blog post.'),
  audience: z.string().describe('The target audience demographics for the blog post.'),
  tone: z.string().describe('The tone of the blog post.'),
  authorStyle: z.enum(['none', 'godin', 'ferriss', 'patel', 'popova', 'vaynerchuk', 'huffington', 'clear']).default('none'),
  length: z.string().describe('The desired length category.'),
  wordCount: z.coerce.number().min(100).max(10000).default(500).describe('Specific word count target.'),
});
export type GenerateBlogPostInput = z.infer<typeof GenerateBlogPostInputSchema>;

const GenerateBlogPostOutputSchema = z.object({
  title: z.string().describe('The title of the generated blog post.'),
  content: z.string().describe('The content of the generated blog post.'),
  imageUrl: z.string().optional().describe('URL of a relevant image.'),
  error: z.string().optional(),
});
export type GenerateBlogPostOutput = z.infer<typeof GenerateBlogPostOutputSchema>;

export async function generateBlogPost(input: GenerateBlogPostInput, withImage: boolean = false): Promise<GenerateBlogPostOutput> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const styleNames: Record<string, string> = {
    godin: "Seth Godin (Short, Punchy)",
    ferriss: "Tim Ferriss (Optimized, Bio-hacking)",
    patel: "Neil Patel (SEO-focused)",
    popova: "Maria Popova (Marginalian style)",
    vaynerchuk: "Gary Vaynerchuk (Aggressive, Action-oriented)",
    huffington: "Arianna Huffington (Well-being focused)",
    clear: "James Clear (Atomic Habits style)",
    none: "Original"
  };

  const title = `${input.authorStyle !== 'none' ? styleNames[input.authorStyle] + ': ' : ''}${input.topic} in ${input.industry}`;
  let content = `[Target Length: ${input.wordCount} words]\n\nHello to all our ${input.audience} readers! Today, we're diving deep into ${input.topic}.\n\n`;
  
  if (input.authorStyle === 'godin') {
    content += `The market doesn't care about your ${input.topic}. It cares about trust.\n\nIn the ${input.industry} space, staying ahead means shipping your work. If you're not failing, you're not trying.\n\nKey Takeaway: Trust is the only currency left.`;
  } else if (input.authorStyle === 'vaynerchuk') {
    content += `LISTEN! ${input.topic} is the only thing that matters right now in ${input.industry}. STOP COMPLAINING! Start executing. Your competition is already doing this.\n\nIf you aren't posting 10 times a day about ${input.topic}, you're losing. PERIOD.`;
  } else {
    content += `In the ${input.industry} space, staying ahead means understanding ${input.topic}. Many of you have asked for a ${input.tone} guide on this, so here it is.\n\n`;
    content += `Detailed Analysis for ${input.audience}:\nAs we explore ${input.topic}, it's clear that ${input.industry} is at a crossroads. By focusing on a ${input.tone} strategy, businesses can unlock new levels of efficiency and engagement.\n\n`;
    content += `Key Takeaways:\n1. The landscape is shifting rapidly.\n2. Strategy is more important than ever.\n3. Community feedback drives innovation.\n\n`;
    
    if (input.wordCount > 1000) {
        content += `Extended Deep Dive:\nBecause we are targeting ${input.wordCount} words, let's examine the secondary implications. The ripple effects of ${input.topic} extend beyond just the immediate metrics. It touches on corporate culture, sustainable growth, and the very way we perceive value in the ${input.industry} ecosystem.\n\n`;
    }

    content += `Whether you're a seasoned professional or just starting out, ${input.topic} offers incredible opportunities. Let's make the most of it together!\n\n`;
    content += `What do you think? Leave a comment below!`;
  }

  return {
    title,
    content,
    imageUrl: withImage ? `https://picsum.photos/seed/${encodeURIComponent(input.topic)}/1200/800` : undefined,
  };
}

ai.defineFlow(
  {
    name: 'generateBlogPostFlow',
    inputSchema: GenerateBlogPostInputSchema,
    outputSchema: GenerateBlogPostOutputSchema,
  },
  async input => generateBlogPost(input)
);
