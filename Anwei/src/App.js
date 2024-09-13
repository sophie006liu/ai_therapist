import './App.css';

//importing compoenting
import Navigation from "./components/Navigation.js"
import Home from "./components/Home.js"
import VideoCall from "./components/VideoCall.js"
import Introduction from "./components/Introduction.js"
import ChatApp from "./components/ChatApp2.js"
import Diary from "./components/Diary.js"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  console.log("App component is rendering");
  return (
    <Router>
      <main className="py-0">
      <Navigation/> 
 
      <Routes> 
          <Route path="/" exact element={<Home/>} />
          <Route path="/introduction" element={<Introduction/>} />
          <Route path="/chat-app" element={<ChatApp/>} />
          <Route path="/video-call" element={<VideoCall/>} /> 
          <Route path="/diary" element={<Diary/>} /> 
      </Routes>
      </main>
    </Router>

  );
}

export default App;
