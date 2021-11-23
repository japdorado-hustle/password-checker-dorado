import React from 'react';
import PasswordChecker from './components/PasswordChecker/PasswordChecker';

const App = () => {
  return (
    <div className="App">
      <h1>Is your password <br></br>strong enough?</h1>
      <PasswordChecker/>
    </div>
  );
}

export default App;
