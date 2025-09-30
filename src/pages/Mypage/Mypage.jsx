import { useNavigate } from 'react-router-dom';
import styles from './Mypage.module.css';
import useMemberStore from '../../store/member_store';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Mypage = () => {

    const setMember = useMemberStore((state) => state.setMember);
    const member = useMemberStore((state) => state.member);
    const updateMember = useMemberStore((state) => state.updateMember);

    const loginId = sessionStorage.getItem("loginId");
    console.log(loginId);
    useEffect(() => {
        if (loginId != null) {
            

            axios.get(`http://10.5.5.20/auth/myPage/${loginId}`).then(resp => {
                console.log(resp);
                if (resp.data != null) {
                    setMember(resp.data);
                }
            });
        }
    }, []);
    const navi = useNavigate();

    const handleUpdate = (e) => {
        
        const {name , value} = e.target;
        updateMember(name,value);
    }; 


    const [fixMode,setFixMode] = useState (false);
    // 수정하기 버튼
    const updateBtn = () => {
        setFixMode(true);
    }

    const backBtn = () => {
        navi("/");
    }

    const successBtn = () => {
        console.log(member);
    axios.put(`http://10.5.5.20/auth/${loginId}`, member).then((resp) => {
      console.log("수정 완료:", resp.data);
      setMember(resp.data); // 서버 응답 반영
      setFixMode(false);    // 수정 모드 종료
    });
  };
     const cancelBtn = () => {
    setFixMode(false);
    // 원래 데이터 다시 불러오기
    axios.get(`http://10.5.5.20/auth/myPage/${loginId}`).then((resp) => {
      if (resp.data) setMember(resp.data);
    });
  };
    
    return (
        <div className={styles.container}>
            <h1 style={{ textAlign: "center" }}>마이페이지</h1>
            <div className='idArea'>
                <div>id</div>
                <input type="text" name="id" placeholder='input id' onChange={handleUpdate} value={member.id}   readOnly={fixMode ? false : true} />
            </div>
            <div className='nameArea'>
                <div>name</div>
                <input type="text" name="name" placeholder='input name' onChange={handleUpdate} value={member.name}   readOnly={fixMode ? false : true} />
            </div>
            <button onClick={updateBtn} style={{display:!fixMode?"block":"none"}}>수정하기</button>
            <button onClick={backBtn} style={{display:!fixMode?"block":"none"}}>뒤로가기</button>
            <button onClick={successBtn} style={{display:fixMode?"block":"none"}}>수정완료</button>
            <button onClick={cancelBtn} style={{display:fixMode?"block":"none"}}>수정취소</button>
        </div>
    );

}

export default Mypage;