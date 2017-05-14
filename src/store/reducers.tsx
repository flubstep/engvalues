const CARD_TEXTS = require('./values.json');
// const INSTRUCTIONS = require('./instructions.json');
// Update once DefinitelyTyped includes uuid 3.0.1
const uuid = require('uuid');
import { createStore, combineReducers } from 'redux';
import { LIMIT_TWENTY } from './featureFlags';

/*
  Actions:
    TOGGLE_CARD
    ADVANCE_STAGE
    RETREAT_STAGE
*/

const card = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'TOGGLE_CARD':
      if (action.key === state.key) {
        const mark = state.mark < action.stage ? action.stage : action.stage - 1;
        return { ...state, mark };
      } else {
        return state;
      }
    case 'ADVANCE_STAGE':
      if (state.mark !== 'accepted') {
        return { ...state, discard: action.stage };
      } else {
        return state;
      }
    default:
      return state;
  }
};

/*
  Cards are:
    A UUID identifier
    Text of the card body
    What round they were selected in
*/

const initialModal = {
  active: true,
  text: null
};
const modal = (state: any = initialModal, action: any) => {
  switch (action.type) {
    case 'HIDE_MODAL':
      return {
        ...state,
        active: false
      };
    case 'ADVANCE_STAGE':
      return {
        ...state,
        active: true
      };
    default:
      return state;
  }
};

const stage = (state: number = 1, action: any) => {
  switch (action.type) {
    case 'RETREAT_STAGE':
      return Math.max(state - 1, 1);
    case 'ADVANCE_STAGE':
      return state + 1;
    default:
      return state;
  }
};

const limit = LIMIT_TWENTY ? 20 : CARD_TEXTS.length;
const initialCards = CARD_TEXTS.slice(0, limit).map((text: any) => ({
  key: uuid.v4(),
  text,
  mark: 0,
}));
const cards = (state: any = initialCards, action: any) => {
  return state.map((c: any) => card(c, action));
};

const reducer = combineReducers({
  cards,
  stage,
  modal
});

export const store = createStore(reducer);
