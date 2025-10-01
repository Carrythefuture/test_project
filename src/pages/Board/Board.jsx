import axios from 'axios';
import styles from './Board.module.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Board = () => {

    const navi = useNavigate();

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        axios.get("http://10.5.5.20/board")
            .then(resp => {
                console.log(resp);
                if (resp.data != null) {
                    setBoardList(resp.data);
                }
            })
    }, []);

    return (
        <div className={styles.container}>
            <h2 style={{ textAlign: "center" }}>게시판</h2>
            <div className={styles.board}>
                <div>SEQ</div>
                <div>TITLE</div>
                <div>ID</div>
                <div>CREATEAT</div>
                {boardList.map((board) => (
                    <div
                        key={board.seq}
                        className={styles.content}
                        onClick={() => navi(`/board/${board.seq}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <div>{board.seq}</div>
                        <div>{board.title}</div>
                        <div>{board.id}</div>
                        <div>{board.createAt}</div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default Board;