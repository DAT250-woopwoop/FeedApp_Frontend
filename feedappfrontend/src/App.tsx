import React, {useState} from 'react';
import './assets/Style.css'
import Accounts from './services/Accounts';
import Polls from './services/Polls';
import NewAccount from './services/NewAccount';


function App() {
  const [choise, setChoise] = useState<number>(0);
  
  const logInScreen = (
    <div className='App'>
      <h1>Welcome to FeedApp</h1>
      <button onClick={() => setChoise(1)}>Users</button>
      <button onClick={() => setChoise(2)}>Polls</button>
      <button onClick={() => setChoise(3)}>Register new user</button>
    </div>
  )

  if (choise === 3) {
    return <NewAccount/>
  } else if (choise === 2) {
    return <Polls/>;
  } else if (choise === 1) {
    return <Accounts/>
  } else {
    return logInScreen
  }
}

export default App;
