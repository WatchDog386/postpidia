import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getMe, signOut as signOutFn } from "@/lib/api/auth";
import type { User } from "@/lib/types";

type AuthState = {
  user: User | null;
  /** Alias of `user` (name, company, phone, role live on the user row). */
  profile: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      setUser(await getMe());
    } catch (err) {
      console.error("Could not load session:", err);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    void refreshProfile().finally(() => setLoading(false));
  }, [refreshProfile]);

  const value: AuthState = {
    user,
    profile: user,
    isAdmin: user?.role === "admin",
    loading,
    setUser,
    refreshProfile,
    signOut: async () => {
      await signOutFn();
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
