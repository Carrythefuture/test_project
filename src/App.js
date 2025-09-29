import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';


import Join from './pages/Join/Join';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';




function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='join' element={<Join />} />
        <Route path='main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
