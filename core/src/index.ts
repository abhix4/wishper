
import { Hono } from "hono";
import { embeddQueryThoughts, embeddThoughts, getRefinedQueryResult } from "./controllers/ai-shit";
import { addThoughts, deleteThought, editThought, getThoughts } from "./controllers/thought";
import { logger } from "hono/logger";
import { chat } from "./controllers/chat-ai";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

interface Env {
  AI: {
    run: (model: string, options: { text: string }) => Promise<{ data: number[] }>;
  };
  VECTORIZE: {
    put: (id: string, vector: number[]) => Promise<void>;
    query: (vector: number[], options: { topK: number }) => Promise<any>;
  };
  DB: D1Database;
}

app.use(cors({
  origin: "*"
}));
app.use(logger())

// app.post("/ai-stuff", embeddThoughts)

// app.post("/ai-stuff/get", embeddQueryThoughts)

// app.post("/just-ask",getRefinedQueryResult)


app.post("/thoughts/add" , addThoughts)
app.post("/thoughts/get" , getThoughts)
app.post("/thoughts/edit" , editThought)
app.post("/thoughts/delete" , deleteThought)

app.post("/chat", chat)
export default app;
