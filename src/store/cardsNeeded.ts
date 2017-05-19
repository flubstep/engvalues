const CARD_TEXTS = require('./values.json');
import { NUM_CARDS } from './featureFlags';

const cardsNeeded = (stage: number): number => {
    if (stage === 1) {
        return Math.floor(NUM_CARDS / 2);
    } else {
        return Math.floor(cardsNeeded(stage - 1) / 2);
    }
};

export default cardsNeeded;
