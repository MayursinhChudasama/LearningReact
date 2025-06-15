import { NavLink } from "react-router";

import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? classes.active : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) => (isActive ? classes.active : "")}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
