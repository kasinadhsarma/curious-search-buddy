
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

interface LoginFormProps {
  onSuccess?: () => void;
}

type FormValues = z.infer<typeof formSchema>;

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { signIn, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const user = await signIn(values.email, values.password);
    if (user && onSuccess) {
      onSuccess();
    }
  };

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Sparkles className="h-8 w-8 text-white animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-sm dark:text-gray-400 light:text-gray-600">
          Sign in to continue your search journey
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium dark:text-gray-300 light:text-gray-700">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dark:text-gray-400 light:text-gray-500" />
                    <Input 
                      placeholder="you@example.com" 
                      {...field} 
                      className="pl-10 h-12 rounded-xl border-0 bg-gradient-to-r from-white/5 to-white/10 dark:text-white light:text-black backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:from-[#9b87f5]/10 focus:to-[#7E69AB]/10 focus:ring-2 focus:ring-[#9b87f5]/50"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium dark:text-gray-300 light:text-gray-700">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 dark:text-gray-400 light:text-gray-500" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="pl-10 pr-10 h-12 rounded-xl border-0 bg-gradient-to-r from-white/5 to-white/10 dark:text-white light:text-black backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg focus:from-[#9b87f5]/10 focus:to-[#7E69AB]/10 focus:ring-2 focus:ring-[#9b87f5]/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/10 rounded-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 dark:text-gray-400 light:text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 dark:text-gray-400 light:text-gray-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#8a76e4] hover:to-[#6d5a9a] text-white font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg" 
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t dark:border-white/10 light:border-black/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 dark:text-gray-400 light:text-gray-600 rounded-full backdrop-blur-sm">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full h-12 border-0 bg-gradient-to-r from-white/5 to-white/10 dark:text-white light:text-black hover:from-white/10 hover:to-white/15 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm" 
        onClick={handleGoogleSignIn}
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gradient-to-r from-[#4285f4] to-[#34a853] rounded-full flex items-center justify-center">
            <Mail className="h-3 w-3 text-white" />
          </div>
          <span className="font-medium">Continue with Google</span>
        </div>
      </Button>
    </div>
  );
};

export default LoginForm;
