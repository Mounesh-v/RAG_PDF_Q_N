const API_URL = import.meta.env.VITE_API_URL || "";

const buildUrl = (path) => `${API_URL}${path}`;

const STORAGE_KEY = "studyrg_documents";

const loadDocuments = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveDocuments = (docs) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch {
    /* ignore */
  }
};

const addDocument = (doc) => {
  const docs = loadDocuments();
  docs.unshift(doc);
  saveDocuments(docs);
  return doc;
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const getDocuments = () => loadDocuments();

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  let response;
  try {
    response = await fetch(buildUrl("/api/upload"), {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please make sure the backend is running."
    );
  }

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data.error || `Upload failed (${response.status})`);
  }

  const document = {
    id: `${Date.now()}`,
    name: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
  addDocument(document);
  return document;
};

export const askQuestion = async (question) => {
  let response;
  try {
    response = await fetch(buildUrl("/api/ai"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: question }),
    });
  } catch {
    throw new Error(
      "Unable to reach the server. Please make sure the backend is running."
    );
  }

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return {
    answer: data.ai ?? "",
    sources: data.sources ?? [],
  };
};
