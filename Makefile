dev:
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -V
prod:
	docker compose  -f docker-compose.prod.yml -f docker-compose.yml up --build
node_app:
# --no-deps : Don't start linked services.
# docker compose up [SERVICE...] only run specific services
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -d node-app  --no-deps 
mongo:
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -d mongo
proxy_manager:
	docker compose  -f docker-compose.proxy.yml up -d 
