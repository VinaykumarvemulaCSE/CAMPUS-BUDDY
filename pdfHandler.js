import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";

export async function uploadPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(" ");
    fullText += text + "\n";
  }

  await addDoc(collection(db, "documents"), {
    fileName: file.name,
    text: fullText,
    uploadedAt: new Date()
  });

  alert("PDF uploaded successfully!");
}

export async function searchDocuments(query) {
  const snapshot = await getDocs(collection(db, "documents"));

  let bestMatch = "";
  let highestScore = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    const text = data.text.toLowerCase();
    const words = query.toLowerCase().split(" ");

    let score = 0;
    words.forEach(word => {
      if (text.includes(word)) score++;
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = data.text.substring(0, 1000);
    }
  });

  return bestMatch || "No relevant information found.";
}