import {Navigation} from './components/navbar.tsx';
import {Backend} from './components/tempdata.tsx';
import {Chat} from './components/chat.tsx';

export default function App() {
  return(
    <div>
      <Navigation />
      <Backend />
      <Chat />
    </div>

  );
}
