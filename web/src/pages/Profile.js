import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useRecoilValue } from "recoil";
import { userState } from "../Atom";
import { PenLine } from "lucide-react";

function Profile() {
  const userData = useRecoilValue(userState);
  const [bio, setBio] = useState("it's my personal space to bomb ideas.");

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white pt-[60px]">
      {/* Background Pattern */}


      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-5xl font-serif text-gray-800 mb-12">
          Your Profile
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-200">
                <img 
                  src={userData.imageUrl || "/api/placeholder/96/96"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <button className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <PenLine size={16} />
              </button> */}
            </div>

            {/* User Info */}
            <div className="w-full space-y-6 max-w-md">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Name</label>
                <Input 
                  defaultValue={userData.name}
                  className="bg-white/50"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Bio</label>
                <Textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-white/50 min-h-[100px] resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Email</label>
                <Input 
                  defaultValue={userData.email}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            {/* Achievements */}
          
            {/* Save Button */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;