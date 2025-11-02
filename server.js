// server.js (ou app.js)

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
// Le dossier courant (où sont index.html, login.html, etc.) est rendu accessible
app.use(express.static(path.join(__dirname)));

// Middleware pour parser les données de formulaire URL-encoded (pour method="GET" et method="POST")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- 1. Route pour la page d'accueil (index.html) ---
app.get('/', (req, res) => {
    // Envoie le fichier index.html
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- 2. Route pour la page de connexion (login.html) ---
app.get('/login', (req, res) => {
    // Envoie le fichier login.html
    res.sendFile(path.join(__dirname, 'login.html'));
});

// --- 3. Route pour la gestion de la connexion (Login POST) ---
// Note: Votre formulaire login.html utilisait method="GET", ce qui n'est pas sécurisé.
// Nous allons changer l'action du formulaire en POST dans la section suivante.
app.post('/admin/login', (req, res) => {
    // Récupère les données envoyées par le formulaire de login
    const { username, password } = req.body;
    
    // Simule la vérification des identifiants
    const USR = 'admin'; // Identifiant statique
    const PSW = '1234';   // Mot de passe statique (NE JAMAIS FAIRE CELA EN PROD !)
    
    if (username === USR && password === PSW) {
        // Succès : Redirige vers le panneau d'administration
        console.log(`Connexion réussie pour l'utilisateur: ${username}`);
        res.redirect('/admin/panel');
    } else {
        // Échec : Redirige vers la page de connexion avec un message d'erreur
        // Pour un vrai projet, il faudrait rendre la page avec un message d'erreur.
        // Ici, on redirige simplement vers le login pour la démo.
        console.log('Tentative de connexion échouée.');
        res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect. <a href="/login">Réessayer</a>');
    }
});

// --- 4. Route pour le panneau d'administration (admin_panel.html) ---
app.get('/admin/panel', (req, res) => {
    // Dans un cas réel, cette route nécessiterait une vérification de session
    // pour s'assurer que l'utilisateur est bien connecté.
    res.sendFile(path.join(__dirname, 'admin_panel.html'));
});


// Démarrage du serveur
app.listen(port, () => {
    console.log(`🌍 Serveur M_A Fripe démarré sur http://localhost:${port}`);
    console.log(`🔒 Accès Admin : http://localhost:${port}/login`);
});