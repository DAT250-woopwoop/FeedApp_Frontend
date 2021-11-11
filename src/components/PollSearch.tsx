import { useState } from "react";
import { useLogedInAccount } from "../AccountProvider";
import { getPollById } from "../requests/PollRequests";
import { PollType } from "../services/types";
import { Poll } from "./Poll";



const PollSearch = () => {

    const { loggedInUser } = useLogedInAccount();
    const [search, setSearch ] = useState<string>("0");

    const [foundPoll, setFoundPoll ] = useState<PollType>();
    
    const sendSearch = async (pollId: string) => {
        await getPollById(parseInt(pollId), loggedInUser.bearerToken!!)
        .then(res => {
            if (res.status === 200){
                setFoundPoll(res.data)
            } else {
                console.log(`responded back with ${res.status}`)
            }
        })

    }


    return(
        <div>
            <label >
            Search for poll:
            </label>
            <br />
            <input type="text" placeholder="poll ID" onChange={e => setSearch(e.target.value)}/>
            <button onClick={e => sendSearch(search!!)}>Search</button>

            {foundPoll ? 
                <Poll {...foundPoll}/>
                : undefined
            }
            

        </div>
    )
}



export default PollSearch;