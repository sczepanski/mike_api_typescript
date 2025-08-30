// Neste arquivo definimos os tipos usados na aplicação
// Isso ajuda a manter o código organizado e facilita a reutilização dos tipos em diferentes componentes
// Também melhora a manutenção do código, já que qualquer alteração nos tipos pode ser feita em um único lugar
// É possível adicionar mais propriedades conforme necessário, dependendo dos dados retornados pela API
export type Breed = {
  name: string;
  temperament?: string;
  origin?: string;
};

export type Cat = {
  id: string;
  url: string;
  breeds?: Breed[];
};
