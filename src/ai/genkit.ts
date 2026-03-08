import { genkit } from 'genkit';

// Simulation Mode: No external plugins required.
// This allows the app to function without API keys.
export const ai = genkit({
  plugins: [],
});
