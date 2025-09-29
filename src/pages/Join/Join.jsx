import { BrowserRouter, Routes, Route,Link, useNavigate} from 'react-router-dom';
import styles from './Join.module.css';
import { useState } from 'react';
import axios from 'axios';


const Join = () => {
    const navi = useNavigate();

    const [auth, setAuth] = useState({
        id: "", pw: "", name:""
    });
    const handleAuthWrite = (e) => {
        const { name, value } = e.target;
        setAuth(prev => ({ ...prev, [name]: value }));
    }
    const JoinBtn = () => {

        axios.post("http://10.5.5.20/auth/insert", auth).then(resp => {
            setAuth({ id: "", pw: "", name:"" });
            console.log(resp);
        });
        navi("/");
    }


    return (

        <div className={styles.container}>
            <h1 style={{textAlign:"center"}}>회원가입</h1>
            <div className='idArea'>
                <div>id</div>
                <input type="text" name="id" placeholder='input id' onChange={handleAuthWrite} required/>
            </div>
            <div className='pwArea'>
                <div>pw</div>
                <input type="text" name="pw" placeholder='input pw' onChange={handleAuthWrite} required/>
            </div>
            <div className='nameArea'>
                 <div>name</div>
                 <input type="text" name="name" placeholder='input name' onChange={handleAuthWrite} required/>
            </div>
            <div>
                <button onClick={JoinBtn}>회원가입</button>
                <button onClick={() => {navi("/")}}>홈으로</button>
            </div>
        </div>
    );
}

export default Join;