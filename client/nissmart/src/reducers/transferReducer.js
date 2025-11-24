import {
  TRANSFER_CREATE_REQUEST,
  TRANSFER_CREATE_SUCCESS,
  TRANSFER_CREATE_FAIL,
  TRANSFER_CREATE_RESET,
} from "../constants/transferConstants";

export const transferFundReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case TRANSFER_CREATE_REQUEST:
      return { loading: true };
    case TRANSFER_CREATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case TRANSFER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSFER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
