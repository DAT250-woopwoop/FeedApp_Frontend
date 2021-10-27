import { PollType } from "../services/types";
import { AnswerButton } from "./AnswerButton";
import "../assets/Style.css";

export const Poll = (props:PollType) => {
  return (
    <div className="Box" key={props.id}>
      Name: {props.pollName} <br />
      Description: {props.pollDesc} <br />
      <div>
        <AnswerButton votes={props.yesOption}voteType="Yes" callback={() => {}} />
        <AnswerButton votes={props.noOption} voteType="No" callback={() => {}} />
      </div>
    </div>
  );
};
