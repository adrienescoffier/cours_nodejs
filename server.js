const express = require("express");
const app = express();

// Une route = une methode + un chemin + une fonction de reponse
app.get("/", (req, res) => {
  res.json({ message: "Bonjour" }); // Express pose l en-tete ET convertit en JSON
});

app.listen(3000, () => {
  console.log("Serveur sur http://localhost:3000");
});

// Nos donnees vivent dans un tableau, en memoire (provisoire !)
let amis = [
  { id: 1, nom: "morginou", prix: 25 },
  { id: 2, nom: "67 type de pacome electrique", prix: 15 },
  { id: 3, nom: "nahil le halamiste", prix: -120 },
  { id: 4, nom: "abdel le halalist", prix: 120 },
  { id: 5, nom: "kelian le gooner", prix: 20 },
  { id: 6, nom: "louis le gothique", prix: 10 },
  { id: 7, nom: "scoot 2 louis", prix: 80 },
  { id: 8, nom: "criss morice", prix: 120 },
]
// GET /produits -> renvoie toute la listean
app.get("/amis", (req, res) => {
  res.json(amis);
});

// GET /produits/2 -> renvoie le produit dont l id vaut 2
app.get("/amis/:id", (req, res) => {
  const id = Number(req.params.id);          // :id est recupere dans req.params
  const ami = amis.find((p) => p.id === id);
  if (!ami) {
    return res.status(404).json({ erreur: "Amis introuvable" });
  }
  res.json(ami);
});

// Necessaire pour lire le corps JSON envoye par le client
app.use(express.json());

// POST /produits -> ajoute un produit recu dans le corps de la requete
app.post("/amis", (req, res) => {
  // On ne fait JAMAIS confiance au client : on verifie les donnees
  if (!req.body.nom) {
    return res.status(400).json({ erreur: "Le nom est obligatoire" });
  }
  const nouveau = { id: amis.length + 1, nom: req.body.nom, prix: req.body.prix };
  amis.push(nouveau);
  res.status(201).json(nouveau); // 201 = cree
});

// DELETE /produits/2 -> supprime le produit n 2
app.delete("/amis/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = amis.findIndex((p) => p.id === id);
  if (index === -1) {                           // -1 = pas trouve
    return res.status(404).json({ erreur: "Ami introuvable" });
  }
  amis.splice(index, 1);                    // retire 1 element a cette position
  res.status(200).json({ message: "Ami supprime" });
});