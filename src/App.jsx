import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.jsx'
import CallbackYoutube from './callback/callback_youtube.jsx'
import CallbackGithub from './callback/callback_github.jsx'
import PrivateYoutube from './private/private_youtube.jsx'
import PrivateGithub from './private/private_github.jsx'

function App() {
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/callback/callback_youtube" element={<CallbackYoutube/>}/>
      <Route path="/callback/callback_github" element={<CallbackGithub/>}/>
      <Route path="/private/private_youtube" element={<PrivateYoutube/>}/>
      <Route path="/private/private_github" element={<PrivateGithub/>}/>
    </Routes>
  </Router>
  )
}

export default App
