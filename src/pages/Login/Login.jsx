
import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navi = useNavigate();
    const [login, setLogin] = useState({
        id: "", pw: ""
    });
    const handleLogin = (e) => {
        const { name, value } = e.target;
        setLogin(prev => ({ ...prev, [name]: value }));
    }
    const LoginBtn = () => {
        console.log(login);
        axios.post("http://10.5.5.20/auth/login", login).then(resp => {
            setLogin({ id: "", pw: "" })
            console.log(resp);
            if(resp.data == "success")
            {
                navi("/main");
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
                </div>
            </div>
        </div>
    );
}

export default Login;