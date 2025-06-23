import { userState } from '../../Atom';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function Wishper() {
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useRecoilState(userState);
  const chatEndRef = useRef(null);
  const [agentThinking, setAgentThinking] = useState(false)
  const [input, setInput] = useState('');


  // format responses 
 function formatAIResponse(raw) {
  if (!raw) return '';

  let formatted = raw;
  console.log('hit')
  // Trim spaces at start & end
  formatted = formatted.trim();

  // Normalize multiple spaces to single space (but not inside code blocks or quotes)
  formatted = formatted.replace(/[ \t]{2,}/g, ' ');

  // Remove surrounding quotes if entire text is wrapped in "" or ''
  formatted = formatted.replace(/^["'](.+(?=["']$))["']$/, '$1');

  // Remove redundant asterisks (*) used for markdown when not part of formatting
  formatted = formatted.replace(/\*\*/g, '');  // remove double ** if any
  formatted = formatted.replace(/\*(\s?)/g, '$1');  // remove single *

  // Replace \n\n+ with a proper single newline (for multiple newlines)
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // Convert single \n to space if it’s mid-sentence, else keep paragraph break
  formatted = formatted.replace(/([^\n])\n([^\n])/g, '$1 $2');

  // Remove accidental multiple punctuations
  formatted = formatted.replace(/([.!?,])\1+/g, '$1');

  // Ensure ending punctuation
  if (!/[.!?]$/.test(formatted)) {
    formatted += '.';
  }

  // Fix spaces before punctuations
  formatted = formatted.replace(/\s+([.,!?;:])/g, '$1');

  // Optional: Capitalize first letter
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return formatted;
}


  const sendMessage = async() => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
  

    setAgentThinking(true)

    setInput('');
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat`,{
      query:input,
      userId: userData.userId
    })

    
    // Simulate assistant response
    
    if(res.data){
      const assistantReply = res.data.refinedResponse.response;
      const reply = formatAIResponse(assistantReply)
      const assistantMessage = { role: 'assistant', text: reply };
      setMessages(prev => [...prev, assistantMessage]);
    }
    setAgentThinking(false)
  };

  // const generateAssistantReply = (userText) => {
  //   const text = userText.toLowerCase();
  //   if (text.includes('hello')) return 'Hello! How can I help you today?';
  //   if (text.includes('bye')) return 'Goodbye! See you soon.';
  //   return "I'm just a simple assistant. Try saying 'hello' or 'bye'.";
  // };

  // const messagesEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className=" border border-black/10 rounded ">
     
      <div className="h-80 overflow-y-auto  p-4 space-y-2 rounded  ">
        {messages.length > 0 ? messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-xs text-sm ${
              msg.role === 'user' ? 'bg-purple-600 ml-auto text-white' : 'bg-gray-200 mr-auto'
            }`}
          >
           {msg.text}
          </div>
        )):
        <p className='text-center text-lg font-medium'>Feel free to reflect</p>
        }
        {
          agentThinking && <p className='animate-pulse text-gray-400 text-[14px] sm:text-base'>Thinking...</p>
        }
        <div ref={chatEndRef} />
      </div>
   
      <div className="mt-4 flex gap-2 border-t border-black/10 p-4 ">
        <input
          type="text"
          className="border rounded-lg p-2 flex-1 w-full text-sm"
          placeholder="what's in your mind..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          <Send size={14}/>
        </button>
      </div>
    </div>
  );
}


