import React, {useState, useEffect} from 'react';
import { Account } from './interfaces';
import axios, {AxiosResponse} from 'axios';
import '../assets/Style.css';
import { createEmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';
import Accounts from './Accounts';
import Polls from './Polls';
import App from '../App';

const SendForm = async (event:any, setCreated:any) => {
    event.preventDefault()

    const {username, fName, lName, email, password} = event.target;

    axios
      .post<Account[]>('http://localhost:8080/users', {
        "username": username.value,
        "password": password.value,
        "e_mail": email.value,
        "f_name": fName.value,
        "l_name": lName.value
      })
      .then((response: AxiosResponse<Account[]>) => {
        console.log(".then response: " + response.data);
        setCreated(true);
      })
      .catch(err => {
        console.log(".catch err: " + err);
      })
}

function NewAccount() {
    const [choise, setChoise] = useState<number>(3);

    const [created, setCreated] = useState<boolean>(false);

    const newAccountScreen = (
        created ? 
        <Accounts/>
        :
        (<div className='App'>
            <h1>FeedApp</h1>
            <button onClick={() => setChoise(0)}>Home</button>
            <button onClick={() => setChoise(1)}>Users</button>
            <button onClick={() => setChoise(2)}>Polls</button>
            <h2>Make new user</h2>


            <form onSubmit={evt => SendForm(evt, setCreated)}>
                <div>
                    <label>
                        Username: <input type="username" id='username'/>
                    </label>
                </div>
                <div> 
                    <label>
                        First name: <input type="fName" id='fName'/>
                    </label>
                </div>
                <div>
                    <label>
                        Last name: <input type="lName" id='lName'/>
                    </label>
                </div>
                <div>
                    <label>
                        Email: <input type="email" id='email'/>
                    </label>
                </div>
                <div>
                    <label>
                        Password: <input type="password" id='password'/>
                    </label>
                </div>
                <div>
                    <button type='submit'>Register new user</button>
                </div>
            </form>
        </div>)
    );

    if (choise === 3) {
        return newAccountScreen
      } else if (choise === 2) {
        return <Polls/>;
      } else if (choise === 1) {
        return <Accounts/>
      } else {
        return <App/>
      }
}

export default NewAccount;