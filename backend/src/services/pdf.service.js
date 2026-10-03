import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/ai.js";

// Pdf Parser
export const uploadPdf = async (fileBuffer) => {
  //   Extract binary of pdf
  const pdfResult = new PDFParse({ data: fileBuffer });
  //   text of the pdf
  const result = await pdfResult.getText();

  const text = result.text;
  //   Spliting or Chunks
  const spliter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const docs = await spliter.createDocuments([text]);
  await vectorStore.addDocuments(docs);
};
