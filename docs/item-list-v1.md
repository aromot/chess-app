# V1 Ready

## Interface

- Les composants sont responsive
- Problème du hover sur mobile
- ajuster le rendu au viewport

## Code

- Supprimer les commentaires non utiles
- Résoudre le problème du changement de mot de passe
- Implémenter les skeletons

## Conception

- Intégrer une base de données des ouvertures
- Ajuster le taux des coups érronés/coups corrects dans l'échéquier de la page d'accueil
- Pour le répertoire HOMEPAGE, considérer uniquement les parties avec un nombre de coups > 10
- Intégrer un système de pagination dans la table des répertoires

---

## Guests / Page d'accueil

- améliorer le répertoire HOMEPAGE
  - système de Londres,
  - Caro-kann,
  - défense française,
  - ouverture italienne

## Utilisateurs / S'authentifier

- implémenter les providers GMAIL et FACEBOOK.

## Utilisateurs / S'inscrire

- envoyer un email de bienvenue.

## Utilisateurs / Demander une réinitialisation du mot de passe

- on demande l'email de l'utilisateur
- si on l'a en BDD, on envoie un email avec un lien pour réinitialiser le mot de passe.

## Utilisateurs / Réinitialiser du mot de passe

- l'utilisateur consulte l'email reçu suite au scénario "Demander une réinitialisation du mot de passe" et il click sur le lien.
- demander un nouveau mot de passe + confirmation.
- on met à jour le mot de passe.

## Membres / Tableau de bord

- ajouter le champ updatedAt
- ajouter la pagination

## Modifier un répertoire

- bug de la gestion du clavier
- retirer le "train from position"
- vérifier que le répertoire appartient bien à l'utilisateur

## S'entraîner

- vérifier que le répertoire appartient bien à l'utilisateur

## Membres / Changer le mot de passe

- passer l'interface en anglais.
- gérer les erreurs

## Support / Gestion des erreurs

Standardiser la gestion des erreurs entre frontend et backend.

## Support / Config

- créer un fichier de config global

## Support / PWA

- ajouter un fichier manifest

## Support / Google Analytics

- créer l'adresse billie-chess@gmail.com
- ajouter Google Analytics
