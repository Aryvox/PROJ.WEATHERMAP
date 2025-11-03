# Bug Report — Example


**Titre**: 404 when requesting unknown city


**Environnement**: local, Node 18, dev


**Étapes pour reproduire**:
1. Démarrer le serveur
2. `GET /weather?city=NoSuchCity`


**Observé**: réponse 502 Gateway Error
**Attendu**: réponse 404 avec message clair


**Logs**:
- `weather_api_error` with message X


**Isolement**:
- L'API externe retourne 404; le service n'identifie pas correctement ce cas


**Hypothèse**:
- L'erreur de l'API n'est pas traduite en error.isNotFound


**Fix**:
- Vérifier `err.response.status === 404` dans `weatherService` et lancer une erreur marquée `isNotFound = true`


**Prevention**:
- Ajouter test unitaire qui mock la réponse 404 et vérifie que le contrôleur retourne 404


**Test ajouté**: tests/weatherService.test.js — cas 404