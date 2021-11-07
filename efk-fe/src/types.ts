import { ANSWER } from './constants';
import { Word } from './interfaces';

export type ClickBtnAudioHandler = (audioSrc: string) => () => void;

export type ClickWordCardHandler = (word: Word) => ANSWER;

export type Data = {
  [key: string]: string | Blob;
};
