import { useEffect, useState } from "react";
import { getAccountByUsernameRequest, postNewPollRequest } from "../requests/AccountRequests";
import { AccountType, MakeNewPollRequest } from "./types";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";

export const NewPoll = () => {

  const [cookies] = useCookies(["token", "username"])
  const [account, setAccount] = useState<AccountType>();
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

  useEffect(() => {
    getAccountByUsernameRequest(cookies.username, cookies.token, setAccount)
  },[])

  const collectForm = (event: any) => {
    event.preventDefault();
    const { title, desc, priv } = event.target;

    
    
    //"2021-12-28 19:10:00"
    const sTime = startDate.getFullYear() + "-" + startDate.getMonth() + "-" + startDate.getDate() + " " + startDate.getHours() +":"+ startDate.getMinutes() +":"+ startDate.getSeconds()
    const eTime = endDate.getFullYear() + "-" + endDate.getMonth() + "-" + endDate.getDate() + " " + endDate.getHours() +":"+ endDate.getMinutes() +":"+ endDate.getSeconds()

    setNewPollData({
      pollDesc: desc.value,
      pollName: title.value,
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
        postNewPollRequest(newPollData, account?.id!!, (e)=>{}, cookies.token)
    }
  }, [account?.id, cookies.token, newPollData]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="Content">
      <h2>Make new poll</h2>

      <form onSubmit={(evt) => collectForm(evt)}>
        <div>
          <label>
            Title: <br /> <input type="title" id="title" />
          </label>
        </div>
        <div>
          <label>
            Description: <br /> <input type="desc" id="desc" />
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
        {/* <div>
          <label>
            Private: <br /> <input defaultValue="False" type="priv" id="priv" />
          </label>
        </div> */}
        <div>
          <button type="submit">Register new poll</button>
        </div>
      </form>
    </div>
  );
};
