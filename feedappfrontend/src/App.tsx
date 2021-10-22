import React, {useState, useEffect} from 'react';
import './App.css'
import Accounts from './services/Accounts';
import Polls from './services/Polls';


function App() {
  const [token, setToken] = useState<boolean>(false);
  
  const logInScreen = (
    <div className='logIn'>
      <h1>Welcome to FeedApp</h1>
      <button onClick={() => setToken(true)}>knapp</button>
    </div>
  )


  return (
    token ?
      <Accounts/>
      :
      logInScreen
  );
}

export default App;
