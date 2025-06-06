import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Settings, 
  LogOut, 
  User, 
  CreditCard, 
  HelpCircle, 
  Bell, 
  Shield, 
  Key, 
  Palette,
  Sparkles,
  Mail,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

interface UserProfileProps {
  className?: string;
}

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional(),
  bio: z.string().max(160).optional(),
});

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
});

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  weeklyDigest: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { currentUser, logOut, updateUserProfile } = useAuth();
  
  // Initialize forms
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.displayName || "Guest User",
      email: currentUser?.email || "",
      bio: "",
    },
  });

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: "system",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: false,
      marketingEmails: false,
    },
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    if (currentUser) {
      await updateUserProfile(data.name);
      toast.success("Profile updated successfully!");
    }
  };

  const onAppearanceSubmit = (data: AppearanceFormValues) => {
    // Apply theme change
    const { theme } = data;
    
    if (theme === "light" || theme === "dark") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      
      if (theme === "dark") {
        document.body.classList.add('bg-[#1A1F2C]', 'text-white');
        document.body.classList.remove('bg-white', 'text-black');
      } else {
        document.body.classList.add('bg-white', 'text-black');
        document.body.classList.remove('bg-[#1A1F2C]', 'text-white');
      }
    } else {
      // System theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      localStorage.removeItem("theme");
      document.documentElement.classList.toggle("dark", prefersDark);
      
      if (prefersDark) {
        document.body.classList.add('bg-[#1A1F2C]', 'text-white');
        document.body.classList.remove('bg-white', 'text-black');
      } else {
        document.body.classList.add('bg-white', 'text-black');
        document.body.classList.remove('bg-[#1A1F2C]', 'text-white');
      }
    }
    
    toast.success("Appearance settings updated!");
  };

  const onNotificationsSubmit = (data: NotificationsFormValues) => {
    toast.success("Notification preferences saved!");
    console.log("Notifications data:", data);
  };

  const handleSignOut = async () => {
    await logOut();
    setIsSettingsOpen(false);
  };

  const handleUpgradePlan = () => {
    toast.info("Upgrade feature coming soon!");
  };
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return "GU"; // Guest User
  };
  
  // Check if user is logged in
  if (!currentUser) {
    return (
      <div className={className}>
        <AuthModal 
          triggerElement={
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
              <Avatar className="h-10 w-10 cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-gradient-to-br dark:from-[#9b87f5]/20 dark:to-[#7E69AB]/20 dark:text-[#9b87f5] light:bg-gradient-to-br light:from-[#9b87f5]/10 light:to-[#7E69AB]/10 light:text-[#9b87f5] ring-2 ring-[#9b87f5]/30 shadow-lg group-hover:ring-[#9b87f5]/50 group-hover:shadow-xl">
                <AvatarFallback className="bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 text-[#9b87f5] font-semibold">
                  GU
                </AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      </div>
    );
  }
  
  return (
    <div className={className}>
      <div className="flex items-center space-x-3">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto hover:bg-transparent group">
              <Avatar className="h-10 w-10 cursor-pointer transition-all duration-300 hover:scale-105 dark:bg-gradient-to-br dark:from-[#9b87f5]/20 dark:to-[#7E69AB]/20 dark:text-[#9b87f5] light:bg-gradient-to-br light:from-[#9b87f5]/10 light:to-[#7E69AB]/10 light:text-[#9b87f5] ring-2 ring-[#9b87f5]/30 shadow-lg group-hover:ring-[#9b87f5]/50 group-hover:shadow-xl">
                <AvatarImage src={currentUser.photoURL || ""} alt={currentUser.displayName || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 text-[#9b87f5] font-semibold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto border-0 bg-gradient-to-br from-white/95 to-white/90 dark:from-[#1a1625]/95 dark:to-[#211E2E]/90 backdrop-blur-xl shadow-2xl rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-3xl"></div>
            <div className="relative z-10">
              <DialogHeader>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-2xl flex items-center justify-center shadow-lg">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
                      Account Settings
                    </DialogTitle>
                    <DialogDescription className="dark:text-gray-400 light:text-gray-600">
                      Manage your profile, appearance, and preferences
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-1 backdrop-blur-sm">
                    <TabsTrigger 
                      value="profile" 
                      className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">Profile</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="appearance" 
                      className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <Palette className="w-4 h-4" />
                      <span className="hidden sm:inline">Theme</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <Bell className="w-4 h-4" />
                      <span className="hidden sm:inline">Alerts</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="subscription" 
                      className="flex items-center gap-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9b87f5] data-[state=active]:to-[#7E69AB] data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="hidden sm:inline">Plan</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} disabled />
                              </FormControl>
                              <FormDescription>Email cannot be changed</FormDescription>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Input placeholder="Tell us about yourself" {...field} />
                              </FormControl>
                              <FormDescription>
                                Brief description for your profile. Max 160 characters.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save Profile</Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="appearance" className="space-y-4">
                    <Form {...appearanceForm}>
                      <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                        <FormField
                          control={appearanceForm.control}
                          name="theme"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Theme</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="light" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Light
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="dark" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      Dark
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="system" />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      System
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormDescription>
                                Select your preferred theme or follow your system settings.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save Appearance</Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-4">
                    <Form {...notificationsForm}>
                      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Email Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive notifications via email
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="pushNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Push Notifications
                                </FormLabel>
                                <FormDescription>
                                  Receive push notifications in your browser
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="weeklyDigest"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Weekly Digest
                                </FormLabel>
                                <FormDescription>
                                  Get a summary of your search activity weekly
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Marketing Emails
                                </FormLabel>
                                <FormDescription>
                                  Receive emails about new features and updates
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save Preferences</Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">Current Plan</h3>
                        <span className="bg-[#9b87f5]/20 text-[#9b87f5] px-2 py-1 rounded font-medium text-sm">
                          Basic
                        </span>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground">Features included:</p>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-center">
                            <span className="bg-green-500/20 p-1 rounded-full mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span className="text-sm">Standard search</span>
                          </li>
                          <li className="flex items-center">
                            <span className="bg-green-500/20 p-1 rounded-full mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                            <span className="text-sm">Limited search history</span>
                          </li>
                          <li className="flex items-center text-muted-foreground">
                            <span className="bg-gray-500/20 p-1 rounded-full mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                              </svg>
                            </span>
                            <span className="text-sm">Advanced AI models</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">Upgrade to Pro</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Get access to advanced models and unlimited search history.
                      </p>
                      <Button onClick={handleUpgradePlan} className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB]">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                      <p className="text-xs text-center mt-2 text-muted-foreground">
                        Cancel anytime. 7-day free trial.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <DialogFooter className="mt-8 gap-3 sm:gap-0">
                <div className="w-full grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSettingsOpen(false)}
                    className="border-0 bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    Close
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleSignOut} 
                    className="flex items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="hidden sm:block">
          <div className="text-sm font-semibold dark:text-white light:text-black bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
            {currentUser.displayName || "Guest User"}
          </div>
          <div className="text-xs dark:text-gray-400 light:text-gray-600 flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>Basic Plan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
