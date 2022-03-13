import {Route,Routes,Navigate} from 'react-router-dom';
import Main from './components/Main'
import Signup from './components/Signup';
import Login from './components/Login';
import Admin from './components/Admin';
import Edit from './components/Edit'
import AdminLogin from './components/AdminLogin';


function App() { 

  const user = localStorage.getItem('token')
  const admin = localStorage.getItem('admintoken')
  
  return (
    <Routes>
      {user && <Route path='/' exact element={<Main/>}/>}
      <Route path='/signup' exact element={<Signup/> } />
      <Route path='/login' exact element={<Login/> } />
      <Route path='/' exact element={<Navigate replace to='/login'/>}/>
      {admin && <Route path='/admin' exact element={<Admin/>}/>}
      <Route path='/edit/:id' exact element={<Edit/>}/>
      <Route path='/admin/login' exact element={<AdminLogin/>}/> 
      <Route path='/admin' exact element={<Navigate replace to='/admin/login'/>}/>
    </Routes>
  );
}

export default App;
