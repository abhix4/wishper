import { drizzle } from 'drizzle-orm/d1';
import { Context } from 'hono';
import { and, eq } from 'drizzle-orm';
import { thoughts } from '../../db/schema/thoughts';
import { v4 as uuidv4 } from 'uuid';
import { embeddThoughts } from './ai-shit';

// Define or import the Env type to avoid type errors
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

export const addThoughts = async(c:Context<{ Bindings: Env }>) => {
    const {thought, createdBy} = await c.req.json()
    try {
        const db = drizzle(c.env.DB)

        const result = await db.insert(thoughts).values({
            id: uuidv4(),
            content: thought,
            createdBy: createdBy,
            createdAt: Date.now(),
        }).returning()

        if(result){
            await embeddThoughts(result[0].id,thought,createdBy,c.env)
        }
        return c.json(result);
    } catch (error) {
        console.log(error)
    }
}

export const getThoughts = async(c:Context<{ Bindings: Env }>) => {
    const {id} = await c.req.json()
    try {
        const db = drizzle(c.env.DB)
        const result = await db.select()
        .from(thoughts)
        .where(eq(thoughts.createdBy, id));        
        
        return c.json(result);
    } catch (error) {
        console.log(error)
    }
}


export const editThought = async(c:Context<{ Bindings: Env }>) => {
    const {thoughtId, userId, content} = await c.req.json()
    try {
        const db = drizzle(c.env.DB)
        const result = await db.select()
        .from(thoughts)
        .where(
            // Combine conditions using 'and'
            and(
                eq(thoughts.createdBy, userId),
                eq(thoughts.id, thoughtId)
            )
        );        
        
        if(result){
            const newThought =  
            await db.update(thoughts)
            .set({
                content: content
            })
            .where(eq(thoughts.id , thoughtId))
            .returning()

            await embeddThoughts(newThought[0].id,content,userId,c.env)


            return c.json(newThought)
        }
        return c.json(result);
    } catch (error) {
        console.log(error)
    }
}


export const deleteThought = async(c:Context<{ Bindings: Env }>) => {
    const {thoughtId, userId} = await c.req.json()
    try {
        const db = drizzle(c.env.DB)
        const result = await db.select()
        .from(thoughts) 
        .where(
            // Combine conditions using 'and'
            and(
                eq(thoughts.createdBy, userId),
                eq(thoughts.id, thoughtId)
            )
        );        
        
        if(result){ 
            await db.delete(thoughts)
            .where(eq(thoughts.id , thoughtId))
            

            return c.json({message : 'successfully deleted!'})
        }
        return c.json(result);
    } catch (error) {
        console.log(error)
    }
}