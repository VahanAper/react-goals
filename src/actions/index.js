import { SIGN_IN } from '../constants';

export function logUser(email) {
  const action = {
    type: SIGN_IN,
    email,
  };

  return action;
}
