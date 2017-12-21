import {DETAIL_MODAL_OPENED, UPDATE_MODAL_OPENED, CONFIRMATION_MODAL_OPENED, CREATE_MODAL_OPENED} from "../types";

export default function modals(state = {}, action = {}) {
  switch (action.type) {
    case DETAIL_MODAL_OPENED:
      return action.data;
    case UPDATE_MODAL_OPENED:
      return action.data;
    case CONFIRMATION_MODAL_OPENED:
      return action.data;
    case CREATE_MODAL_OPENED:
      return action.data;
    default:
      return state;
  }
}
