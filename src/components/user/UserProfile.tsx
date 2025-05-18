
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, User, CreditCard, HelpCircle } from "lucide-react";

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <div className={className}>
      <div className="flex items-center space-x-3">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
              <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 dark:bg-[#9b87f5]/20 dark:text-[#9b87f5] light:bg-[#9b87f5]/10 light:text-[#9b87f5]">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Profile & Settings</DialogTitle>
              <DialogDescription>
                Manage your profile and application settings
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer">
                <User className="w-5 h-5 mr-3" />
                <span>Profile Settings</span>
              </div>
              <div className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer">
                <CreditCard className="w-5 h-5 mr-3" />
                <span>Subscription Plans</span>
              </div>
              <div className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer">
                <Settings className="w-5 h-5 mr-3" />
                <span>Application Settings</span>
              </div>
              <div className="flex items-center p-2 rounded-lg hover:bg-accent cursor-pointer">
                <HelpCircle className="w-5 h-5 mr-3" />
                <span>Help & Support</span>
              </div>
              <hr className="dark:border-white/10 light:border-black/10" />
              <div className="flex items-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 cursor-pointer">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Sign Out</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <div>
          <div className="text-sm font-medium dark:text-white light:text-black">Guest User</div>
          <div className="text-xs dark:text-gray-400 light:text-gray-600">Basic Plan</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
