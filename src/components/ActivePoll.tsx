import { AccountType, PollType, PollVote, AccountByIdResponse } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest, getAccountByIdRequest } from "../requests/AccountRequests";
import { getPollVoteByIdRequest } from "../requests/PollVotesRequests";

export const ActivePoll = (props: PollType) => {
  //const { loggedInUser } = useLogedInAccount();

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();

  const [yesVotes, setYesVotes] = useState<Array<PollVote>>([])
  const [noVotes, setNoVotes] = useState<Array<PollVote>>([])

  const [pollOwner, setPollOwner] = useState<AccountByIdResponse>();


  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
    getAccountByIdRequest(props.accountId, setPollOwner, cookie.token)
  }, [])

  useEffect(() => {
    let yes :PollVote[] = []
    let no :PollVote[] = []

    props.answers.forEach(async element => {
      await getPollVoteByIdRequest(element, cookie.token).then(res => {
        
        if (res.status === 200){
          if (res.data.answer === "YES") {            
            yes = [...yes, res.data]
          } else {
            no = [...no, res.data]
          }
        }
      })
      setYesVotes(yes)
      setNoVotes(no)
    });
    
  }, [])

  return (
    <div className="Box" key={props.id}>
      <h3>{props.pollName}</h3>
      <p>{props.pollDesc}</p>
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* {console.log(yesVotes)} */}
        <AnswerButton
          votes={yesVotes.length}
          voteType="Yes"
          callback={() =>
            yesNoRequest(
              props.id,
              acc?.id!!,
              "yes",
              cookie.token,
            )
          }
        />
        <AnswerButton
          votes={noVotes.length}
          voteType="No"
          callback={() =>
            yesNoRequest(
              props.id,
              acc?.id!!,
              "no",
              cookie.token,
            )
          }
        />
      </div>
      <div style={{textAlign: "right"}}>
        {pollOwner?.username}
      </div>
    </div>
  );
};
