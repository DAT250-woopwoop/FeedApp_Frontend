import {useState, useEffect} from 'react';
import { Poll } from './types';
import '../assets/Style.css'
import Accounts from './Accounts';
import App from '../App';
import { postNewPollRequest } from '../requests/AccountRequests';
import { getAllPollsRequest } from '../requests/PollRequests';

const Polls = () => {
  const [choise, setChoise] = useState<number>(2);

  const [pollData, setPollData] = useState<Poll[]>([]);


  useEffect(() => {
    getAllPollsRequest(setPollData)
  }, [])


  const pollsScreen = (
    <div className="App">
      <h1>FeedApp</h1>
      <button onClick={() => setChoise(0)}>Home</button>
      <button onClick={() => setChoise(1)}>Users</button>
      <button onClick={() => {
         postNewPollRequest({
          "pollDesc": "Dette er den jeg sender nå?",
          "pollName":  "Dette er en ny",
          "startTime": "2021-03-30 18:10:00",
          "endTime" : "2021-12-12 19:10:00",
          "privatePoll": true,
          "closed" : false,
          "yesOption" : 0,
          "noOption" : 0,
    
  }, 1, setPollData);
      
      }}>Make new poll</button>
      <h2>Here are all the polls</h2>
      <div className='Content'>
        {
          pollData.map(poll => {
            return (
              <div className='Box' key={poll.id}>
                Name: {poll.pollName} <br/>
                Description: {poll.pollDesc} <br/>
              </div>
            )
          })
        }
      </div>

    </div>
  );

  if (choise === 2) {
    return pollsScreen;
  } else if (choise === 1) {
    return <Accounts/>;
  } else {
    return <App/>
  }

}

export default Polls;
