import axios from "axios";

import { FETCH_USER } from "./types";

//Method-1

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get("/api/current_user")
//       .then(response => dispatch({ type: FETCH_USER, payload: response }));
//   };
// };

//Method-2

// export const fetchUser = () => async dispatch =>
//   dispatch({ type: FETCH_USER, payload: await axios.get("/api/current_user") });

//Method-3

export const fetchUser = () => async dispatch => {
  const response = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleToken = token => async dispatch => {
  const response = await axios.post("/api/stripe", token);
  //   console.log("The post resp is ", response.data.credit);
  dispatch({ type: FETCH_USER, payload: response.data });
};
