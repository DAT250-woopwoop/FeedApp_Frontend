import { useEffect, useState } from "react";
import { postNewPollRequest } from "../requests/AccountRequests";
import { MakeNewPollRequest } from "./types";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLogedInAccount } from "../AccountProvider";

export const NewPoll = () => {
  const { loggedInUser } = useLogedInAccount()
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
    const { title, desc, priv } = event.target;

    
    
    //"2021-12-28 19:10:00"
    const sTime = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate() + " " + startDate.getHours() +":"+ startDate.getMinutes() +":"+ startDate.getSeconds()
    const eTime = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate() + " " + endDate.getHours() +":"+ endDate.getMinutes() +":"+ endDate.getSeconds()

    setNewPollData({
      pollDesc: title.value,
      pollName: desc.value,
      startTime: sTime,
      endTime: eTime,
      privatePoll: Boolean(priv.value),
      closed: false, // burde bli satt i backend
      yesOption: 0, // burde bli satt i backend
      noOption: 0, // burde bli satt i backend
    });
  };
  useEffect(() => {
      if(newPollData.pollName!==""){
        postNewPollRequest(newPollData, 1, (e)=>{}, loggedInUser.bearerToken!!)
    }
  }, [loggedInUser.bearerToken, newPollData]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
            Start time: <DatePicker showTimeInput selected={startDate} onChange={(date:Date) => setStartDate(date)} />
          </label>
        </div>
        <div>
          <label>
            End time: <DatePicker showTimeInput selected={endDate} onChange={(date:Date) => setEndDate(date)} />
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
