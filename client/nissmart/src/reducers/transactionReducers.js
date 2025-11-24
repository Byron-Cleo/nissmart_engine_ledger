import {
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
} from "../constants/transactionsConstants";

export const transactionHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return { loading: true };
    case TRANSACTION_DETAILS_SUCCESS:
      return { loading: false, success: true, transactionHistory: action.payload };
    case TRANSACTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};