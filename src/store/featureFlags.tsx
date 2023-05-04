import qs from 'query-string';

import CARD_TEXTS from './values.json';

const querystring = qs.parse(window.location.search);

export const NUM_CARDS: number =
  "ff_card_limit" in querystring ? Number(querystring.ff_card_limit) : CARD_TEXTS.length;
export const HEARTS: Boolean = querystring.ff__hearts === "1";
const wishlist_ratio =
  "ff_wishlist_ratio" in querystring ? Number(querystring.ff_wishlist_ratio) : 0.25;
export const NUM_WISHLIST_CARDS = Math.max(1, Math.floor(NUM_CARDS * wishlist_ratio));
export const MIN_SELECT = "ff_min_select" in querystring ? Number(querystring.ff_min_select) : 1;
