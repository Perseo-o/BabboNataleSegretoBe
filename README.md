# 🎅 BabboNataleSegretoBe

Backend leggero e funzionale per il tuo **Secret Santa**.  
Tre endpoint principali:

1. **GET** lista delle persone -- /draw/participants
2. **POST** creazione accoppiamento -- /draw/generate
3. **GET** estrazione del nome -- /draw/<token>

---

## 🚀 Installazione e Avvio

1. Clona il progetto e installa le dipendenze:

```bash
npm install
```

2. Installa le dipendenze anche per la cartella client ovvero il FE:

```bash
cd client
npm install
```

3. usare i comandi del Makefile per un utilizzo più semplice:
per una partenza di be e fe usare:
```bash
make dev
```
per una partenza parziale di uno o l'altro usare rispettivamente ```bash
make dev
```
dev-be:

```
O
```bash
dev-fe:

```

## Esporre la porta del frontend

# Opzione 1 – Cloudflare Tunnel (consigliata, gratuita)

Installa cloudflared:

```bash
brew install cloudflare/cloudflare/cloudflared
```

Avvia il tunnel:

```bash
cloudflared tunnel --url http://localhost:3000
```

Ti verrà fornito un URL pubblico del tipo https://random-string.trycloudflare.com da usare nel frontend.

# Opzione 2 – Ngrok

```bash
http ngrok 3000
```

Ti darà un link pubblico temporaneo (limitato alla sessione) per il frontend.

## Generazione token

Per generare i token:
Vai nella cartella src:

```bash
cd src
```

Esegui il comando:

```bash
npx ts-node generate-tokens.ts
```

⚠️ Importante: salva i token generati, ti serviranno per l’autenticazione.

passo finale per creare il link finale
{link-generato}/draw/token
