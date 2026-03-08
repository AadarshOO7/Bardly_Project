'use server';

/**
 * @fileOverview Poem generation flow (Simulation Mode) with Author Styles.
 * 
 * - short: 2 paragraphs, 4 lines each.
 * - medium: 3 paragraphs.
 * - long: 4-5 paragraphs.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemInputSchema = z.object({
  theme: z.string().describe('The theme of the poem.'),
  style: z.enum(['free_verse', 'sonnet', 'haiku', 'limerick']).default('free_verse'),
  authorStyle: z.enum(['none', 'shakespeare', 'dickinson', 'poe', 'frost', 'angelou', 'rumi', 'neruda']).default('none'),
  keywords: z.string().optional(),
  tone: z.enum(['melancholic', 'joyful', 'mystical', 'rebellious']).default('mystical'),
  length: z.enum(['short', 'medium', 'long']).default('medium'),
});
export type GeneratePoemInput = z.infer<typeof GeneratePoemInputSchema>;

const GeneratePoemOutputSchema = z.object({
  title: z.string().describe('A creative title for the poem.'),
  poem: z.string().describe('The generated poem.'),
});
export type GeneratePoemOutput = z.infer<typeof GeneratePoemOutputSchema>;

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemOutput> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const theme = input.theme || 'the unknown';
  const kw = input.keywords ? input.keywords.split(',').map(k => k.trim()) : ['spirit', 'horizon', 'whisper', 'shadow', 'light'];
  
  const authorFlavors: Record<string, any> = {
    none: { prefix: "In the", suffix: "heart", vocab: ["realm", "side", "hide", "known"] },
    shakespeare: { prefix: "Thou art the", suffix: "doth", vocab: ["thee", "art", "fair", "thine"], dash: "" },
    dickinson: { prefix: "The Soul selects —", suffix: "—", vocab: ["Silence", "Infinity", "Noon", "Eternity"], dash: " — " },
    poe: { prefix: "Deep into that darkness", suffix: "evermore", vocab: ["ghastly", "grim", "dreary", "midnight"], dash: "" },
    frost: { prefix: "Whose woods these are", suffix: "to keep", vocab: ["snow", "deep", "sleep", "miles"], dash: "" },
    angelou: { prefix: "I rise like", suffix: "dust", vocab: ["hopes", "tides", "gold", "rhythm"], dash: "" },
    rumi: { prefix: "The lover's eye", suffix: "Beloved", vocab: ["wine", "dance", "ecstasy", "fire"], dash: "" },
    neruda: { prefix: "Your laughter is", suffix: "sea", vocab: ["roots", "petals", "bread", "earth"], dash: "" },
  };

  const flavor = authorFlavors[input.authorStyle] || authorFlavors.none;
  const toneMap = {
    melancholic: { adj: 'hollowed', verb: 'weeps', noun: 'echo', end: 'fading' },
    joyful: { adj: 'radiant', verb: 'dances', noun: 'sunlight', end: 'rising' },
    mystical: { adj: 'ethereal', verb: 'whispers', noun: 'veil', end: 'unfolding' },
    rebellious: { adj: 'blazing', verb: 'roars', noun: 'thunder', end: 'breaking' },
  };
  const t = toneMap[input.tone];

  const authorNames: Record<string, string> = {
    shakespeare: "Shakespearean",
    dickinson: "Dickinson-style",
    poe: "Poe-esque",
    frost: "Frostian",
    angelou: "Angelou-inspired",
    rumi: "Rumi-esque",
    neruda: "Neruda-style",
    none: input.tone.charAt(0).toUpperCase() + input.tone.slice(1)
  };

  const title = `${authorNames[input.authorStyle] || "A"} ${theme}`;
  
  if (input.style === 'haiku') {
    return {
      title,
      poem: `${flavor.vocab[0]} ${theme} blooms,\n${kw[0] || 'nature'} ${t.verb} in the night,\n${t.noun} ${flavor.suffix}.`
    };
  }

  const generateStanza = (stanzaIndex: number) => {
    const dash = flavor.dash || "";
    const lines = [
      `${flavor.prefix} ${t.adj} realm ${dash}where ${theme} resides,`,
      `The ${kw[stanzaIndex % kw.length] || flavor.vocab[1]} ${t.verb} beneath the ${flavor.vocab[2]},`,
      `Where ${flavor.vocab[3]} of the ${input.tone} heart hide,`,
      `Until the final ${flavor.suffix} ${dash}is ${t.end}.`
    ];
    return lines.join('\n');
  };

  let paragraphs: string[] = [];
  let paragraphCount = 3; 

  if (input.length === 'short') {
    paragraphCount = 2;
  } else if (input.length === 'long') {
    paragraphCount = 5; 
  }

  for (let i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateStanza(i));
  }

  return { title, poem: paragraphs.join('\n\n') };
}

ai.defineFlow(
  {
    name: 'generatePoemFlow',
    inputSchema: GeneratePoemInputSchema,
    outputSchema: GeneratePoemOutputSchema,
  },
  async input => generatePoem(input)
);
