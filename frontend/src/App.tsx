import {Navigation} from './components/navbar.tsx';
import {Chat} from './components/chat.tsx';
import {useState} from 'react';

export default function App() {

  const [navbarHeight, setNavbarHeight] = useState(0);

  return(
    <div>
      <Navigation setNavbarHeight={setNavbarHeight} />
      <div style={{height: navbarHeight}} />
      <Chat />
    </div>

  );
}
