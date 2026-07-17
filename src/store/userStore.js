import { create } from "zustand";

export const useUserInfo = create((set) => ({
    username: null,
    role:null,
    setUsername: (name) => set({ username: name }),
    setUserRole: (role) => set({role})
}));
