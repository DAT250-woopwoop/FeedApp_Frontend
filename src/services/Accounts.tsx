import { useState, useEffect } from "react";
import { AccountType } from "./types";
import "../assets/Style.css";
import { getAllAccountsRequest } from "../requests/AccountRequests";
import { useCookies } from "react-cookie";


export const Accounts = () => {

  const [accountData, setAccountData] = useState<AccountType[]>([]);

  const [cookies] = useCookies(["token"])

  useEffect(() => {
    getAllAccountsRequest(setAccountData, cookies.token);
  }, [cookies.token]);

  return (
    <div>
      <h2>Here are all the registerd users</h2>
      <div className="Content">
        {accountData.map((account) => {
          return (
            <div className="Box" key={account.id}>
              <h3> {account.username} </h3>
              Name: {account.f_name} {account.l_name} <br />
              Email: {account.e_mail} <br />
              Number of polls: {account.polls.length} <br />
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
