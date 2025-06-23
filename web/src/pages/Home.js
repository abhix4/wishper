import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Login from "./Elements/Login";
import { Button } from "../components/ui/button";
import { useRecoilState } from "recoil";
import { loginState, userState } from "../Atom";
import { getUser } from "../supabase/auth";
import { toast } from "react-hot-toast";
import { supabase } from "../supabase/auth";
import axios from "axios";

const Home = () => {
  const [isLogged, setIsLogged] = useRecoilState(loginState);
  const [userData, setUserData] = useRecoilState(userState);
  const [content, setContent] = useState("");

  const createThought = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/thoughts/add`,{
        thought:content,
        createdBy: userData.userId
      })
      if (res.data) {
        setContent("");
        toast("Thought Added!", {
          icon: "💭",
          className: "bg-white",
        });
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to add thought");
    }
  };

  const fetchUser = async () => {
    const user = await getUser();
    setUserData({
      userId: user?.id,
      email: user?.email,
      name: user?.user_metadata?.name,
      imageUrl: user?.user_metadata?.avatar_url,
    });
   
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(session !== null);
    });
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#e6e9ff]">
      {/* Navigation */}
      {/* <nav className="absolute top-0 w-full px-6 py-4 flex justify-between items-center z-10">
        <div className="text-gray-800 text-xl font-medium">Idea Vault</div>
        <div className="flex gap-8 items-center">
          <button className="text-gray-600 hover:text-gray-800">Features</button>
          <button className="text-gray-600 hover:text-gray-800">About</button>
          {!isLogged && (
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              Log in
            </Button>
          )}
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="relative pt-32 pb-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
         <div className="h-[200px] lg:h-[300px] flex flex-col justify-center max-w-[700px] m-auto">
         <h1 className="text-4xl md:text-6xl font-serif text-gray-800 font-Playwrite">
            Find your clarity
          </h1>
          <p className="text-xl md:text-xl text-gray-600 font-light h-12 pt-8  ">
            <Typewriter
              options={{
                strings: ["Unload Your Mind", "Embrace Peace", "Think Freely"],
                autoStart: true,
                loop: true,
                delay: 80,
              }}
            />
          </p>
         </div>

          {isLogged ? (
            <div className="mt-16 space-y-4 max-w-lg mx-auto ">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-24 p-4 rounded-xl shadow-lg bg-white/90 
                         backdrop-blur-sm text-gray-800 resize-none transition-all
                         focus:outline-none focus:ring-2 focus:ring-purple-200
                         placeholder:text-gray-400 text-sm"
                placeholder="What's on your mind?"
              />
              <div className="flex items-center justify-between px-2 text-[14px] sm:text-base">
                {/* <div className="flex items-center gap-3">
                  <Switch className="bg-white shadow-sm" />
                  <label className="text-gray-600 ">Make Public</label>
                </div> */}
                <Button
                  onClick={createThought}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:text-sm sm:px-8 mx-auto text-xs"
                  
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-16 w-[90%] sm:max-w-[450px] mx-auto bg-white/80 backdrop-blur-sm rounded-2xl  shadow-lg">
              <Login />
            </div>
          )}
        </div>
      </div>

      {/* Background SVG */}
      <div
  className="absolute inset-0 z-0"
  dangerouslySetInnerHTML={{
    __html: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        height="100%"
      >
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#e6e9ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f3f4ff;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#skyGradient)" />
        <path
          d="M0 600 L300 400 L600 550 L900 380 L1200 500 L1500 420 L1800 480 L1920 550 L1920 1080 L0 1080 Z"
          fill="#e2e6ff"
          opacity="0.5"
        />
        <path
          d="M0 650 L400 500 L800 600 L1200 480 L1600 580 L1920 520 L1920 1080 L0 1080 Z"
          fill="#d8ddff"
          opacity="0.6"
        />
        <path
          d="M0 700 L500 600 L1000 680 L1500 580 L1920 680 L1920 1080 L0 1080 Z"
          fill="#ccd3ff"
          opacity="0.7"
        />
        <g opacity="0.9">
          <path
            d="M100 300 Q150 250 200 300 Q250 250 300 300 Q250 350 200 300 Q150 350 100 300"
            fill="white"
            opacity="0.8"
          />
          <path
            d="M500 400 Q550 350 600 400 Q650 350 700 400 Q650 450 600 400 Q550 450 500 400"
            fill="white"
            opacity="0.7"
          />
          <path
            d="M900 350 Q950 300 1000 350 Q1050 300 1100 350 Q1050 400 1000 350 Q950 400 900 350"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M1300 450 Q1350 400 1400 450 Q1450 400 1500 450 Q1450 500 1400 450 Q1350 500 1300 450"
            fill="white"
            opacity="0.8"
          />
        </g>
      </svg>
    `,
  }}
/>


      {/* Footer */}
      <div className="absolute bottom-0 w-full py-8 md:pt-12 z-10">
      
        <div className="max-w-2xl mx-auto flex  flex-col md:flex-row justify-center items-center gap-0 md:gap-4 opacity-50">
             <a href="https://peerlist.io/scroll/post/ACTHNN69JKNOQDD8E3PQKBKARP8RGN">
               <img src="/peerlist.svg"
          className="w-[100px] h-[80px] md:w-[140px] md:h-[120px] "
          />
             </a>
          <div className="h-[40px] w-[1px] bg-black/20 hidden md:block"></div>
          <div className="text-gray-600 text-xs">Trusted by thinkers worldwide</div>
        </div>
      </div>
    </div>
  );
};

export default Home;