# Mon Framework Symfony + API Platform + React Admin

## Stack

- Backend : Symfony 6.4 + API Platform 3.3
- Frontend : React 18 + React Admin 5.12
- Base de données : SQLite (dev) / PostgreSQL (prod)

## Installation

Voir INSTALL.md

## lancement du projet

\_\_via termminal

lancement backend serveur
cd backend
composer install
php bin/console doctrine:migrations:migrate
symfony server:start

lancemment frontend
cd frontend
npm install
npm run dev

lancement raccourci task.js
Cmd+Shift+P (Mac)
Tapez "run task"
Start Symfony Server",
