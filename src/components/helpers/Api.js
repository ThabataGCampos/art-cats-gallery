// Esse arquivo serve para guardar todas as url's
const ArtContest = {
    EndPoint: () => `${Api.baseURL}/gallery`,
    AllArts: () => ArtContest.EndPoint(), // mesma url de cima, para buscar todas as tarefas ou criar uma nova
    ArtById: (id) => `${ArtContest.EndPoint()}/${id}` // url /id para editar, pesquisar por id ou deletar tarefas
}
  
  export const Api = {
    // baseURL: "http://localhost:8000", //development 
    baseURL: "https://api-art-cats-gallery.herokuapp.com", //production
    // baseURL: urls[process.env.NODE_ENV],    //para deixar habilitado rodar as duas portas de uma vez (comentar a linha 14 e 15)
    ...ArtContest
  };
  
