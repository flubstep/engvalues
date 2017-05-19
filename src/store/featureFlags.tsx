const qs = require('query-string');
const CARD_TEXTS = require('./values.json');

const querystring = qs.parse(window.location.search);

export const NUM_CARDS: number = 'ff_card_limit' in querystring ? Number(querystring.ff_card_limit) : CARD_TEXTS.length;
export const HEARTS: Boolean = querystring.ff__hearts === '1';
