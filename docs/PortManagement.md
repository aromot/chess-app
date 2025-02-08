# Libérer le port 3000 sans redémarrer la machine

## Identification du processus qui utilise le port 3000

- Exécuter la commande `netstat -ano | findstr: 3000` le PID (identifiant de processus) du processus qui utilise le port 3000

## Arrêt du processus:

- Exécuter la commande `taskkill /PID <PID> /F` en remplaçant `<PID>` par le PID du processus qui utilise le port 3000
