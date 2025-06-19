import { Context } from "hono"
import { embeddQueryThoughts, getRefinedQueryResult } from "./ai-shit";
import { drizzle } from "drizzle-orm/d1";
import { thoughts } from "../../db/schema/thoughts";
import { inArray } from "drizzle-orm";



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

const formatInDate = (time: string) => {
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

  return `${formattedDate} ${formattedTime}`
}


export const chat = async(c:Context<{ Bindings: Env }>) => {
    const {query, userId} = await c.req.json()

    const embeddedQuery = await embeddQueryThoughts(query, userId, c.env)
    
    // return c.json({
    //     count : embeddedQuery.results?.count,
    //     matched: embeddedQuery.results?.matches.map((match) => match.metadata)
    // })

    const similarEmbeddings = {
        count : embeddedQuery.results?.count,
        matched: embeddedQuery.results?.matches.map((match) => match.metadata).filter((match) => match.createdBy === userId)
    }

    const ids = similarEmbeddings.matched?.map((match) => match.thoughtId)



    const db = drizzle(c.env.DB)
    const result = await db.select().from(thoughts).where(inArray(thoughts.id , ids))
    const similarThougths = result.map((thought) => ({ content: thought.content, createdAt: thought.createdAt }))

    const thoughtText = similarThougths.map(t => `• "${t.content}" (on ${formatInDate(t.createdAt)})`).join('\n');
    // console.log(similarThougths)

    const refinedResponse = await getRefinedQueryResult(query, thoughtText ,  c.env)

    return c.json({
        result,
        similarEmbeddings,
        ids,
        refinedResponse
    })

}