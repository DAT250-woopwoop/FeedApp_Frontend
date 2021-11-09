import { useState } from "react";
import "./assets/Style.css";
import { Accounts } from "./services/Accounts";
import { Polls } from "./services/Polls";
import { NewAccount } from "./services/NewAccount";
import { MyHeader } from "./components/MyHeader";
import { NewPoll } from "./services/NewPoll";
import { LogIn } from "./components/LogIn";
import { LogedInAccountProvider, useLogedInAccount } from "./AccountProvider";

export const App = () => (
  <LogedInAccountProvider>
    <App2 />
  </LogedInAccountProvider>
);

const App2 = () => {
  const [choise, setChoise] = useState<number>(1);

  const { loggedInUser } = useLogedInAccount();
  return (
    <div>
      {console.log(loggedInUser)
      }
      <MyHeader setPage={setChoise} />
      <div>
        {loggedInUser.bearerToken
          ? (() => {
              switch (choise) {
                case 1:
                  return <Accounts />;
                case 2:
                  return <Polls />;
                case 3:
                  return <NewAccount />;
                case 4:
                  return <NewPoll />;
                default:
                  return <div>This is an error contact admin</div>;
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
