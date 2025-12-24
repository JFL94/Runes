export interface Rune {
  id: number;
  name: string;
  symbol: string;
  meaning: string;
  element: string;
}

export interface ReadingResult {
  runes: Rune[];
  interpretation: string;
  generatedImageUrl?: string;
  timestamp: number;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  likes: number;
  runeId?: number; // Optional: linked to a specific rune
  timestamp: number;
  replies?: Comment[]; // Nested replies
}

export enum AppTab {
  HOME = 'HOME',
  DIVINATION = 'DIVINATION',
  COMMUNITY = 'COMMUNITY',
}