import React, {useState, useEffect} from 'react';
import {Account, User} from './services/interfaces';
import axios, {AxiosResponse} from 'axios';

const App = () => {
  const [accountData, setAccountData] = useState<User[]>([]);
  console.clear();
  console.log('Account data: ', accountData);

  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response: AxiosResponse<User[]>) => {
        setAccountData(response.data);
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      Users:
      <ul>
        {
          accountData.map(user => {
            return <li key={user.id}>{user.name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;
