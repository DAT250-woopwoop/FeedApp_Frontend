import { useState } from "react";
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
import { MinSide } from "./components/MinSide";

export const App = () => (
  <LogedInAccountProvider>
    <App2 />
  </LogedInAccountProvider>
);

const App2 = () => {
  const [choise, setChoise] = useState<number>(0);

  const { loggedInUser } = useLogedInAccount();
  return (
    <div>
      {loggedInUser.bearerToken ? 
        <LoggedInHeader setPage={setChoise} />
      : <DoorlockHeader setPage={setChoise} /> }
      <div>
        {loggedInUser.bearerToken
          ? (() => {
              switch (choise) {
                case 1:
                  return <Accounts />;
                case 2:
                  return <Polls />;
                case 4:
                  return <NewPoll />;
                case 5: 
                  return <MinSide />
                case 6:
                  return <PollSearch/>
                default:
                  return (<h1>HMMMMM</h1>)
              }
            })()
          : (() => {
            switch (choise) {
              case 3:
                return <NewAccount />;
              default:
                return <LogIn
                  username={loggedInUser.username}
                  token={loggedInUser.bearerToken}
              />
          }
        })()}
      </div>
    </div>
  );
};
