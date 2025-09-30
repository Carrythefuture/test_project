import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import { create } from 'zustand';
import useAuthStore from './store/auth_store';
import Join from './pages/Join/Join';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';

function App() {

  const isLogin = useAuthStore((state) => state.isLogin);

  // 세션스토리지에서 겟로그인아이디를 꺼내기 ( 상태 값 아니고 그냥 스트링임 )
  const loginId = sessionStorage.getItem("loginId");
  const login = useAuthStore((state) => state.login);

  // 실행하자마자 아이디 꺼내서 로그인 처리 하는 거임
  //login(loginId); 
  if(sessionStorage.getItem("loginId") != null)
  {
     login(sessionStorage.getItem("loginId"));
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogin ? <Main /> : <Login />} />
        <Route path='join' element={<Join />} />
        <Route path='main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
