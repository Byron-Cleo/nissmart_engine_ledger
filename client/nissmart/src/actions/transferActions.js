import axios from "axios";
import {
  TRANSFER_CREATE_REQUEST,
  TRANSFER_CREATE_SUCCESS,
  TRANSFER_CREATE_FAIL,
} from "../constants/transferConstants";

//withdraw funds
export const transferCash = (user) => async (dispatch) => {
  try {
    dispatch({
      type: TRANSFER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/transfer", user, config);

    dispatch({
      type: TRANSFER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSFER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
