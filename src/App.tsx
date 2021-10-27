import { useState } from "react";
import "./assets/Style.css";
import { Accounts } from "./services/Accounts";
import { Polls } from "./services/Polls";
import { NewAccount } from "./services/NewAccount";
import { MyHeader } from "./components/MyHeader";
import { NewPoll } from "./services/NewPoll";

export const App = () => {
  const [choise, setChoise] = useState<number>(1);

  return (
    <div>
      {console.log(choise)}

      <MyHeader setPage={setChoise} />
      <div>
        {(() => {
          switch (choise) {
            case 1:
              return (<Accounts />)
            case 2:
              return (<Polls />)
            case 3:
              return (<NewAccount />)
            case 4:
              return <NewPoll/>
            default:
              return (<div>Hei</div>);
          }
        })()}
      </div>
    </div>
  );
};
