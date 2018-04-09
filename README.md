# PROJET SERVER SIDE MIAGE MBDS 
# Gallery video React-MongoDB

Mini projet à rendre avant le 31 Janvier (MBDS)
Vous devrez réaliser, avec un des trois frameworks vus en cours (VueJS, React, Angular 4/5), une application "galerie vidéo" présentant des vidéos YouTube faites par les éléves du MBDS, 30 secondes maximum, présentant le MBDS en entier ou juste une de ses facettes.

## MongoDB

Lancer MongoDB sur votre machine depuis un terminal :

	mongod

## Server

Sur un second terminal, exécuter le serveur NodeJS depuis le répertoire du projet :

	node serverCrudMongo.js 
	
## Lancer le projet
Se rendre dans le dossier du projet et lancer depuis un terminal :

	npm install
	npm start


## Description générale

L'application est une galerie de vidéos. On suppose que les vidéos ont été postées sur YouTube, et qu'elles sont accessibles via leur URL.
 
L'application dévellopée permet d'ajouter/modifier/supprimer/afficher des vidéos sous la forme d'une galerie. 

Pour initialiser la base donner on a utiliseé l'API de YouTube pour récupérer la description de la vidéo et la légende (le titre de la vidéo) directement sur YouTube. La clé d'API est codée"en dur".
Visualisation de la gallerie / lecture des vidéos

Une fois arrivé sur la page de départ, on voit une liste de vidéos (par défaut elles ne sont pas en lecture, on ne voit que le lecteur vidéo en mode "statique", 
on affiche une image par vidéo, et si on clique sur l'image ça lance la vidéo dans une fenetre de dialogue), sous la vidéo on voit la description de le titre de celle-ci. 
 
On peut afficher trois videos par pages d'ou la pagination.
 
## Ajout d'une video :
 
Un bouton d'ajout de video est present sur la page d'accueil ce qui permet d'ouvrire une fenetre de dialogue, ou l'on peut saisir le nom de la video sa discription ainsi que son id.
 
## Modification d'une vidéo

On peux modifier la description ou la légende d'une vidéo après publication. Ce n'est pas modifié sur YouTube.

Suppression d'une vidéo

On a ajouter un bouton pour supprimer une vidéo. La vidéo n'est supprimée que de la base de données, pas sur YouTube.

## BACK END :

On a utilisé MongoDB et NodeJS/Express comme dans les TPs.
