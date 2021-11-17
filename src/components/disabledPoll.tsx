import { AccountType, PollType, PollVote, AccountByIdResponse } from "../services/types";
import { DisabledAnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest, returnAccountByUsernameRequest, getAccountByIdRequest } from "../requests/AccountRequests";
import { getPollVoteByIdRequest } from "../requests/PollVotesRequests";

export const DisablePoll = (props: PollType) => {

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();

  const [yesVotes, setYesVotes] = useState<Array<PollVote>>([])
  const [noVotes, setNoVotes] = useState<Array<PollVote>>([])

  const [yesAnswer, setYesAnswer] = useState<boolean>(false)
  const [noAnswer, setNoAnswer] = useState<boolean>(false)

  const [pollOwner, setPollOwner] = useState<AccountByIdResponse>();


  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
    getAccountByIdRequest(props.accountId, setPollOwner, cookie.token)
  }, [])

  useEffect(() => {
    getPollVotes()
  }, [])

  const getPollVotes = () => {
    let yes :PollVote[] = []
    let no :PollVote[] = []
    
    props.answers.forEach(async element => {
      await getPollVoteByIdRequest(element, cookie.token).then(async res => {
        await returnAccountByUsernameRequest(cookie.username, cookie.token).then(accRes => {
        
          if (res.status === 200){
            if (res.data.answer === "YES") {
              yes = [...yes, res.data]
              if (res.data.accountId === accRes.data.id){
                setYesAnswer(true)
              }
            } else {
              no = [...no, res.data]
              if (res.data.accountId === accRes.data.id){
                setNoAnswer(true)
              }
            }
          }
        })
      })
      setYesVotes(yes)
      setNoVotes(no)
    });
  }
  
  return (
    <div className="Box" key={props.id}
      style={{
        backgroundColor: "rgb(231, 227, 227)",
        color: "gray"
      }}>
      <h3>{props.pollName}</h3>
      <p>{props.pollDesc}</p>
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <DisabledAnswerButton
          ans={yesAnswer}
          disable={true}
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
        <DisabledAnswerButton
          ans={noAnswer}
          disable={true}
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
