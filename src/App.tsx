import { useState } from "react";
import "./assets/Style.css";
import { Accounts } from "./services/Accounts";
import { Polls } from "./services/Polls";
import { NewAccount } from "./services/NewAccount";
import { MyHeader } from "./components/MyHeader";
import { NewPoll } from "./services/NewPoll";
import { BearerToken } from "./services/types";

export const App = () => {
  const [choise, setChoise] = useState<number>(1);
  const [user, setUser] = useState<BearerToken>()

  return (
    <div>
      {console.log(choise)}
      {console.log(user?.Bearer)}

      <MyHeader setPage={setChoise} setUserDetail={setUser}/>
      <div>
        {(() => {
          switch (choise) {
            case 1:
              return <Accounts />
            case 2:
              return <Polls />
            case 3:
              return <NewAccount />
            case 4:
              return <NewPoll/>
            default:
              return <div>This is an error contact admin</div>;
          }
        })()}
      </div>
    </div>
  );
};
