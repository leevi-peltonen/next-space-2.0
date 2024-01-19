import { Character, User } from "@prisma/client";
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

type CharacterState = {
    allCharacters: Character[];
    character: Character | null;
    setCharacter: (character: Character |null) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
    allCharacters: [],
    character: null,
    setCharacter: (character) => set({ character }),
}));