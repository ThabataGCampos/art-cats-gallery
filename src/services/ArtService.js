// Arquivo (camada de serviço) para fazer a requisição com a API

// API HELPER:
// export const Api = {
//     baseURL: "http://localhost:8000/",
//     taskEndPoint: () => `${Api.baseURL}/alltodo`,
//     AllTasks: () => TaskContest.taskEndPoint(), 
//     TaskById: (id) => `${TaskContest.taskEndPoint()}/${id}`
// }

import { Api } from "../components/helpers/Api"

const parseResponse = (response) => response.json() // recebe a resposta e transforma em json

export const ArtService = {
    getList: () => fetch(Api.AllArts(), {method: "GET"}).then(parseResponse),          // method é o objeto de configuração
    getById: (id) => fetch(Api.ArtById(id), {method: "GET"}).then(parseResponse),
    create: (art) => fetch(Api.AllArts(), {method: 'post',                              // method, headers, mode e body é o objeto de configuração, para criar e editar é necessário ter esse tipo de objeto
    headers: {
    'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(art), 
    }).then(parseResponse),
    updateById: (id, editedArt) => fetch(Api.ArtById(id), {method: 'put',                                     // mandar o objeto de configuração para ser atualizado
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify(editedArt),
    }).then(parseResponse),
    deleteById: (id) => fetch(Api.ArtById(id), {method: "DELETE"}).then(parseResponse),
};