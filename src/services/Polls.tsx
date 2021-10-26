import React, {useState, useEffect} from 'react';
import { Poll } from './interfaces';
import axios, {AxiosResponse} from 'axios';
import '../assets/Style.css'
import Accounts from './Accounts';
import App from '../App';

const Polls = () => {
  const [choise, setChoise] = useState<number>(2);

  const [pollData, setPollData] = useState<Poll[]>([]);
  console.clear();
  console.log('Account data: ', pollData);

  useEffect(() => {
    axios
      .get<Poll[]>('http://localhost:8080/polls')
      .then((response: AxiosResponse<Poll[]>) => {
        setPollData(response.data);
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const pollsScreen = (
    <div className="App">
      <h1>FeedApp</h1>
      <button onClick={() => setChoise(0)}>Home</button>
      <button onClick={() => setChoise(1)}>Users</button>
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
