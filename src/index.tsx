
import { render } from 'solid-js/web';
import './index.css';
import { Root } from '../Root';
import { backButton, init, initData } from '@telegram-apps/sdk-solid';


init()
backButton.mount();
initData.restore();



const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <Root />, root!);
