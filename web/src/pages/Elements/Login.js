import React from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { SiGmail } from "react-icons/si";
import { login } from "../../supabase/auth";

function Login() {
  const handleLogin = async () => {
    await login();
  };

  return (
    <div className="flex flex-col items-center gap-4 py-6 px-2 md:py-10 md:px-8">
      <div className="text-center space-y-4">
        <h2 className="text-[16px] md:text-2xl font-medium text-gray-800">
          Ready to Start Your Journey?
        </h2>
    
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="px-6 py-4  text-[14px] md:text-[18px] bg-purple-600 hover:bg-purple-700 
                     text-white shadow-lg transition-all duration-300 
                     rounded-xl"
          >
            Get Started
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[350px] p-0 bg-transparent border-0 shadow-2xl">
          <div className="relative w-full h-full overflow-hidden">
            {/* Background SVG */}
       

            {/* Content */}
            <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-serif text-center pt-8 font-Poppins">
                  Welcome to{" "}
                  <span className="font-medium font-Playwrite">
                    Idea<span className="text-purple-600 font-Poppins tracking-tighter">Vault</span>
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="p-8 space-y-8 font-Poppins">
                <div className="text-center space-y-2">
                  <p className="text-[14px] md:text-base text-gray-600">
                    Sign in to start capturing your thoughts
                  </p>
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-[90%] m-auto py-6 text-lg bg-white hover:bg-gray-50 
                           text-gray-800 border border-gray-200 shadow-sm 
                           flex items-center justify-center gap-3 
                           transition-all duration-300"
                >
                  <SiGmail className="text-lg md:text-xl text-red-500" />
                  Continue with Google
                </Button>

                <p className="text-[12px] md:text-sm text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Login;