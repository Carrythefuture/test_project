import { create } from 'zustand';

// create () : 저장할 때 콜백을 원함
// 객체 하나만 리턴할 거임 () 소괄호 하나 추가 리턴 값 꺼
// set : 보관할 상태들을 안에 생성함 , set이 상태 값들을 수정하기 위해 필요한 함수임
const useAuthStore = create((set) => ({
    user: "",
    isLogin: false,
    login: (user) => {
        sessionStorage.setItem("loginId", user);
        set({ user: user, isLogin: true })
    },
    logout: () => {
        sessionStorage.removeItem("loginId");
        set({ user: "", isLogin: false })}
}));

export default useAuthStore;