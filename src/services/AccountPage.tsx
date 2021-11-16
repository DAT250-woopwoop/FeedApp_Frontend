import { useState, useEffect } from "react";
import { AccountByIdResponse, AccountType, PollType } from "./types";
import "../assets/Style.css";
import { getAllPollsRequest } from "../requests/PollRequests";
import { Poll } from "../components/Poll";
import { useCookies } from "react-cookie";
import { getAccountByUsernameRequest, getAccountByIdRequest } from "../requests/AccountRequests";
import { DisablePoll } from "../components/disabledPoll";

export const AccountPage = () => {
  const [pollData, setPollData] = useState<PollType[]>([]);
  // const [account, setAccountData] = useState<AccountByIdResponse>();

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>()

  //const { loggedInUser } = useLogedInAccount()



  useEffect(() => {
    getAllPollsRequest(setPollData, cookie.token);
  }, [cookie.token]);


  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
  }, [cookie.token, cookie.username])

  // useEffect(() => {
  //   getAccountByIdRequest(acc?.id!!, setAccountData, cookie.token);
  // }, [cookie.token, cookie.username])


  return (
    <div>
      <div className="Content">
        <div className="Box" key={acc?.id}>
          Username: {acc?.username} <br />
          First name: {acc?.f_name} <br />
          Last Naem: {acc?.l_name} <br />
          Email: {acc?.e_mail} <br />
        </div>

        <div className="row">
          
          <div className="column">
              <h2>Here are all your polls:</h2>
              {pollData.map((poll: PollType) => {
                  if (poll.accountId === acc?.id){
                      return <Poll key={poll.id} {...poll}/>
                  } 
              })}
          </div>
          
          <div className="column">
              <h2>Polls you have voted on:</h2>
              {pollData.map((poll: PollType) => {
                return (
                  acc?.myVotes.map((accountVote: number) => {
                    if (poll.answers.includes(accountVote)) {
                      console.log("Inni if-en, poll.id: " + poll.id)
                      return <DisablePoll key={poll.id} {...poll}/>
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
