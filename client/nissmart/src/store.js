import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userCreateReducer,
  userListReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  depositFundReducer,
} from "./reducers/depositReducers";

import {
  withdrawFundReducer,
} from "./reducers/withdrawReducers";

import {
  transferFundReducer,
} from "./reducers/transferReducer";

import {
  transactionHistoryReducer,
} from "./reducers/transactionReducers";

import {
  totalUsersReducer,
  totalWalletsValueReducer,
  totalTransfersReducer,
  totalWithdrawsReducer,
} from "./reducers/analyticsReducers";

const reducer = combineReducers({
  //User Reducers
  userCreate: userCreateReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  depositFund: depositFundReducer,
  withdrawFund: withdrawFundReducer,
  transferFund: transferFundReducer,
  transactionHistory: transactionHistoryReducer,

  totalUsers: totalUsersReducer,
  totalWalletsValue: totalWalletsValueReducer,
  totalTransfers: totalTransfersReducer,
  totalWithdraws: totalWithdrawsReducer,
});

//OUR MIDDLEWARE
const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
