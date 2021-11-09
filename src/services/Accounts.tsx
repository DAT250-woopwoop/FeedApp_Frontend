import { useState, useEffect } from "react";
import { AccountType } from "./types";
import "../assets/Style.css";
import { getAllAccountsRequest } from "../requests/AccountRequests";

export const Accounts = () => {

  const [accountData, setAccountData] = useState<AccountType[]>([]);

  useEffect(() => {
    getAllAccountsRequest(setAccountData);
  }, []);

  return (
    <div>
      <h2>Here are all the registerd users</h2>
      <div className="Content">
        {accountData.map((account) => {
          return (
            <div className="Box" key={account.id}>
              Username: {account.username} <br />
              First name: {account.f_name} <br />
              Last Naem: {account.l_name} <br />
            </div>
          );
        })}
      </div>
    </div>
  );
      }
/*
  if (choise === 3) {
    return <NewAccount/>
  } else if (choise === 2) {
    return <Polls/>;
  } else if (choise === 1) {
    return accountsScreen
  } else {
    return <App/>
  }
  */
