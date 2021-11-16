import { useState, useEffect } from "react";
import { PollType } from "./types";
import "../assets/Style.css";
import { postNewPollRequest } from "../requests/AccountRequests";
import { getAllPollsRequest } from "../requests/PollRequests";
import { Poll } from "../components/Poll";

import { useCookies } from "react-cookie";

export const Polls = () => {
  const [pollData, setPollData] = useState<PollType[]>([]);

  const [cookies] = useCookies(["token"])

  useEffect(() => {
    getAllPollsRequest(setPollData, cookies.token);
  }, [cookies.token]);

  return (
    <div>
      <h2>Here are all the polls</h2>
      <div className="Content">
        {pollData.map((poll: PollType) => {
          return <Poll key={poll.id} {...poll}/>
        })}
      </div>
    </div>
  );
};
