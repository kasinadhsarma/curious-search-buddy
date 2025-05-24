
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  defaultTab?: "login" | "signup";
  triggerElement?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({
  defaultTab = "login",
  triggerElement,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerElement || (
          <Button variant="default">Sign In</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] border-0 bg-gradient-to-br from-white/95 to-white/90 dark:from-[#1a1625]/95 dark:to-[#211E2E]/90 backdrop-blur-xl shadow-2xl rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-3xl"></div>
        <div className="relative z-10">
          <DialogHeader className="space-y-1 pb-6">
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
              {activeTab === "login" ? "Welcome Back" : "Join Us Today"}
            </DialogTitle>
            <DialogDescription className="text-center dark:text-gray-400 light:text-gray-600">
              {activeTab === "login" 
                ? "Sign in to continue your search journey with Curious Search Buddy" 
                : "Create your account and discover the power of AI-powered search"}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-white/10 to-white/5 rounded-xl p-1 backdrop-blur-sm">
              <TabsTrigger 
                value="login" 
                className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <LoginForm onSuccess={handleSuccess} />
            </TabsContent>
            
            <TabsContent value="signup" className="mt-6">
              <SignupForm onSuccess={handleSuccess} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
