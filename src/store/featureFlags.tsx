const qs = require('query-string');

const querystring = qs.parse(window.location.search);

export const LIMIT_TWENTY: Boolean = querystring.ff__limittwenty === '1';
