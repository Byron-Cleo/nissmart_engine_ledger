import axios from "axios";
import {
  WITHDRAW_CREATE_REQUEST,
  WITHDRAW_CREATE_SUCCESS,
  WITHDRAW_CREATE_FAIL,
} from "../constants/withdrawConstants";

//withdraw funds
export const withdrawCash = (user) => async (dispatch) => {
  try {
    dispatch({
      type: WITHDRAW_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/withdraw", user, config);

    dispatch({
      type: WITHDRAW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WITHDRAW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
