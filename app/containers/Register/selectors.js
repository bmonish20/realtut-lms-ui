import _get from 'lodash/get';

export const fullname = state => _get(state, 'registerPage.name', '');

export const email = state => _get(state, 'registerPage.email', '');

export const password = state => _get(state, 'registerPage.password', '');

export const isLoading = state => _get(state, 'registerPage.isLoading', false)

export const errorMessage = state => _get(state, 'registerPage.errorMessage', null);

export const validations = (state) => _get(state, 'registerPage.validationError', null);

export const showEmailVerification = (state) => _get(state, 'registerPage.showEmailVerification', false);

export const emailCode = (state) => _get(state, 'registerPage.emailCode', '');

export const googleKey = (state) => _get(state, 'registerPage.googleKey', null);

export const disableResendCode = (state) => _get(state, 'registerPage.disableResendCode', false);
