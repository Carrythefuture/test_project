import axios from 'axios';
import styles from './Main.module.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/auth_store';
const Main = () => {

    const navi = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const logoutBtn = () => {
        axios.post("http://10.5.5.20/auth/logout").then(() => {
            logout();
            navi("/");
        });
    }

    const secessionBtn = () => {
        axios.delete(`http://10.5.5.20/auth/${user}`).then(() => {
            logout();
            navi("/");
        });
    }

    const mypageBtn = () => {
        axios.get(`http://10.5.5.20/auth/myPage/${user}`).then((resp) => {
            console.log("지금");
            console.log(resp.data );
            navi("/mypage", {state:resp.data});
        });
    }

    return (
        <div className={styles.container}>
            <h2>환영합니다!</h2>
            <div className={styles.btns}>
                <button>회원게시판</button>
                <button onClick={mypageBtn}>마이페이지</button>
                <button onClick={logoutBtn}>로그아웃</button>
                <button onClick={secessionBtn}>회원탈퇴</button>
            </div>
        </div>
    );
}

export default Main;