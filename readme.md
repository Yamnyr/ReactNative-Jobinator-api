# jwt-api-server-tp
Serveur d'accès aux contacts d'un utilisateur avec contrôle d'accès par JSON Web Token.

Ce serveur utilise les projets express(serveur http), sequelize(orm), faker(générateur de fausses données réalistes).

Les données d'un contacts sont :
* **id** : identifiant unique d'un contact (auto increment par défaut)
* **firstName** : nom du contact
* **lastName** : prénom du contact
* **email** : email du contact
* **phone** : numéro de téléphone du contact
* **avatar** : photo / avatar du contact
* **userId** : identifiant de l'utilisateur dont c'est le contact

Les donénes d'un utilisateur sont :
* **id** : identifiant du contact, identique à celui fourni par le serveur d'authentification dans le jwt.
* **name** : nom de l'utilisateur


## installation

Téléchargez les fichiers du dépôt directement ou par clonage du dépôt git.

Installez les modules nécessaires avec la commande :
> npm install

Lancez le serveur en vous mettant dans le répertoire du projet et en tapant :
> npm start

## Configuration

Le fichier config/config.json vous permet de configurer le fonctionnement de votre serveur :
 
* **secret (string)** : clé de chiffrement pour la signature des jwt. Doit être le même que le serveur d'auth.
* **resetDB (boolean)** : permet la réinitialisation et la population de la BD avec des données factices.
* **port (integer)** : pour définir le port d'écoute du serveur > 1024. Défaut 3000.
* **contactsNumber (integer)** : nombre de contacts factices générés à l'initialisation de la BD (resetDB = true).
* **usersNumber (integer)** : nombre d'utilisateurs factices générés à l'initialisation de la BD (resetDB = true).

## Structure des tables de la base de données mysql

Les données sont stockées par défaut dans une base de données `users.sqlite` mais il est possible d'utiliser une autre BD en configurant celle-ci dans le fichier `config/dbconfig.json`.

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

### /api/user/:id avec la méthode get

Permet d'obtenir les informations de l'utilisateur **id**
* réponse : 
    * status 200, **user** = { id, name }

### /api/user avec la méthode post

Permet la création d'un nouveau user avec le nom transmis dans la requète et l'identifiant obtenue à partir du jwt.
* réponse : 
    * status 200, **user** = { id, name }


### /api/contacts avec la méthode get

Accès à la liste des contacts de l'utilisateur dont l'**id** est dans le jwt.
* réponse :
    * status 200, liste de contacts avec **contact** = { id, firstName, lastName }

### /api/contact/:id avec la méthode get

Accès aux informations completes d'un contact.
* réponse :
    * status 200, **contact** = { id, firstName, lastName email, phone, avatar, userId }
Seul le propriétaire de ce contact (userId === jwt.id) peut effectuer cette opération.

### autres opérations

Cette api permet aussi d'ajouter (/api/contact en méthode **post**), de supprimer (/api/contact/:id en méthode **delete**) ou de modifier (/api/contact/:id en méthode **put**) un contact. Seul le propriétaire de ce contact peur effectuer ces opérations.

### Access debug à l'API

Vous pouvez accéder aux données users et contacts sans token pour en obtenir la liste en utilisez les routes suivantes :

* /admin/users
* /admin/contacts