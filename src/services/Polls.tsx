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
      <button
        onClick={() => {
          postNewPollRequest(
            {
              pollDesc: "Dette er den jeg sender nå?",
              pollName: "Dette er en ny",
              startTime: "2021-03-30 18:10:00",
              endTime: "2021-12-12 19:10:00",
              privatePoll: true,
              closed: false,
              yesOption: 0,
              noOption: 0,
            },
            1,
            setPollData,
            cookies.token
          );
        }}
      >
        Make new poll
      </button>
      <h2>Here are all the polls</h2>
      <div className="Content">
        {pollData.map((poll: PollType) => {
          return <Poll key={poll.id} {...poll}/>
        })}
      </div>
    </div>
  );
};
