.PHONY: dev dev-be dev-fe stop

dev:
	@echo ">>> Installazione dipendenze backend..."
	npm install
	@echo ">>> Installazione dipendenze frontend..."
	cd client && npm install
	@echo ">>> Avvio backend in una nuova finestra..."
	cmd //c start "BabboNatale - Backend" cmd /k "npm run start:dev"
	@echo ">>> Avvio frontend (porta 8080)..."
	cd client && npm run dev -- --port 8080

dev-be:
	npm install
	cmd //c start "BabboNatale - Backend" cmd /k "npm run start:dev"

dev-fe:
	cd client && npm install
	cd client && npm run dev -- --port 8080

stop:
	@echo "Chiudi manualmente la finestra del backend."

logs-be:
	@echo "I log del backend appaiono nella finestra 'BabboNatale - Backend'."