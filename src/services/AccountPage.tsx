import { useState, useEffect } from "react";
import { PollType, PollVote } from "./types";
import "../assets/Style.css";
import { getAllPollsRequest, getPollById } from "../requests/PollRequests";
import { Poll } from "../components/Poll";
import { useLogedInAccount } from "../AccountProvider";

export const AccountPage = () => {
  const [pollData, setPollData] = useState<PollType[]>([]);


  const { loggedInUser } = useLogedInAccount()



  useEffect(() => {
    getAllPollsRequest(setPollData, loggedInUser.bearerToken!!);
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
              <h2>Here are all your polls</h2>
              {pollData.map((poll: PollType) => {
                  if (poll.accountId === loggedInUser.id){
                      return <Poll key={poll.id} {...poll}/>
                  } 
              })}
          </div>
          
          <div className="column">
              <h2>Here are all your polls</h2>
              {pollData.map((poll: PollType) => {
                  poll.answers.map((pollVoteId: number) => {
                    loggedInUser.myVotes.map((userVoteId: number) => {
                      if (pollVoteId === userVoteId) {
                        return <Poll key={poll.id} {...poll}/>
                      }
                    })
                  })
              })}            
          </div>

        </div>
      </div>
    </div>
  );
};