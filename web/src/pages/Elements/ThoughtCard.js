import React, { useState } from "react";
import { Card } from "../../components/ui/card";
import { Trash2, Clock, Share2, Bookmark, MessageSquare, PenIcon } from "lucide-react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isThoughtUpdated, userState } from "../../Atom";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import axios from "axios";


function ThoughtCard({ time, content, id }) {

  const [editedContent, setEditedContent] = useState(content)
  const [isEditActive, setIsEditActive] = useState(false)
  const userData = useRecoilValue(userState);
  const date = new Date(time);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const [isUpdated, setIsUpdated] = useRecoilState(isThoughtUpdated);

  const deleteThought = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/thoughts/delete`,{
        userId: userData.userId,
        thoughtId: id
      })
      if (res.data) {
        toast.success("Thought removed", {
          icon: "💭",
          duration: 2000
        });
        setIsUpdated(!isUpdated);
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to delete thought");
    }
  };

  const handleSaveEdit = async () => {
     const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/thoughts/edit`,{
        thoughtId: id,
        content:editedContent,
        userId: userData.userId
     })
     if(res.data){
      console.log(res.data)
      setIsEditActive(false)
      toast.success("Thought Edited", {
          icon: "💭",
          duration: 2000
        });
      setIsUpdated(!isUpdated);
      }
  }

  //Edit thoughts  
  const handleEdit = () => {
    setIsEditActive(true)
  }

  return (
    <Card className="group relative bg-white/95 backdrop-blur-sm border-none shadow-md 
                    hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Top Gradient Bar */}
     

      <div className="px-6 py-5 space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-4 h-4" />
            <span>{formattedDate} • {formattedTime}</span>
          </div>

          <div className="flex items-center gap-2  ">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors
                                opacity-0 group-hover:opacity-100">
                <PenIcon size={12} className=" text-gray-400" onClick={handleEdit}/>
            </button>
         
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors
                                opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this thought?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This thought will be permanently removed from your vault.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteThought}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Content Section */}
        <div className="prose prose-gray max-w-none">
         {
          !isEditActive ?  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-start">{content}</p>
          : 
          <div>
            <textarea
              className="w-full border bg-white border-gray-100 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              
            />
            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                onClick={() => setIsEditActive(false)}
                type="button"
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                onClick={handleSaveEdit}
                type="button"
              >
                Save
              </button>
              {/* Add Save logic here if needed */}
            </div>
          </div>
         }
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-4">
            {/* <button 
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark 
                className={`w-4 h-4 ${isBookmarked ? 'fill-current text-purple-600' : ''}`} 
              />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Save
              </span>
            </button> */}
            {/* <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Share
              </span>
            </button> */}
          </div>
          
          {/* <div className="text-xs text-gray-400">
            {Math.floor(content.length / 10)} minute read
          </div> */}
        </div>
      </div>

      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Card>
  );
}

export default ThoughtCard;

// Add this to your global CSS
const styles = `
@keyframes shine {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}

.animate-shine {
  animation: shine 2s infinite;
}
`;