const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];
const likes = [0];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url,  techs} = request.body;
  
  const repositorie = {
    id:uuid(), title, url, techs, likes
  };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params
  const { title, url, techs} = request.body
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id ===id);
  if (repositorieIndex<0){
    return response.status(400).json({error: "Repositorie not found"});

  }
  const repositorie = {
    title,url,techs, id, likes
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
   const {id} = request.params
    const newLike = likes+=1;
   const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
   if (repositorieIndex < 0 ){
     return response.status(400).json({error:"Repositorie id not found"});

   }
   
  

   repositories[repositorieIndex].likes = repositories[repositorieIndex].likes + 1;
});

module.exports = app;
