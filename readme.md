# jobinator-api
Serveur d'accès aux offres d'emplois avec authentification par token jwt

Ce serveur utilise les projets express(serveur http), sequelize(orm).

deux tables de données : user et job.

Les données d'un user sont :
* **id** : identifiant unique d'un utilisateur (auto increment par défaut)
* **name** : nom de l'utilisateur
* **status** : rôle de l'utilisateur qui vaut soit 'entreprise' ou 'candidat'
* **login** : login de l'utilisateur
* **password** : mot de passe de l'utilisateur

Les données d'un job sont :
* **id** : identifiant de l'offre d'emploi
* **name** : nom de l'offre d'emploi
* **description** : description longue de l'offre d'emploi
* **userId** : identifiant du propriétaire de l'offre

Seule une entreprise peut poster une offre d'emploi.
Une entreprise ne peut voir que les offres d'emploi qui la concerne

## installation

Téléchargez les fichiers du dépôt directement ou par clonage du dépôt git.

Installez les modules nécessaires avec la commande :
> npm install

Lancez le serveur en vous mettant dans le répertoire du projet et en tapant :
> npm start

## Configuration

Le fichier config/config.json vous permet de configurer le fonctionnement de votre serveur :
 
* **secret (string)** : clé de chiffrement pour la signature des jwt.
* **resetDB (boolean)** : permet la réinitialisation de la BD.
* **port (integer)** : pour définir le port d'écoute du serveur > 1024. Défaut 8000.

## Structure des tables de la base de données mysql

Les données sont stockées par défaut dans une base de données `jobs.sqlite` mais il est possible d'utiliser une autre BD en configurant celle-ci dans le fichier `config/dbconfig.json`.

## API avec authentification

### Format de requète

Tous les paramètres et les réponses des différentes requêtes sont exprimés en **JSON**.

l'accès à cet API nécessite la transmission d'un jwt dans le header HTTP **authorization** avec le schéma **bearer**.
> Authorization: Bearer \<votre token jwt>

### Format de réponse en erreur

En cas d'absence de token ou de token invalide, une réponse 401 avec un des codes d'erreurs suivants sera retournée :
* { code: 'noauthorization' | 'nobearertoken' | 'invalidtoken' | 'tokenexpired', message }

En cas d'accès interdit à une ressource, une réponse 403 avec le code d'erreur suivant sera retournée :
* { code: 'accessdenied', message }

En cas d'accès à une ressource inexistante, une réponse 404 avec le code suivant sera retournée :
* { code: 'notfound', message }

En cas de requète incorrect, une réponse 400 avec le code suivant sera retournée :
* { code: 'badrequest', message }

### /login avec la méthode post

Permet de se logger avec un login et password. Permet la récupération d'un jwt sans limite de temps
* réponse : 
    * status 200, **user** = { jwt }

### /register avec la méthode post

Permet la création d'un nouveau user.
* réponse : 
    * status 200, **user** = { id, name, status, login, password }

### /api/user avec la méthode get et jwt

Permet d'obtenir les informations de l'utilisateur correspondant au token **jwt**
* réponse :
  * status 200, **user** = { id, name, status, login, password }

### /api/user/{id} avec la méthode get et jwt

Permet d'obtenir les informations de l'utilisateur de status "candidat", correspondant à l'id.  
Seule une entreprise peut accéder aux informations des candidats.  
* réponse :
  * status 200, **user** = { id, name, status, login, password }


### /api/jobs avec la méthode get et jwt

Accès à la liste des jobs de l'utilisateur authentifié par le jwt en fonction de son status

* Liste des jobs de l'entreprise pour une entreprise
* Liste de tous les jobs pour un candidat


* réponse :
    * status 200, liste de **jobs** = [{id, name}, {id, name}, ...]

### /api/jobs/{id} avec la méthode get et jwt

Accès aux informations completes d'un job.
* réponse :
    * status 200, **job** = { id, name, description, userId, createdAt }

### /api/jobs/ avec la méthode post et jwt

Ajout d'un job. Seul une entreprise peut effectuer cette opération.
* réponse :
    * status 200, **job** = { id, name, description, userId, createdAt }


### Access debug à l'API

Vous pouvez accéder aux données users et contacts sans token pour en obtenir la liste en utilisez les routes suivantes :

* /admin/users
* /admin/jobs

un script pour mettre en place le forward de port de votre émulateur est fourni dans le package.json :

* "forward": "adb reverse tcp:7000 tcp:7000"


# Sujet du TP test - cahier des charges

Réalisez une application qui propose à un utilisateur de se logger ou de s'inscrire sur l'application.

Après authentification et suivant son rôle, l'utilisateur pourra voir la liste de toutes les offres ou seulement celle lui appartenant.

Une entreprise pourra aussi ajouter une nouvelle offre, ce que ne pourra pas faire un utilisateur non entreprise.

Tous les utilisateurs pourront voir le détail d'une offre.

Les accès à l'api nécessiteront l'utilisation d'un jwt en méthode bearer. Ce token n'ayant pas de limite de temps.
Cette application ne fourni pas de refresh token.

Le dépot gitlab devra porter le nom de : jobinator-front.
Ajoutez votre enseignant en tant que membre 'reporter'.

Bon dévellopement,