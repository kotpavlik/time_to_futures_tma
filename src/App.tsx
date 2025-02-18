import { createEffect, type Component } from 'solid-js';
import { Route, Router } from "@solidjs/router";
import { NotFounded } from './pages/404/NotFounded';
import WebApp from '@twa-dev/sdk'
import { MainScreen } from './pages/main_screen/MainScreen';
import { QustionsRanks } from './components/questions/Questions';
import { Wallet } from './components/wallet/Wallet';
import { Friends } from './components/friends/Subscribers';
import { useAppStore } from './zustand/app_store/AppStore';
import { viewport, initData } from '@telegram-apps/sdk-solid';
import { UserType } from './zustand/user_store/UserStore';







WebApp.ready();
WebApp.setHeaderColor('#1a1a1a');


const App: Component = () => {

  const initializeApp = useAppStore((state) => state.initializeApp)


  createEffect(() => {
    viewport?.expand()

  }, [])

  const initialUserData = async () => {
    if (initData) {
      const user_data: UserType = {
        authDate: initData.authDate() ? initData.authDate()!.toLocaleDateString() : "nodate",
        isPremium: initData?.user()!.is_premium,
        my_referal_link: `https://t.me/go_futures_bot?startapp=${initData?.user()!.id}`,
        userId: initData.user()!.id,
        my_ref_invite_id: Number(initData.startParam()),
        userName: initData.user()?.username,
        my_referers: [],
        firstName: initData.user()?.first_name,
        lastName: initData.user()?.last_name,
      }
      initializeApp(user_data)
    }
  }


  initialUserData()



  return (
    <div class='w-screen h-svh relative bg-[#1a1a1a]'>
      <Router root={MainScreen} >
        <Route path="/" component={QustionsRanks} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/friends" component={Friends} />
        <Route path="*" component={NotFounded} />
      </Router>

    </div>

  );
};

export default App;
