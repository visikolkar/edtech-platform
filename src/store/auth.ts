import { useEffect } from "react";
import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  globalRole: "student" | "professor";
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  getUser: () => User | null;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
  getUser: () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  },
}));

export const useInitializeAuth = () => {
  const { getUser, login } = useAuthStore();

  useEffect(() => {
    const user = getUser();
    if (user) {
      login(user);
    }
  }, [getUser, login]);
};
