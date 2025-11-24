import axios from "axios";
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

export const totalUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: TOTAL_USERS_REQUEST,
    });

    const { data } = await axios.get("/api/v1/appAnalytics/totalUsers");
    const result = data;

    dispatch({
      type: TOTAL_USERS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const totalWalletsValue = () => async (dispatch) => {
  try {
    dispatch({
      type: TOTAL_WALLET_VALUE_REQUEST,
    });

    const { data } = await axios.get("/api/v1/appAnalytics/totalWalletsValue");
    const result = data;

    dispatch({
      type: TOTAL_WALLET_VALUE_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_WALLET_VALUE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const totalTransfers = () => async (dispatch) => {
  try {
    dispatch({
      type: TOTAL_TRANSFER_REQUEST,
    });

    const { data } = await axios.get("/api/v1/appAnalytics/totalTransfers");
    const result = data;

    dispatch({
      type: TOTAL_TRANSFER_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_TRANSFER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const totalWithdraws = () => async (dispatch) => {
  try {
    dispatch({
      type: TOTAL_WITHDRAWS_REQUEST,
    });

    const { data } = await axios.get("/api/v1/appAnalytics/totalWithdraws");
    const result = data;

    dispatch({
      type: TOTAL_WITHDRAWS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_WITHDRAWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};