import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../store/index";

const Header = () => {
  const authDispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isLoggedIn);
  function handleLogOut() {
    authDispatch(authenticationActions.logOut());
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {auth && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
