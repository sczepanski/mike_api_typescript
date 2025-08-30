import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  // Definindo os tipos dos dados do formulário
  name: string;
  age: number;
};

const CatForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>(); // Usando generics para tipar o formulário
  const queryClient = useQueryClient(); // Acesso ao QueryClient - Ele serve para invalidar queries e atualizar dados caso necessário.

  const [message, setMessage] = React.useState<string | null>(null); // Estado para mensagens de sucesso/erro após o submit

  // Caso seja POST e uma aplicação REAL
  // const mutation = useMutation<void, Error, FormValues>({
  //   mutationFn: async (newCat: FormValues) => {
  //     // Aqui usamos axios para enviar os dados
  //     await axios.post("URL_DO_SEU_BACKEND/cats", newCat, {
  //       headers: {
  //         "x-api-key": API_KEY, // se precisar autenticação
  //       },
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cats"] }); // atualiza lista
  //     reset(); // limpa o form
  //   },
  // });

  // Aqui vai o useMutation
  // Simulando o envio, já que a API dos gatos não permite POST
  // Primeiramente, tipamos os dados do formulário
  // Depois, usamos o useMutation com os tipos corretos para evitar erros
  // mutationFn é a função que realiza a mutação (envio dos dados) e onSuccess é o que acontece após o sucesso
  // No onSuccess, invalidamos a query "cats" para que a lista seja atualizada e limpamos o formulário com reset()
  // Assim, garantimos que o formulário está tipado corretamente e que a mutação é gerenciada de forma eficaz
  // Isso melhora a manutenção do código e previne erros comuns de tipagem
  const mutation = useMutation<void, Error, FormValues>({
    mutationFn: async (newCat: FormValues) => {
      // Simulando envio via axios
      console.log("Enviando:", newCat);
      await new Promise((resolve) => setTimeout(resolve, 500));
      //   alert(
      //     "Gato cadastrado com sucesso!" + "\n" + newCat.name + "\n" + newCat.age
      //   );
    },
    // onSucess recebe três parâmetros: os dados retornados pela mutationFn (no nosso caso é void, então não usamos), os dados enviados (newCat) e o contexto (não usamos aqui)
    onSuccess: (_data, newCat) => {
      queryClient.invalidateQueries({ queryKey: ["cats"] }); // Atualiza a lista de gatos após o cadastro
      reset();
      // Mostrando mensagem de sucesso com os dados do gato cadastrado
      setMessage(
        `Gatinho cadastrado com sucesso!  \nNome: ${newCat.name} \nIdade: ${newCat.age}`
      );
    },
    onError: (error) => {
      // Mostrando mensagem de erro caso a mutação falhe
      setMessage(`Erro ao cadastrar: ${error.message}`);
    },
  });

  // Função chamada no submit do formulário
  // Ela recebe os dados do formulário tipados como FormValues
  // E chama mutation.mutate para enviar os dados
  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-between m-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-fit p-4 rounded-md shadow-md bg-gray-800 flex flex-col md:flex-row gap-4"
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nome do Gato"
            {...register("name", {
              required: "O nome é obrigatório!",
            })}
            className="border-2 border-gray-600 px-4 py-2 rounded-sm"
            // Aqui registramos o campo "name" e definimos que é obrigatório
            // Usando generics para tipar o formulário
            // Genericos pode ser entendido como "tipos dinâmicos" que ajudam a garantir que os dados manipulados estejam corretos
            // Exemplo: useForm<FormValues>
          />
        </div>
        <input
          type="number"
          placeholder="Idade do Gato"
          {...register("age", {
            required: "A idade é obrigatória!",
            min: 0,
          })}
          className="border-2 border-gray-600 px-4 py-2 rounded-sm"
        />

        <button
          type="submit"
          className="border-2 border-blue-500 px-4 py-2 rounded-md shadow-md bg-blue-700 font-medium cursor-pointer hover:bg-blue-800 transition-all ease-in-out duration-200"
        >
          Cadastrar
        </button>
      </form>
      {(errors.name || errors.age) && (
        <div className="bg-red-800 p-4 rounded-md mt-4">
          <p className="font-bold text-md">Atenção, siga as instruções:</p>
          {errors.name && (
            <p className="font-bold text-sm mt-1">{errors.name.message}</p>
          )}
          {errors.age && (
            <p className="font-bold text-sm mt-1">{errors.age.message}</p>
          )}
        </div>
      )}
      {message && (
        <pre className="w-full md:w-1/2 p-4 text-left font-medium text-lg border-b-2 border-blue-500 mb-4">
          {message}
          <p className="italic text-sm font-thin text-stone-500 text-wrap">
            Página atualiza para indicar que o cache do formulário foi limpo.
            <br />
            Não insere nada pois a API não fornece a opção de POST.
            <br />
            Considere checar o log para visualizar melhor as informações.
          </p>
        </pre>
      )}
    </div>
  );
};

export default CatForm;
