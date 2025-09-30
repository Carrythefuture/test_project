import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './auth_store';


const useMemberStore = create((set) => ({

    member: { id: "", name: "" },

    setMember: (member) => set({ member }),
    updateMember: (name, value) =>
        set((state) => ({
            member: { ...state.member, [name]: value }
        })),
        

}));


export default useMemberStore;
