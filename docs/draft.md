# Objectif

L'application a pour objectif de créer/stocker son répertoire d'ouvertures aux échecs. Elle permet aussi de réviser/travailler ses ouvertures. Cela permet de travailler ses préparations.

# Support

L'appli doit être dispo en desktop et aussi en mobile (via PWA).

# Acteurs

## membre

il peut CRUD son répertoire d'ouverture (public ou privé). il peut partager son répertoire avec d'autres.

## admin

il peut consulter le répertoire d'ouverture de tous les membres.

# Scénarios

## Les répertoires d'ouverture

### Consulter les répertoires.

L'utilisateur consulte la liste des répertoires auxquels il a accès (propriétaire ou non).

### Ajouter un répertoire.

L'utilisateur ajoute un nouveau répertoire (avec un nom + blanc/noir + public/privé).

### Supprimer un répertoire.

L'utilisateur click sur "supprimer" d'un répertoire et confirme.

### Voir un répertoire

L'utilisateur click sur un répertoire pour le voir.

### Passer un répertoire en public

L'utilisateur click sur "public" pour passer un répertoire privé en public (= tout le monde peut le voir sans être authentifié).

### Passer un répertoire en privé

L'utilisateur click sur "privé" pour passer un répertoire publié en privé (= seul le propriétaire + les membres autorisés peuvent le voir).

### Partager un répertoire privé

L'utilisateur click sur "partager" d'un répertoire dont il est propriétaire. Il sélectionne (autocomplete) 1+ membres pour leur donner l'accès à son répertoire privé. Pour chaque membre, sélectionner "peut commenter : oui/non".

### Travailler un répertoire

L'utilisateur paramètre le moteur de travail : sélection du/des répertoire(s), sélection d'une/plusieurs branches, la profondeur de la préparation, etc.
L'ordinateur affiche une position et l'utilisateur doit deviner le(s) coup(s) de son répertoire.
Si Ok, on avance dans le répertoire (coup suivant).
Sinon, on indique l'erreur.

## Les positions

### Consulter une position

L'utilisateur consulte une position (après avoir sélectionné un répertoire).

### Enregistrer un nouveau coup

L'utilisateur consulte une position et décide d'ajouter un nouveau coup à partir de la position courante.

### Nommer une branche du répertoire

L'utilisateur consulte une position et ajoute un nom à la position qu'il consulte.

### Lier la position à une partie existante

L'utilisateur consulte une position et renseigne le lien vers une partie existante en ligne.

## Les commentaires

### Commenter un coup

L'utilisateur consulte une position et ajoute un commentaire à la position.

### Modifier le commentaire d'un coup

L'utilisateur consulte une position, click sur "modifier" d'un commentaire, le modifie et valide.

### Supprimer le commentaire d'un coup

L'utilisateur consulte une position, click sur "supprimer" d'un commentaire et confirme la suppression.

# Tech stack

- Next.js
- Tailwind
- ShadcnUI
- Prisma / supabase
- Auth.js
- Vercel
- Zod
- React Hook Form
