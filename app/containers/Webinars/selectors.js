import _get from 'lodash/get';
import {NEW_EVENTS} from "./constants";

export const webinarType = state => _get(state, "webinars.webinarType", NEW_EVENTS);

export const isLoading = state => _get(state, 'webinars.isLoading', true);

export const webinars = state => _get(state, 'webinars.webinars', []);