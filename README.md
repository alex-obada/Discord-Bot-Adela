## Discord-Bot-Adela
Bot ce trimite in fiecare zi un mesaj dragut pentru prietena mea

## De adaugat in config.json
- user-ul trebuie sa aiba cel putin un server in comun cu bot-ul
```json
{
    "token": "<bot token>",
    "id": "<user id>",
    "hour": 12,
    "minute": 0,
    "delay": 24 // ore, functioneaza si cu float
}
```

## Setup
```bash
git clone <repo>
cd ./<repo>
npm install
# config.js si message.txt actualizate
node .
```