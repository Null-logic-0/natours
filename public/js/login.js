/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";

export const handleLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const handleLogOut = async () => {
  try {
    const res = await axios({
      url: "/api/v1/users/logout",
    });
    if ((res.data.status = "success")) {
      //   location.reload(true);
      location.assign("/");
    }
  } catch (error) {
    showAlert("error", "Error logging out! Try again");
  }
};
