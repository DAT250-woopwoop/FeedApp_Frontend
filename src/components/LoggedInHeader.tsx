import { useCookies } from "react-cookie";
import "../assets/Style.css";

type HeaderProps = {
  setPage: (arg0: number) => void,
};

export const LoggedInHeader = (props: HeaderProps) => {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "username"])

  return (
    <div className="App">
      <h1>Welcome to FeedApp</h1>
      {/* <button className="button" onClick={() => props.setPage(1)}>Users</button> */}
      <button className="button" onClick={() => props.setPage(2)}>Polls</button>
      <button className="button" onClick={() => props.setPage(4)}>Add new poll</button>
      <button className="button" onClick={() => props.setPage(5)}>My page</button>
      <button className="button" onClick={() => props.setPage(6)}>Search</button>
      <button className="button" onClick={() => {
        removeCookie("username");
        removeCookie("token")
      }}>Sign out</button>
      </div>
  );
};
