import { useState } from "react";
import { useCookies } from "react-cookie";
import { getPollById } from "../requests/PollRequests";
import { PollType } from "../services/types";
import { Poll } from "./Poll";
import "../assets/Style.css"


const PollSearch = () => {

  const [cookies] = useCookies(["token"])

  const [search, setSearch] = useState<string>("0");

  const [foundPoll, setFoundPoll] = useState<PollType>();

  const sendSearch = async (pollId: string) => {
    await getPollById(parseInt(pollId), cookies.token).then(
      (res) => {
        if (res.status === 200) {
          setFoundPoll(res.data);
        } else {
          console.log(`responded back with ${res.status}`);
        }
      }
    );
  };

  return (
    <div className="Content"
      // style={{
      //   textAlign: "center",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   position: "relative",
      //   paddingTop: "2rem",
      // }}
    >
      <h2>Search for poll:</h2>
      <input
        type="text"
        placeholder="poll ID"
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <button 
        onClick={(e) => sendSearch(search!!)}
        // style={{
        //   borderRadius: "10px",
        //   padding: "5px",
        //   margin: "5px",
        //   border: "1px solid"
        // }}
      >
        Search
      </button>
      <div
        style={{
          width: "40%",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "1rem 30%"
        }}
      >
        {foundPoll ? <Poll {...foundPoll} /> : undefined}
      </div>
    </div>
  );
};

export default PollSearch;
