import { useEffect } from 'react';
import './App.css';
import { LoginScreen } from './features/Authentication/Views/LoginScreen';

const tele = window.Telegram.WebApp;

function App() {
  
  useEffect(() => {
    tele.ready()
  }, [])

  return (
    <div className="App">
      <LoginScreen />
    </div>
  );
}

export default App;
