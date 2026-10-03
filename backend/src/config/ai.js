import { ChatGroq } from "@langchain/groq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { config } from "./env.js";

export const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.3, //to think creative
  // maxTokens: 200, //words of response
});

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001", //768  dimensions
  taskType: TaskType.RETRIEVAL_DOCUMENT,
  title: "Document title",
});

export const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url: config.qdrantUrl,
  collectionName: config.collectionName,
});
