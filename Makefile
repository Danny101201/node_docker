dev:
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -V
prod:
	docker compose  -f docker-compose.prod.yml -f docker-compose.yml up -d --build
prod_pull:
# update image
	docker compose  -f docker-compose.prod.yml -f docker-compose.yml pull
node_app:
# --no-deps : Don't start linked services.
# docker compose up [SERVICE...] only run specific services
# update node+app image
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -d --no-deps  node-app  	
push_node_app:
# push node-app with docker hub
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml push node-app 
build_node_app:
# push node-app with docker hub
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml build node-app 
mongo:
	docker compose  -f docker-compose.dev.yml -f docker-compose.yml up -d mongo
proxy_manager:
	docker compose  -f docker-compose.proxy.yml up -d 

watchtower :
	docker run  -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower  -e WATCHTOWER_DEBUG==true -e WATCHTOWER_TRACE=true  node-app