# SCAPCB - Backend pour Surveillance des Forages

Ce projet fournit :
- API REST (Express) pour lire/écrire les relevés de forages.
- Base de données SQLite (fichier local).
- Authentification simple (register/login -> JWT).
- Scripts pour initialiser la DB et importer un CSV (exporté depuis votre `index.html`).

Prérequis
- Node.js 18+ / npm
- Git (pour push sur GitHub)

Installation & démarrage local
1. Clonez le repo ou copiez les fichiers.
2. Installez dépendances :
   ```
   npm install
   ```
3. Créez un fichier `.env` (ou copiez `.env.example`) et définissez JWT_SECRET.
4. Initialisez la base de données (exécute le SQL dans `schema.sql`) :
   ```
   npm run init-db
   ```
5. (Optionnel) Si vous avez exporté un CSV (`readings_2025.csv`), importez-le :
   ```
   npm run import-csv -- readings_2025.csv
   ```
6. Démarrez l'API :
   ```
   npm start
   ```
   L'API écoute par défaut sur http://localhost:3000

Endpoints principaux
- POST /api/auth/register  { username, password } -> créer un utilisateur
- POST /api/auth/login     { username, password } -> retour : { token }
- GET  /api/readings       -> lister les relevés. Query: ?date=YYYY-MM-DD or ?month=MM
- POST /api/readings       -> créer un relevé (Authorization: Bearer TOKEN)
- PUT  /api/readings/:id   -> modifier (auth)
- DELETE /api/readings/:id -> supprimer (auth)

Exemples (curl)
- Créer user :
  curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username":"admin","password":"parot"}'
- Login :
  curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"parot"}'
- Lister lectures :
  curl http://localhost:3000/api/readings
- Ajouter lecture (après login -> token) :
  curl -X POST http://localhost:3000/api/readings -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"reading_date":"2025-01-03","reading_time":"08:00:00","forage1_index":"1270","forage1_consumption":0,"forage2_index":"38939","forage2_consumption":0,"forage3_index":"20928","forage3_consumption":38,"total_consumption":38}'

Git — upload sur GitHub
1. Créez un nouveau repo sur GitHub (par ex `SCAPCB`).
2. Localement :
   git init
   git add .
   git commit -m "Initial API and DB scripts"
   git branch -M main
   git remote add origin https://github.com/<votre-username>/<repo>.git
   git push -u origin main

Notes & next steps possibles
- Vous pouvez remplacer SQLite par Postgres en changeant `db.js` et la configuration.
- J'ai fourni un snippet `export-to-csv.js` à coller dans la console du navigateur pour transformer l'array `data2025` dans votre `index.html` en CSV.
- Si vous voulez, j'intègre un petit front-end (AJAX) pour remplacer le login local et consommer l'API depuis la page.

Si vous voulez que je crée directement le commit dans votre repo, je peux générer les fichiers à ajouter — dites-moi si vous voulez que je produise d'autres fichiers (front-end complet, Dockerfile, CI).