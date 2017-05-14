const CARDS = require('./values.json');

const cardsNeeded = (stage: number): number => {
    if (stage === 1) {
        return Math.floor(CARDS.length / 2);
    } else {
        return Math.floor(cardsNeeded(stage - 1) / 2);
    }
};

export default cardsNeeded;
