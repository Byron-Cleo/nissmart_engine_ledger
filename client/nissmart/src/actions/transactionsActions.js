import axios from "axios";
import {
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
} from "../constants/transactionsConstants";


export const transactionHistoryDetails = (id) => async (dispatch) => {
  const user_id = id;
  try {
    dispatch({
      type: TRANSACTION_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/transaction/${user_id}`);
     console.log(data);
    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      // payload: 'Error Occured',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
