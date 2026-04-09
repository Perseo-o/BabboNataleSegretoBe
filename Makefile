.PHONY: dev stop logs-be

dev:
	docker compose -f stack/local/docker-compose.yml up -d backend
	cd client && npm run dev -- --port 8080

stop:
	docker compose -f stack/local/docker-compose.yml down -v

logs-be:
	docker container logs --follow ricettario-backend