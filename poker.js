import process from 'process';
import { compareCards } from './services/poker.service.js';

const firstHand = process.argv[2];
const secondHand = process.argv[3];

compareCards(firstHand, secondHand);
