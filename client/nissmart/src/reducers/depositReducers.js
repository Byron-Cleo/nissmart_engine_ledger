import {
  DEPOSIT_CREATE_REQUEST,
  DEPOSIT_CREATE_SUCCESS,
  DEPOSIT_CREATE_FAIL,
  DEPOSIT_CREATE_RESET,
} from "../constants/depositConstants";

export const depositFundReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DEPOSIT_CREATE_REQUEST:
      return { loading: true };
    case DEPOSIT_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case DEPOSIT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPOSIT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
