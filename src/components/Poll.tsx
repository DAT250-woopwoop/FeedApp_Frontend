import { PollType } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import { yesNoRequest } from "../requests/PollRequests";
import "../assets/Style.css";
import { useLogedInAccount } from "../AccountProvider";

export const Poll = (props: PollType) => {
  const { loggedInUser } = useLogedInAccount();

  return (
    <div className="Box" key={props.id}>
      Name: {props.pollName} <br />
      Description: {props.pollDesc} <br />
      <div>
        <AnswerButton
          votes={3}
          voteType="Yes"
          callback={() =>
            yesNoRequest(loggedInUser.id!!, props.id, "yes", loggedInUser.bearerToken!!)
          }
        />
        <AnswerButton
          votes={3}
          voteType="No"
          callback={() =>
            yesNoRequest(loggedInUser.id!!, props.id, "no", loggedInUser.bearerToken!!)
          }
        />
      </div>
    </div>
  );
};
