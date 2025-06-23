import { Context } from "hono";



export interface Env {
  AI: {
    run: (
      model: string,
      options: {
        messages: { role: 'user' | 'system' | 'assistant'; content: string }[] 
      } | {
        text: string
      }
    ) => Promise<{ data: number[] }>; // for embedding or chat
  };
  VECTORIZE: VectorizeIndex
  DB: D1Database;
}



// for embeding thoughts
export const embeddThoughts = async (
  id: string,
  content: string,
  createdBy: string,
  env: Env
) => {
  // You need to extract id and content from the request, for example from JSON body:

  // Generate embeddings for this text:
  const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: content
  });

  const vector : Array<VectorizeVector> = [{
    id: id,
    values: embeddings.data[0],
    metadata: {thoughtId: id, createdBy: createdBy},

  }]; // This is a number[]

  // Optional: Store this vector in Vectorize (if VECTORIZE binding is available)
 
   try {
     await env.VECTORIZE.upsert(vector); // store under an ID

    // Optional: Query the index to find similar vectors

    console.log("vector stored!")
   } catch (error) {
    // return c.json({ error });
    console.log(error)
   }
  
  

  // Return the vector as plain text (for debug)
//   return c.json({ embedding: vector });
};


// for embedding the queries and returning the most relevant
export const embeddQueryThoughts = async (query: string, askedBy: string, env: Env) => {
  
  
  // Generate embeddings for this text:
  const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
    text: query,
  });

  const vector = embeddings.data[0]; // This is a number[]
  console.log(vector)

//   Optional: Store this vector in Vectorize (if VECTORIZE binding is available)
  if (env.VECTORIZE) {
    // Optional: Query the index to find similar vectors
  const results = await env.VECTORIZE.query(vector, {
  topK: 1,
  returnValues: true,
  returnMetadata: "all",
  });
    return { message: "Vector queried!", results };
  }

  // Return the vector as plain text (for debug)
  return {embedding: vector}
};


export const getRefinedQueryResult = async (query: string,thought: string, env: Env) => {
  

  // Generate embeddings for this text:
  try {
const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
  messages: [
    {
      role: "system",
      content: `
You are "Whisper" — a calm, thoughtful assistant that helps the user reflect deeply on their own recorded thoughts.

Here are the user's stored thoughts:
${thought}

Your task:
- Whenever possible, respond meaningfully using only these thoughts.
- If the thoughts contain relevant information for the user’s query, reply based strictly on them.
- If no relevant thought exists for the question, gently switch to being a general helpful AI and answer the query as best as you can — but stay calm, crisp, and thoughtful.
- Speak like a wise and quiet friend — brief, clear, and meaningful (no more than 2 sentences and 50 words when reflecting on thoughts).
- Never make up or assume information about the user’s thoughts.
- Do not generate poetry, stories, or overly elaborate responses.

In summary:
1. **If thought is relevant → answer only from thoughts.**  
2. **If thought is missing → behave like a gentle GPT assistant and help as best as you can.**

`
    },
    { role: "user", content: query }
  ]
});

  return result;
  } catch (error) {
      return error;
  }
  
  // Return the vector as plain text (for debug)

};


