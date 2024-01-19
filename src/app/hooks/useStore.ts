import { User } from "@prisma/client";
import { create } from "zustand";

type UserState = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}));