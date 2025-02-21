"use client";

import { login, signup } from "./actions";
import Styles from "../styles.module.css";

export default function LoginPage() {
  return (
    <div className={Styles.loginContainer}>
      <form suppressHydrationWarning>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue=""
          suppressHydrationWarning
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          defaultValue=""
          suppressHydrationWarning
        />
        <button className={Styles.button} formAction={login}>
          Log in
        </button>
        <button className={Styles.button} formAction={signup}>
          Sign up
        </button>
      </form>
    </div>
  );
}
