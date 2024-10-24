import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Funções do Firebase Storage
import { storage, firestore } from './db';  // Importa o Storage e Firestore configurados
import { collection, addDoc, getDocs } from 'firebase/firestore';  // Funções do Firestore

function Info() {
  const [pdfFile, setPdfFile] = useState(null);  // Arquivo PDF
  const [pdfName, setPdfName] = useState("");    // Nome amigável do arquivo
  const [uploadStatus, setUploadStatus] = useState("");
  const [pdfList, setPdfList] = useState([]);  // Estado para armazenar a lista de PDFs do banco de dados

  // Função para lidar com o envio de arquivos
  const handleFileChange = (e) => {
    const file = e.target.files[0];  // Pega o primeiro arquivo (no caso, o PDF)
    if (file && file.type === "application/pdf") {
      setPdfFile(file);  // Atualiza o estado com o arquivo selecionado
    } else {
      alert("Por favor, selecione um arquivo PDF.");
    }
  };

  // Função para fazer o upload para o Firebase Storage e salvar a URL no Firestore
  const handleUpload = async () => {
    if (!pdfFile || !pdfName) {
      alert("Selecione um arquivo PDF e insira um nome para o arquivo.");
      return;
    }

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);  // Define a referência no Storage

    try {
      // Envia o arquivo para o Firebase Storage
      const snapshot = await uploadBytes(storageRef, pdfFile);
      setUploadStatus("Upload concluído!");

      // Após o upload, obtém o URL de download do arquivo
      const url = await getDownloadURL(snapshot.ref);

      // Salva o nome amigável e a URL no Firestore
      await addDoc(collection(firestore, "pdfs"), {
        name: pdfName,    // Nome inserido pelo usuário
        url: url          // URL do arquivo
      });

      alert("PDF enviado com sucesso!");
      setUploadStatus("Upload concluído e nome salvo no banco!");

      // Atualiza a lista de PDFs após o upload
      fetchPdfs();  // Atualiza a lista de PDFs chamando a função que busca do banco
    } catch (error) {
      console.error("Erro ao fazer o upload:", error);
      setUploadStatus("Erro ao fazer o upload");
    }
  };

  // Função para buscar todos os PDFs do Firestore
  const fetchPdfs = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "pdfs"));  // Busca todos os documentos da coleção 'pdfs'
      const pdfs = querySnapshot.docs.map(doc => doc.data());  // Extrai os dados de cada documento
      setPdfList(pdfs);  // Atualiza o estado com a lista de PDFs
    } catch (error) {
      console.error("Erro ao buscar PDFs:", error);
    }
  };

  // Busca os PDFs quando o componente for montado
  useEffect(() => {
    fetchPdfs();  // Chama a função para buscar os PDFs ao carregar o componente
  }, []);

  return (
    <div>
      <h1>Página de Informações</h1>

      <input 
        type="text" 
        placeholder="Digite o nome do arquivo" 
        value={pdfName} 
        onChange={(e) => setPdfName(e.target.value)} 
      />
      <br />

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />

      <button onClick={handleUpload}>Enviar PDF</button>

      {uploadStatus && <p>{uploadStatus}</p>}

      <h2>Lista de PDFs enviados:</h2>
      <ul>
        {pdfList.map((pdf, index) => (
          <li key={index}>
            <strong>{pdf.name}</strong> - <a href={pdf.url} target="_blank" rel="noopener noreferrer">Abrir PDF</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Info;
