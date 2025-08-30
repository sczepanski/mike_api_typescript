import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Cat } from "../types/cat";
import CatModal from "./CatModal";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL =
  "https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1";

// Função para buscar os dados dos gatos
// Tipamos o retorno como uma Promise que resolve para um array de Cat
// Isso ajuda o TypeScript a entender o tipo dos dados que estamos lidando
// e previne erros de tipagem ao acessar as propriedades dos gatos
const fetchCats = async () => {
  const response = await axios.get(BASE_URL, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return response.data;
};

const CatList: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null); // Guarda o gato que foi clicado
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla se o modal está aberto ou não

  // Usando useQuery para buscar os dados
  // Tipamos o useQuery com o tipo Cat[] para indicar que esperamos um array de gatos
  // Isso ajuda a garantir que o TypeScript saiba o formato dos dados retornados
  const { data, isLoading, isError } = useQuery<Cat[]>({
    queryKey: ["cats"], // chave única para a query, é necessário para cache e refetch automático
    queryFn: fetchCats, // função que busca os dados e retorna uma Promise resolvendo para Cat[]
  });

  if (isLoading) return <div>Carregando...</div>; // Indicador de carregamento simples
  if (isError) return <div>Erro ao carregar os gatos.</div>; // Mensagem de erro simples

  console.log("Gatinhos requisitados!");
  console.log(data);
  console.log(
    "Lembrei de tirar o StrictMode para não duplicar as coisas, isso foi você que disse a um tempão atrás já...engraçado eu ter puxado isso lá do fundo da memória..."
  );
  console.log("💀 was here!");

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-fit">
        {/* Renderizando a lista de gatos, usamos "data?" para garantir que data não é undefined antes de mapear.
    Cada gato é renderizado como uma imagem com key única, isso previne erros de renderização e melhora a performance.
    Tipamos cat como Cat para garantir que estamos acessando as propriedades corretas. */}
        {data?.map((cat: Cat) => (
          <div key={cat.id} className="bg-amber-50 p-4 pb-2">
            <img
              src={cat.url}
              alt={cat.breeds?.[0]?.name || "Gato"}
              className="w-80 h-80 object-cover bg-amber-50 cursor-pointer"
              onClick={() => {
                setSelectedCat(cat);
                setIsModalOpen(true);
              }}
            />
            {cat.breeds?.[0]?.name && ( // Verifica se breeds existe e tem pelo menos um elemento antes de acessar o nome
              <p className=" text-black text-2xl my-2 p-2 py-6 font-thin">
                {cat.breeds[0].name}
              </p>
            )}
          </div>
        ))}
      </div>
      <CatModal
        isOpen={isModalOpen}
        cat={selectedCat}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CatList;
