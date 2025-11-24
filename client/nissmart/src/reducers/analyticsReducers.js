import {
TOTAL_USERS_REQUEST,
TOTAL_USERS_SUCCESS,
TOTAL_USERS_FAIL,

TOTAL_WALLET_VALUE_REQUEST,
TOTAL_WALLET_VALUE_SUCCESS,
TOTAL_WALLET_VALUE_FAIL,

TOTAL_TRANSFER_REQUEST,
TOTAL_TRANSFER_SUCCESS,
TOTAL_TRANSFER_FAIL,

TOTAL_WITHDRAWS_REQUEST,
TOTAL_WITHDRAWS_SUCCESS,
TOTAL_WITHDRAWS_FAIL,
} from "../constants/analyticsConstants";

export const totalUsersReducer = (state = { totalUsers: {} }, action) => {
  switch (action.type) {
    case TOTAL_USERS_REQUEST:
      return { loading: true };
    case TOTAL_USERS_SUCCESS:
      return { loading: false, success: true, totalUsers: action.payload };
    case TOTAL_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const totalWalletsValueReducer = (state = { totalWalletsValue: {} }, action) => {
  switch (action.type) {
    case TOTAL_WALLET_VALUE_REQUEST:
      return { loading: true };
    case TOTAL_WALLET_VALUE_SUCCESS:
      return { loading: false, success: true, totalWalletsValue: action.payload };
    case TOTAL_WALLET_VALUE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const totalTransfersReducer = (state = { totalTransfers: {} }, action) => {
  switch (action.type) {
    case TOTAL_TRANSFER_REQUEST:
      return { loading: true };
    case TOTAL_TRANSFER_SUCCESS:
      return { loading: false, success: true, totalTransfers: action.payload };
    case TOTAL_TRANSFER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const totalWithdrawsReducer = (state = { totalWithdraws: {} }, action) => {
  switch (action.type) {
    case TOTAL_WITHDRAWS_REQUEST:
      return { loading: true };
    case TOTAL_WITHDRAWS_SUCCESS:
      return { loading: false, success: true, totalWithdraws: action.payload };
    case TOTAL_WITHDRAWS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

