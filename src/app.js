const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
//const likes = [0];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  /**
   * Não existe a necessidade de armazenar o like  como uma variável no escopo global como 
   * você colocou acima pode inseri-la diretamente "'set'ando" com o seu tipo no caso number.
   * Lembre-se o like só existe dentro do Repositorio
   */
  const repositorie = {
    id:uuid(),
    title,
    url,
    techs, 
    likes:0
  };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs} = request.body

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if (repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"});

  }

  /**
   * No desafio pede para modificar somente o title, techs e url, logo o 
   * likes colocamos diretamente o que já tinhamos armazenado antes. já que não
   * vamos buscar essa informação nem no params e nem no body.
   * 
   * E tente deixar as informações com um padrão:
   * Exemplo:
   * se você cria  um objeto ou array com as informações 1 2 3 4 5 logo na tela irá aparecer 
   * 1 2 3 4 5, e se logo vc quer modificar  o numero 3 mas na hora de 'SETar' o obejto põe
   * 3 2 1 5 4 na tela irá mudar tudo também... fica bem ruim de buscar um dado no olho.
   * O computador da igual mas você quando olhar o Insomnia vai ficar meio WTF cade? então sempre
   * mantenha a ordem inicial
   *  
   */

  const repositorie = {
    id,
    title,
    url,
    techs, 
    likes: repositories[repositorieIndex].likes
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)
  
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);

  if (repositorieIndex<0){
    return response.status(400).json({error: "Repositorie not found"});

  };
  repositories.splice(repositorieIndex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  //const newLike = likes+=1;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0 ){
    return response.status(400).json({error:"Repositorie id not found"});
   }
   repositories[repositorieIndex].likes = repositories[repositorieIndex].likes + 1;


   /**
    * Esqueceu de retornar a informação
    */
   return response.json(repositories[repositorieIndex]);
});

module.exports = app;