import { Character, User } from "@prisma/client";
import { create } from "zustand";
/*
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
    addCharacter: (character: Character) => void;
    setCharacters: (characters: Character[]) => void;
    character: Character | null;
    setCharacter: (character: Character |null) => void;
}

export const useCharacterStore = create<CharacterState>((set) => ({
    allCharacters: [],
    addCharacter: (character) => set((state) => ({ allCharacters: [...state.allCharacters, character] })),
    setCharacters: (characters) => set({ allCharacters: characters }),
    character: null,
    setCharacter: (character) => set({ character }),
}));
*/

type StoreState = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;

    allCharacters: Character[];
    addCharacter: (character: Character) => void;
    setCharacters: (characters: Character[]) => void;
    character: Character | null;
    setCharacter: (character: Character |null) => void;
}

export const useStore = create<StoreState>((set) => ({
    user: null,
    login: (user) => set({ user }),
    logout: () => set({ user: null }),

    allCharacters: [],
    addCharacter: (character) => set((state) => ({ allCharacters: [...state.allCharacters, character] })),
    setCharacters: (characters) => set({ allCharacters: characters }),
    character: null,
    setCharacter: (character) => set({ character }),
}));