import './App.css'
import Profiles from './Profiles'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Form from './Form';
import Edit from './Edit';
function App() {

  return (
    <div>
    <Router>
      <Routes>
      <Route path='/' element={<Profiles />}/>
      <Route path='/form' element={<Form />}/>
      <Route path='/edit' element={<Edit />}/>

      </Routes>
    </Router>

  </div>
  )
}

export default App
