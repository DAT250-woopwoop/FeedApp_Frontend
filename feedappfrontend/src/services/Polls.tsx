import React, {useState, useEffect} from 'react';
import { Poll } from './interfaces';
import axios, {AxiosResponse} from 'axios';

const Polls = () => {
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

  return (
    <div className="App">
      Polls:
      <ul>
        <li key="templte">Pollname: poll description</li>

        {
          pollData.map(poll => {
            return <li key={poll.id}>{poll.pollName}: {poll.pollDesc}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Polls;
