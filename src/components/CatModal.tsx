import React from "react";
import type { Cat } from "../types/cat"; // Importando o type relacionado aos Gatos

type CatModalProps = {
  isOpen: boolean;
  cat: Cat | null;
  onClose: () => void;
};

const CatModal: React.FC<CatModalProps> = ({ isOpen, cat, onClose }) => {
  if (!isOpen || !cat) return null; // Se o modal não estiver aberto ou não houver gato, não renderiza nada

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-10">
      <div className="bg-amber-50 p-4 rounded-2xl shadow-lg relative mx-4 md:mx-0">
        <button
          className="absolute bottom-3 right-4 border-2 border-blue-500 px-4 py-2 rounded-md shadow-md bg-blue-700 font-medium cursor-pointer hover:bg-blue-800 transition-all ease-in-out duration-200"
          onClick={onClose}
        >
          Fechar
        </button>
        <img
          src={cat.url}
          alt="Gato em destaque"
          className="rounded-xl mb-4 w-full h-128 object-cover shadow-lg"
        />
        <div>
          {cat.breeds && cat.breeds[0] ? (
            <div className="text-left">
              <h2 className="text-blue-500 text-2xl font-semibold mb-2">
                {cat.breeds[0].name}
              </h2>
              <p className="text-blue-500">
                <span className="font-medium">Temperamento: </span>
                {cat.breeds[0].temperament || "Desconhecido"}
              </p>
              <p className="text-blue-500">
                <span className="font-medium">Origem: </span>
                {cat.breeds[0].origin || "Desconhecida"}
              </p>
            </div>
          ) : (
            <p className="text-blue-500 text-left font-thin italic mt-4 mb-2 text-lg">
              Raça desconhecida
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatModal;
