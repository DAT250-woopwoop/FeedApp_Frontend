import { AccountType, PollType, PollVote } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest } from "../requests/AccountRequests";
import { getPollVoteByIdRequest } from "../requests/PollVotesRequests";

export const DisablePoll = (props: PollType) => {

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();

  const [yesVotes, setYesVotes] = useState<Array<PollVote>>([])
  const [noVotes, setNoVotes] = useState<Array<PollVote>>([])


  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
  }, [])

  useEffect(() => {
    getPollVotes()
  }, [])

  const getPollVotes = () => {
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
  }
  
  return (
    <div className="Box" key={props.id}>
      Name: {props.pollName} <br />
      Description: {props.pollDesc} <br />
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <AnswerButton
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
        <AnswerButton
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
    </div>
  );
};