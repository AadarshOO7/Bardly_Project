'use server';

/**
 * @fileOverview Email generation (Simulation Mode) with Author Styles.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailInputSchema = z.object({
  emailType: z.string().describe('The type of email.'),
  topic: z.string().describe('The topic or subject of the email.'),
  tone: z.string().describe('The desired tone.'),
  authorStyle: z.enum(['none', 'jobs', 'carnegie', 'brown', 'gladwell', 'branson', 'bezos', 'sandberg']).default('none'),
  length: z.string().describe('The desired length.'),
  additionalInstructions: z.string().optional(),
});
export type GenerateEmailInput = z.infer<typeof GenerateEmailInputSchema>;

const GenerateEmailOutputSchema = z.object({
  emailContent: z.string().describe('The generated email content.'),
});
export type GenerateEmailOutput = z.infer<typeof GenerateEmailOutputSchema>;

export async function generateEmail(input: GenerateEmailInput): Promise<GenerateEmailOutput> {
  await new Promise(resolve => setTimeout(resolve, 600));

  const styleNames: Record<string, string> = {
    jobs: "Steve Jobs (Direct & Visionary)",
    carnegie: "Dale Carnegie (Persuasive & Warm)",
    brown: "Brené Brown (Vulnerable & Empathetic)",
    gladwell: "Malcolm Gladwell (Story-driven)",
    branson: "Richard Branson (Adventurous & Casual)",
    bezos: "Jeff Bezos (Customer-obsessed & Concise)",
    sandberg: "Sheryl Sandberg (Leadership-focused)",
    none: "Standard"
  };

  const subject = `Regarding: ${input.topic}`;
  let content = `Subject: ${subject}\n\n`;
  
  if (input.authorStyle === 'jobs') {
    content += `Team,\n\nWe are doing something great with ${input.topic}. It needs to be perfect. No compromises.\n\nI want to see the progress by tomorrow. Let's make a dent in the universe.\n\nBest,\nSteve`;
  } else if (input.authorStyle === 'carnegie') {
    content += `Dear Friend,\n\nI was thinking about how much your expertise with ${input.topic} could help us all. You have a real talent for this.\n\nWould you be open to chatting about ${input.topic} sometime soon? It would mean a lot to the team.\n\nWarmly,\nDale`;
  } else {
    content += `Dear Recipient,\n\nI am writing this ${input.emailType} email regarding ${input.topic}. I wanted to ensure we are aligned on the current direction and tone, which I've aimed to keep ${input.tone}.\n\n`;
    if (input.additionalInstructions) {
      content += `I've also taken note of your request to: ${input.additionalInstructions}.\n\n`;
    }
    content += `Please let me know if you have any feedback or if we should proceed with the current ${input.length} format.\n\n`;
    content += `Best regards,\n[Your Name]`;
  }

  return {
    emailContent: content,
  };
}

ai.defineFlow(
  {
    name: 'generateEmailFlow',
    inputSchema: GenerateEmailInputSchema,
    outputSchema: GenerateEmailOutputSchema,
  },
  async input => generateEmail(input)
);
