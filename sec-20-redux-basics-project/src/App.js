import Counter from "./components/Counter";
import Auth from "./components/Auth";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth.isLoggedIn);
  // console.log(auth);

  return (
    <>
      <Header />
      {!auth && <Auth />}
      {auth && <UserProfile />}

      <Counter />
    </>
  );
}

export default App;
