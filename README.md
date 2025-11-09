# WeatherApp - Clean Code


Mini application to demonstrate good development practices: KISS, DRY, YAGNI, séparations des responsabilités, logs, tests, linter.


## Installation


1. Clone le repo
2. Copier `.env.example` en `.env` et renseigner `OPENWEATHERMAP_API_KEY`
3. `npm install`
4. `npm run dev` ou `npm start`


## Endpoints
- `GET /weather?city=Paris` — récupère la météo
- `GET /health` — healthcheck


## Conventions
- Langue: anglais dans le code

## Quality
- Linter: `npm run lint`
- Formatter: `npm run format`
- Tests: `npm test`


## Deliverables
- README.md, BUG_REPORT.md, tests/, PR (capture ou vraie PR)
