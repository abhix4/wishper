import { createClient } from "@supabase/supabase-js";

// Assuming you have a function to get environment variables

// Make sure to restart your development server after adding or changing environment variables in .env

if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables. Please check your .env file.");
}

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
);



export const login = async () => {
  try {
    const {data , error} = await supabase.auth.signInWithOAuth({
      provider:"google",
      options: {
        redirectTo: process.env.REACT_APP_REDIRECT_URL // <- Define this in your .env file
      }
    })
    console.log(data);
    console.log(error)
  } catch (e) {
    console.log(e)
  }   
}

export const getUser =async () => {
  try {
    const {data :{user}} = await supabase.auth.getUser()
    return user;
  } catch (e) {
    console.log(e)
  }
}