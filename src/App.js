import React from 'react';
import { login } from './utils/near';
import { Notification } from './components/utils/Notification';
import Books from './components/bookhub/Books';
import Cover from './components/utils/Cover';
import coverImg from './assets/img/undraw_read.svg';
import './App.css';
import Index from './components/Footer';
import BhNav from './components/Navbar';

const App = function AppWrapper() {
  const account = window.walletConnection.account();

  return (
    <div>
      <Notification />
      {account.accountId ? (
        <div>
          <BhNav />
          <br />
          <main>
            <Books />
          </main>


          <Index />
        </div>
      ) : (
        <Cover name="Bookhub" login={login} coverImg={coverImg} />
      )}
    </div>
  );
};

export default App;
