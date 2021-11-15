import { AccountType, PollType } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { getAccountByUsernameRequest } from "../requests/AccountRequests";

export const Poll = (props: PollType) => {
  //const { loggedInUser } = useLogedInAccount();

  const [cookie] = useCookies(["token", "username"])
  const [acc, setAcc] = useState<AccountType>();

  useEffect(() => {
    getAccountByUsernameRequest(cookie.username, cookie.token, setAcc)
  }, [])

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
          votes={3}
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
          votes={3}
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
