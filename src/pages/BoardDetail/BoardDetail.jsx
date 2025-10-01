import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './BoardDetail.module.css';



const BoardDetail = () => {

    // URL 파라미터에서 seq 꺼내오기
    const { seq } = useParams();
    // board useState
    const [board, setBoard] = useState({ id: "", title: "", content: "" });
    // 속성 
    const [fixMode, setFixMode] = useState(false);
    // navigation
    const navi = useNavigate();

    // board 에서 seq 받아오기 
    useEffect(() => {
        axios.get(`http://10.5.5.20/board/${seq}`)
            .then(resp => {
                console.log(resp);
                setBoard(resp.data);
            });
    }, [seq]);

    // 게시글 수정하기
    const handleUpdate = (e) => {

        const { name, value } = e.target;
        setBoard(prev => (
            { ...prev, [name]: value }
        ));
        console.log(board);
    };

    // 수정하기 버튼
    const updateBtn = () => {
        setFixMode(true);
    }

    const backBtn = () => {
        navi("/board");
    }

    const successBtn = () => {
        console.log(board);
        axios.put(`http://10.5.5.20/board/${seq}`, board).then((resp) => {
            console.log("수정 완료:", resp.data);
            setFixMode(false);    // 수정 모드 종료
        });
    };
    const cancelBtn = () => {
        setFixMode(false);
        // 원래 데이터 다시 불러오기
        axios.get(`http://10.5.5.20/board/${seq}`).then((resp) => {
            if (resp.data) setBoard(resp.data);
        });
    };

    return (
        <div className={styles.container}>
            <h2 style={{ textAlign: "center" }}>게시판</h2>
            <div className={styles.detail}>
                <div className={styles.header}>
                    <label htmlFor="id">작성자</label>
                    <input type='text' name='id' onChange={handleUpdate} value={board.id ?? ""} readOnly /><br />
                    <label htmlFor="title">제목</label>
                    <input type='text' name='title' onChange={handleUpdate} value={board.title ? board.title : ""} readOnly={fixMode ? false : true} /><br />
                </div>
                <div className={styles.content}>
                    <input type='text' name='content' onChange={handleUpdate} value={board.content ? board.content : ""} readOnly={fixMode ? false : true} />
                    </div>
                    <button onClick={backBtn} style={{ display: !fixMode ? "block" : "none" }} >뒤로가기</button>
                    <button onClick={updateBtn} style={{ display: !fixMode ? "block" : "none" }}>수정하기</button>
                    <button onClick={updateBtn} style={{ display: !fixMode ? "block" : "none" }}>삭제하기</button>
                    <button onClick={successBtn} style={{ display: fixMode ? "block" : "none" }}>수정완료</button>
                    <button onClick={cancelBtn} style={{ display: fixMode ? "block" : "none" }}>수정취소</button>
                </div>
        </div>

    );
}

export default BoardDetail;