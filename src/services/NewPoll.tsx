import { useEffect, useState } from "react";
import { postNewPollRequest } from "../requests/AccountRequests";
import { MakeNewPollRequest } from "./types";

export const NewPoll = () => {
  const [newPollData, setNewPollData] = useState<MakeNewPollRequest>({
    pollDesc: "",
    pollName: "",
    startTime: "",
    endTime: "",
    privatePoll: false,
    closed: false, // burde bli satt i backend
    yesOption: 0, // burde bli satt i backend
    noOption: 0, // burde bli satt i backend
  });

  const collectForm = (event: any) => {
    event.preventDefault();
    const { title, desc, sTime, eTime, priv } = event.target;

    setNewPollData({
      pollDesc: title.value,
      pollName: desc.value,
      startTime: sTime.value,
      endTime: eTime.value,
      privatePoll: Boolean(priv.value),
      closed: false, // burde bli satt i backend
      yesOption: 0, // burde bli satt i backend
      noOption: 0, // burde bli satt i backend
    });
  };
  useEffect(() => {
      if(newPollData.pollName!==""){
        postNewPollRequest(newPollData, 1, (e)=>{})
    }
  }, [newPollData]);

  return (
    <div>
      <h2>Make new poll</h2>

      <form onSubmit={(evt) => collectForm(evt)}>
        <div>
          <label>
            Title: <input type="title" id="title" />
          </label>
        </div>
        <div>
          <label>
            Description: <input type="desc" id="desc" />
          </label>
        </div>
        <div>
          <label>
            Start time: 
            <input defaultValue="2021-03-21 18:10:00" type="sTime" id="sTime" />
          </label>
        </div>
        <div>
          <label>
            End time: 
            <input defaultValue="2021-12-01 19:10:00" type="eTime" id="eTime" />
          </label>
        </div>
        <div>
          <label>
            Private: <input defaultValue="False" type="priv" id="priv" />
          </label>
        </div>
        <div>
          <button type="submit">Register new poll</button>
        </div>
      </form>
    </div>
  );
};
