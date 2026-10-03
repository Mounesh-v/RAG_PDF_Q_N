import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  qdrantUrl: process.env.QDRANT_URL,
  collectionName: process.env.QDRANT_COLLECTION || "RagPratice",
};
