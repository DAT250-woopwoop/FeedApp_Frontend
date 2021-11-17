import { AccountType, PollType, PollVote } from "../services/types";
import { DisabledAnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest, returnAccountByUsernameRequest } from "../requests/AccountRequests";
import { getPollVoteByIdRequest } from "../requests/PollVotesRequests";

export const DisablePoll = (props: PollType) => {

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();

  const [yesVotes, setYesVotes] = useState<Array<PollVote>>([])
  const [noVotes, setNoVotes] = useState<Array<PollVote>>([])

  const [yesDisabled, setYesDisabled] = useState<boolean>(false)
  const [noDisabled, setNoDisabled] = useState<boolean>(false)


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
      await getPollVoteByIdRequest(element, cookie.token).then(async res => {
        await returnAccountByUsernameRequest(cookie.username, cookie.token).then(accRes => {
        
          if (res.status === 200){
            if (res.data.answer === "YES") {
              yes = [...yes, res.data]
              if (res.data.accountId === accRes.data.id){
                setYesDisabled(true)
              }
            } else {
              no = [...no, res.data]
              if (res.data.accountId === accRes.data.id){
                setNoDisabled(true)
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
      Name: {props.pollName} <br />
      Description: {props.pollDesc} <br />
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <DisabledAnswerButton
          ans={yesDisabled}
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
          ans={noDisabled}
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
