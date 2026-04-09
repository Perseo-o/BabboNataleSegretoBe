.PHONY: dev backend frontend
.PHONY: dev

dev:
	@echo ">>> Avvio backend NestJS..."
	cmd /c start "" cmd /k "npm run start:dev"

	@echo ">>> Avvio frontend Vite..."
	cmd /c start "" cmd /k "cd client && npm run dev"

backend:
	cd backend && npm install && npm run start:dev

frontend:
	cd frontend && npm install && npm run dev