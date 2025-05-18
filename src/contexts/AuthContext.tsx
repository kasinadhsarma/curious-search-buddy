
import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update profile with name
      await updateProfile(userCredential.user, { displayName: name });
      toast.success("Account created successfully!");
      return userCredential.user;
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      return null;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
      return userCredential.user;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      return null;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      toast.success("Signed in with Google successfully!");
      return userCredential.user;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
      return null;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.info("Signed out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    }
  };

  const updateUserProfile = async (displayName: string) => {
    try {
      if (currentUser) {
        await updateProfile(currentUser, { displayName });
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logOut,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
