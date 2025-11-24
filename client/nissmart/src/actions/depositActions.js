import axios from "axios";
import {
  DEPOSIT_CREATE_REQUEST,
  DEPOSIT_CREATE_SUCCESS,
  DEPOSIT_CREATE_FAIL,
} from "../constants/depositConstants";

//deposit funds
export const depositCash = (user) => async (dispatch) => {
  try {
    dispatch({
      type: DEPOSIT_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/deposit", user, config);

    dispatch({
      type: DEPOSIT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEPOSIT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
