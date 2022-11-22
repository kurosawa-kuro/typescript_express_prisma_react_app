import React, { useState } from "react";
import styles from "./Auth.module.css";
// import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncLogin } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

const Auth = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [successMsg, setSuccessMsg] = useState("notLogin");

  const login = async () => {
    const data = { email, password }
    const result = await dispatch(
      fetchAsyncLogin(data)
    );

    console.log("first")
    console.log({ result })

    if (fetchAsyncLogin.fulfilled.match(result)) {
      setSuccessMsg("Successfully logged in!");
      history.push("/main");
    } else {
      setSuccessMsg("Login error!");
    }
  };
  const authUser = async (e: any) => {
    e.preventDefault();

    if (isLogin) {
      login();
    } else {
      // const result = await dispatch(
      //   fetchAsyncRegister({ email: email, password: password })
      // );
      // if (fetchAsyncRegister.fulfilled.match(result)) {
      //   login();
      // } else {
      //   setSuccessMsg("Registration error!");
      // }
    }
  };

  return (
    <div className={styles.auth__root}>
      <span className={styles.auth__status}>{successMsg}</span>
      <form onSubmit={authUser}>
        <div className={styles.auth__input}>
          <label data-testid="label-email">Email: </label>
          <input
            data-testid="input-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.auth__input}>
          <label data-testid="label-password">Password: </label>
          <input
            data-testid="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? "Login" : "Register"}</button>

      </form>
      <div style={{ marginTop: 5 }}>
        <button>Login/Register</button>
        {/* <FlipCameraAndroidIcon
            data-testid="toggle-icon"
            className={styles.auth__toggle}
            onClick={() => setIsLogin(!isLogin)}
          /> */}
      </div>
    </div>
  );
};

export default Auth;
