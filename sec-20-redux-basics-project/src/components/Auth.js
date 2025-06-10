import classes from "./Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../store/index";

const Auth = () => {
  const authDispatch = useDispatch();
  // const auth = useSelector((state) => state.auth.isLoggedIn);
  function handleLogin() {
    authDispatch(authenticationActions.logIn());
  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={handleLogin}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
            />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
