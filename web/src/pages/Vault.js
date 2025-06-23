import React, { useEffect, useState } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import ThoughtCard from "./Elements/ThoughtCard";
import { supabase } from "../supabase/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { isThoughtUpdated, userState } from "../Atom";
import { motion } from "framer-motion";
import { Button } from "./../components/ui/button";
import { Switch } from "./../components/ui/switch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../components/ui/dialog";

import { toast } from 'react-hot-toast';
import axios from "axios";


function Vault() {
  const [content, setContent] = useState("");
  const userData = useRecoilValue(userState);
  const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useRecoilState(isThoughtUpdated);
 

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
        setIsUpdated(!isUpdated);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to add thought");
    }
  };

  const getThoughts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/thoughts/get`,{
        id: userData.userId
      })
      if(res.data)
      setThoughts(res.data.reverse());
      console.log(res.data)
    } catch (e) {
      console.error("Error fetching thoughts:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThoughts();
  }, [isUpdated]);

  return (
    <div className="min-h-screen pt-[90px] pb-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="space-y-6 mb-12">
          <h1 className="text-2xl md:text-7xl font-serif text-gray-800 tracking-tight">
            My Vault
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Your personal collection of thoughts and ideas
          </p>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-400 text-[14px] sm:text-base">Loading thoughts...</div>
          </div>
        ) : thoughts.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl backdrop-blur-sm text-[14px] sm:text-base">
            <h3 className="text-xl text-gray-600">No thoughts yet</h3>
            <p className="text-gray-500 mt-2">Start adding some thoughts to your vault!</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)] pr-4 rounded-lg">
            <div className="columns-1 md:columns-2 lg:columns-3 lg:space-x-5 space-y-4 py-2">
              {thoughts.map((thought, index) => (
                <motion.div
                  key={thought.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ThoughtCard
                    time={thought.createdAt}
                    content={thought.content}
                    id={thought.id}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Quick Add Button */}
        <Dialog>
                <DialogTrigger>
                <button 
          className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg
                     hover:bg-gray-800 transition-all active:scale-95"
          onClick={() => {/* Add your quick add functionality */}}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
                </DialogTrigger>
                <DialogContent className="bg-white/95 backdrop-blur-md border-none shadow-xl max-w-lg w-[90%]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-medium text-gray-800">
                      Add a Thought
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full h-32 p-4 rounded-xl bg-gray-50/80 
                               text-gray-800 resize-none transition-all
                               focus:outline-none focus:ring-2 focus:ring-purple-200
                               placeholder:text-gray-400"
                      placeholder="What's on your mind?"
                    />
                    <div className="flex justify-between items-center">
                      {/* <div className="flex items-center gap-3">
                        <Switch className="bg-white shadow-sm" />
                        <label className="text-gray-600">Make Public</label>
                      </div> */}
                      <DialogClose asChild>
                        <Button
                          onClick={createThought}
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          Save
                        </Button>
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
  
      </div>
    </div>
  );
}

export default Vault;