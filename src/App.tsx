import type { Component } from 'solid-js';
import { Route, Router } from "@solidjs/router";
import { NotFounded } from './pages/404/NotFounded';
import WebApp from '@twa-dev/sdk'
import { MainScreen } from './pages/main_screen/MainScreen';
import { QustionsRanks } from './components/questions/Questions';
import { Wallet } from './components/wallet/Wallet';



WebApp.ready();
WebApp.setHeaderColor('#1a1a1a');


const App: Component = () => {



  return (
    <div class='w-screen h-svh relative bg-[#1a1a1a]'>
      <Router root={MainScreen} >
        <Route path="/" component={QustionsRanks} />
        <Route path="/wallet" component={Wallet} />
        <Route path="*" component={NotFounded} />
      </Router>

    </div>

  );
};

export default App;
