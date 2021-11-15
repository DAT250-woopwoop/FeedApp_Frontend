import { useEffect, useState } from "react";
import "./assets/Style.css";
import { Accounts } from "./services/Accounts";
import { Polls } from "./services/Polls";
import { NewAccount } from "./services/NewAccount";
import { LoggedInHeader } from "./components/LoggedInHeader";
import { NewPoll } from "./services/NewPoll";
import { LogIn } from "./components/LogIn";
import { LogedInAccountProvider, useLogedInAccount } from "./AccountProvider";
import { DoorlockHeader } from "./components/DoorlockHeader";
import PollSearch from "./components/PollSearch";
import { AccountPage } from "./services/AccountPage"
import { CookiesProvider, useCookies } from "react-cookie";
import { getAccountByUsernameRequest } from "./requests/AccountRequests";
import { BearerToken, LoggedInUser } from "./services/types";

export const App = () => (
    <CookiesProvider >
  <LogedInAccountProvider>
      <App2 />
  </LogedInAccountProvider>
    </CookiesProvider>
);

const App2 = () => {
  const [choise, setChoise] = useState<number>(0);
  const [cookies, setCookie] = useCookies(["token", "username"])

  //const { getAllInfoOfAccount } = useLogedInAccount();

  const [bearerToken, setBearerToken] = useState<BearerToken>({
    Bearer: "",
  });
  const [userId, setUserId] = useState<number>();
  const [username, setUsername] = useState<string>("");
  const [fname, setFName] = useState<string>("");
  const [lName, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [myVotes, setMyVotes] = useState<number[]>([]);


  
/*
  const [loggedInUser, setLogedInUser] = useState<LoggedInUser>({
    bearerToken: bearerToken?.Bearer,
    id: userId,
    username: username,
    f_name: fname,
    l_name: lName,
    e_mail: email,
    myVotes: myVotes
  });
  

  useEffect(() => {
    if(cookies.token){
      getAccountByUsernameRequest(cookies.username, cookies.token, setLogedInUser)
      console.log("skjer dette?");
      
    }
  }, [])
*/
  //const { loggedInUser } = useLogedInAccount();
  return (
    
    <div>
      {cookies.token ? 
        <LoggedInHeader setPage={setChoise} />
      : <DoorlockHeader setPage={setChoise} /> }
    
      <div>
        {cookies.token 
          ? (() => {
              switch (choise) {
                case 1:
                  return <Accounts />;
                case 2:
                  return <Polls />;
                case 4:
                  return <NewPoll />;
                case 5:
                  return <PollSearch/>
                default:
                  return <AccountPage/>
              }
            })()
          : (() => {
            switch (choise) {
              case 3:
                return <NewAccount />;
              default:
                return <LogIn
                  username={cookies.username}
                  token={cookies.token}
              />
            }
          })()}
      </div>
    </div>
  );
};
