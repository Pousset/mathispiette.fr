const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: "superSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

const USERS_FILE = "./users.json";

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Inscription
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Utilisateur déjà existant" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  writeUsers(users);
  res.json({ message: "Utilisateur enregistré" });
});

// Connexion
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }
  req.session.user = user.username;
  res.json({ message: "Connecté" });
});

// Vérifier session
app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user });
  } else {
    res.status(401).json({ message: "Non connecté" });
  }
});

// Déconnexion
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Déconnecté" });
  });
});

app.listen(3000, () => {
  console.log("Serveur backend sur http://localhost:3000");
});
