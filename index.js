import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// TODO: Replace the values below with your own before running this file.
const yourUsername = "Pete";
const yourPassword = "password";
const yourAPIKey = "c0ab9fe1-9bcb-4714-a058-d3821d766c8b";
const yourBearerToken = "e2e835f9-4af5-48cb-a1b4-9daf4b81ad6a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
  

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
 

 
app.get("/apiKey", async (req, res) =>  {
    //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const result = await axios.get(`${API_URL}/filter?score=5&apiKey=${yourAPIKey}` );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});





 const bearConfig = {
  headers: { 
    Authorization: `Bearer ${yourBearerToken}` 
  }
}

app.get("/bearerToken", async (req, res) => {

  try {
    const result = await axios.get(`${API_URL}/secrets/2`, bearConfig );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
  
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
