import React, {useState, useEffect} from 'react';
import { Account } from './interfaces';
import axios, {AxiosResponse} from 'axios';
import '../assets/Style.css'
import Polls from './Polls';
import App from '../App';
import NewAccount from './NewAccount';

const Accounts = () => {
  const [choise, setChoise] = useState<number>(1);

  const [accountData, setAccountData] = useState<Account[]>([]);
  console.clear();
  console.log('Account data: ', accountData);

  useEffect(() => {
    axios
      .get<Account[]>('http://localhost:8080/users')
      .then((response: AxiosResponse<Account[]>) => {
        setAccountData(response.data);
        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const accountsScreen = (
    <div className="App">
      <h1>FeedApp</h1>
      <button onClick={() => setChoise(0)}>Home</button>
      <button onClick={() => setChoise(2)}>Polls</button>
      <button onClick={() => setChoise(3)}>Register new user</button>
      <h2>Here are all the registerd users</h2>
      <div className='Content'>
        {
          accountData.map(account => {
            return (
              <div className='Box' key={account.id}>
                Username: {account.username} <br/>
                First name: {account.f_name} <br/>
                Last Naem: {account.l_name} <br/>
              </div>
            )
          })
        }
      </div>

    </div>
  );

  if (choise === 3) {
    return <NewAccount/>
  } else if (choise === 2) {
    return <Polls/>;
  } else if (choise === 1) {
    return accountsScreen
  } else {
    return <App/>
  }

}

export default Accounts;
