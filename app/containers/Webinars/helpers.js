import * as operations from "./actions";
import {
    NEW_EVENTS,
    PAST_EVENTS
} from "./constants";

export const dropdownOptions = (dispatch) => [
  {
    text: NEW_EVENTS,
    onClick: () => dispatch(operations.fetchWebinars(NEW_EVENTS))
  },
  {
    text: PAST_EVENTS,
    onClick: () => dispatch(operations.fetchPastWebinars(PAST_EVENTS))
  }
];