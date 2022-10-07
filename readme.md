-v ${PWD}:/app -v /app/node_modules 會這樣volumn的原因是，如果沒有-v /app/node_modules，當本地的node_modules刪除，docker container中的node_modules也會刪除，所以才會新增-v /app/node_modules讓docker新建一個volumn去連結container的node_modules 。
```docker=
## 
> docker run -v ${PWD}:/app -v /app/node_modules  -dp 3000:3000 my_node:v1.0.2
```

env改變port號

第一種
```
#Dockerfile
ENV PORT 3001(預設值)
```
透過-e改變port號
> docker run -v ${PWD}:/app:ro -v /app/node_modules -e PORT=4000  -dp 3000:4000 my_node:v1.0.3

第二種
```
#.env
PORT=4000
```
透過讀取local .env改變port號
> docker run -v ${PWD}:/app:ro -v /app/node_modules --env-file ./.env  -dp 3000:4000 my_node:v1.0.3

printenv 查看環境變數

### enter mondb shell

> docker exec -it [containerid] bash

mongo -u "username"  -p "userpassword"

show dbs(list all database)

use mydbs (create mydbs database and switch)

db.books.insert({name:"books"})

db.books.find()
