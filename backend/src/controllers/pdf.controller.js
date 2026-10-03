import { uploadPdf } from "../services/pdf.service.js";

export const uploadPdfHandler = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    await uploadPdf(file.buffer);
    return res.json({ msg: "PDF uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
