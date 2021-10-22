import React, {useState, useEffect} from 'react';
import { Account } from './interfaces';
import axios, {AxiosResponse} from 'axios';


const Accounts = () => {
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

  return (
    <div className="App">
      Accounts:
      <ul>
        <li key="templte">Username: f_name l_name</li>

        {
          accountData.map(account => {
            return <li key={account.id}>{account.username}: {account.f_name} {account.l_name}</li>
          })
        }
      </ul>
    </div>
  );
}

export default Accounts;
