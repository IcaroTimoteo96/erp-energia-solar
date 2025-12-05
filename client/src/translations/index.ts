import { en } from './en';
import { pt } from './pt';

export type Language = 'en' | 'pt';
export type Translation = typeof en;

export const translations = {
    en,
    pt
};
