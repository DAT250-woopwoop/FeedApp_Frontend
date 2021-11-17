import { AccountType, PollType, PollVote } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest, returnAccountByUsernameRequest } from "../requests/AccountRequests";
import { getPollVoteByIdRequest } from "../requests/PollVotesRequests";
import { ActivePoll } from "./ActivePoll"
import { DisablePoll } from "./disabledPoll";

export const Poll = (props: PollType) => {
  //const { loggedInUser } = useLogedInAccount();

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();


  const [disabeld, setDisabeld] = useState<boolean>(false)


  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
  }, [])

  useEffect(() => {
    let yes :PollVote[] = []
    let no :PollVote[] = []

    props.answers.forEach(async element => {
      await returnAccountByUsernameRequest(cookie.username, cookie.token).then(async accRes => {
        await getPollVoteByIdRequest(element, cookie.token).then(res => {
          console.log("res.data.accountId: " + res.data.accountId)
          console.log("accRes.data.id: " + accRes.data.id)
          if (res.data.accountId ===  accRes.data.id) {
            setDisabeld(true)
        }
        })

        
      })
    });
    
    
  }, [])

  return (
    disabeld ?
      (<DisablePoll key={props.id} {...props}/>)
    :
      (<ActivePoll key={props.id} {...props}/>)
  );
};
