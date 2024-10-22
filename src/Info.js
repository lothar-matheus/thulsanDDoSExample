import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Funções do Firebase Storage
import { storage } from './db';  // Importa o Storage configurado

function Info() {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  // Função para lidar com o envio de arquivos
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Pega o primeiro arquivo (no caso, o PDF)
    if (file && file.type === "application/pdf") {
      setPdfFile(file);  // Atualiza o estado com o arquivo selecionado
    } else {
      alert("Por favor, selecione um arquivo PDF.");
    }
  };

  // Função para fazer o upload para o Firebase Storage
  const handleUpload = () => {
    if (!pdfFile) {
      alert("Selecione um arquivo PDF primeiro.");
      return;
    }

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);  // Define a referência no Storage

    // Envia o arquivo para o Firebase Storage
    uploadBytes(storageRef, pdfFile)
      .then((snapshot) => {
        setUploadStatus("Upload concluído!");
        // Após o upload, obtém o URL de download do arquivo
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        setPdfUrl(url);  // Atualiza o estado com o URL do PDF
        alert("PDF enviado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao fazer o upload:", error);
        setUploadStatus("Erro ao fazer o upload");
      });
  };

  return (
    <div>
      <h1>Página de Informações</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar PDF</button>

      {uploadStatus && <p>{uploadStatus}</p>}
      {pdfUrl && (
        <p>
          PDF disponível em: <a href={pdfUrl} target="_blank" rel="noopener noreferrer">{pdfUrl}</a>
        </p>
      )}
    </div>
  );
}

export default Info;
