import {
  WITHDRAW_CREATE_REQUEST,
  WITHDRAW_CREATE_SUCCESS,
  WITHDRAW_CREATE_FAIL,
  WITHDRAW_CREATE_RESET,
} from "../constants/withdrawConstants";

export const withdrawFundReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case WITHDRAW_CREATE_REQUEST:
      return { loading: true };
    case WITHDRAW_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case WITHDRAW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WITHDRAW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
