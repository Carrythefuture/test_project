
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import useAuthStore from '../../store/auth_store';

axios.defaults.withCredentials = true; // 리퀘스트를 보낼 때 세션 키가 있는 경우 , 담아서 리퀘스트를 보내준다
// 자신의 브라우저가 세션 키 값을 가지고 있을 경우 세션 키 값을 담아서 보내게
// 클라이언트가 쿠기 값을 담아서 보냈 때 출발 점이 크로스 오리진이면 쿠키를 안 받아줌 ( 보안 위협 )

// 서버로 로그인 요청을 보냈는데 키 값 주고 리액트를 사용하고 있는 브라우저에서 서버가 나와 같은 
// 오리진이 아니잖아 정책상 거절 결국은 크로스 오리진이 문제가 됨
// samesite? sameorigin이 아니면 아예 안 받겠다 , 하이브리드 어떤 종류는 받고 어떤 종류는 안 받고, none 크로스 오리진
// 생각 안하고 다 받겠다



const Login = () => {

    const loginSet = useAuthStore((state) => state.login);

    const navi = useNavigate();
    const [login, setLogin] = useState({
        id: "", pw: ""
    });
    const handleLogin = (e) => {
        const { name, value } = e.target;
        setLogin(prev => ({ ...prev, [name]: value }));
    }
    // 서버 쪽 세션에 접근할 수 없음 , 데이터로 주고 받아야 함
    const LoginBtn = () => {
        console.log(login);
        axios.post("http://10.5.5.20/auth/login", login).then(resp => {
            setLogin({ id: "", pw: "" })
            console.log(resp);
            if(resp.data.loginId != null)
            {
                loginSet(resp.data.loginId);
             
                //navi("/main");
            }
        });
    }


    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <div className={styles.loginBox}>
                <div className={styles.inputLogin}>
                    <label htmlFor="id">ID</label>
                    <input type='text' placeholder='아이디 입력' name='id' onChange={handleLogin} value={login.id} /><br />
                </div>
                <div className={styles.inputLogin}>
                    <label htmlFor="pw">PW</label>
                    <input type='password' placeholder='패스워드 입력' name='pw' onChange={handleLogin} value={login.pw} />
                </div>
                <div className={styles.btns}>
                    <button onClick={LoginBtn}>로그인</button>
                    <Link to="/join"><button>회원가입</button></Link>
                      <button onClick={()=>{axios.get("http://10.5.5.20/auth")}}>테스트</button>
                </div>
            </div>
        </div>
    );
}

export default Login;