import { useState, useEffect } from "react";
import { PollType, PollVote, AccountType, AccountByIdResponse } from "./types";
import "../assets/Style.css";
import { getAllPollsRequest } from "../requests/PollRequests";
import { Poll } from "../components/Poll";
import { useLogedInAccount } from "../AccountProvider";
import { getAccountByIdRequest } from "../requests/AccountRequests";

export const AccountPage = () => {
  const [pollData, setPollData] = useState<PollType[]>([]);
  const [account, setAccountData] = useState<AccountByIdResponse>();


  const { loggedInUser } = useLogedInAccount()



  useEffect(() => {
    getAllPollsRequest(setPollData, loggedInUser.bearerToken!!);
    getAccountByIdRequest(loggedInUser.id!!, setAccountData, loggedInUser.bearerToken!!);
  }, [loggedInUser.bearerToken]);





  return (
    <div>
      <div className="Content">
        <div className="Box" key={loggedInUser.id}>
          Username: {loggedInUser.username} <br />
          First name: {loggedInUser.f_name} <br />
          Last Naem: {loggedInUser.l_name} <br />
          Email: {loggedInUser.e_mail} <br />
        </div>

        <div className="row">
          
          <div className="column">
              <h2>Here are all your polls:</h2>
              {pollData.map((poll: PollType) => {
                  if (poll.accountId === loggedInUser.id){
                      return <Poll key={poll.id} {...poll}/>
                  } 
              })}
          </div>
          
          <div className="column">
              <h2>Polls you have voted on:</h2>
              {pollData.map((poll: PollType) => {
                return (
                  account?.myVotes.map((accountVote: number) => {
                    if (poll.answers.includes(accountVote)) {
                      console.log("Inni if-en, poll.id: " + poll.id)
                      return <Poll key={poll.id} {...poll}/>
                    }
                  })
                )                
              })}            
          </div>

        </div>
      </div>
    </div>
  );
};
