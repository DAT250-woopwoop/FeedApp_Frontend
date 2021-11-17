import { useState } from "react";
import { useCookies } from "react-cookie";
import { getPollById } from "../requests/PollRequests";
import { PollType } from "../services/types";
import { Poll } from "./Poll";


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
    <div
      style={{
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: "2rem",
      }}
    >
      <label>Search for poll:</label>
      <br />
      <input
        type="text"
        placeholder="poll ID"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={(e) => sendSearch(search!!)}>Search</button>
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
