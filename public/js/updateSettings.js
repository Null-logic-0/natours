// update data

import axios from "axios";
import { showAlert } from "./alert";

export const updateDataSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "api/v1/users/updateMyPassword"
        : "api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });
    if (res.data.status === "success") {
      location.assign("/account");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
