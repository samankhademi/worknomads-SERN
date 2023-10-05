![alt text](https://worknomads.com/wp-content/uploads/2022/03/brand.png)
## WorkNomads Test Project

first, to run database:
```bash
docker compose up -d db
```
and create a database with desired .env `DB_DATABASE`, it's `MYDB` by default

### .env Guide
```
    DB_HOST: Database host, it will  inject docker host name on docker mode
    DB_USER: Database user
    DB_PASSWORD: Database password
    DB_DATABASE: Database Name
    DB_LOCAL_PORT: Database Local Port
    DB_DOCKER_PORT: Database Docker Port
    APP_LOCAL_PORT: Backend Local Port
    APP_DOCKER_PORT: Backend Docker Port
    FO_LOCAL_PORT: FrontEnd Local Port
    FO_DOCKER_PORT: FrontEnd Docker Port
    JWT_SECRET_KEY: Backend JWT Key
    JWT_EXP_TIME: JWT Expiration
    BACKEND_URL= Backend Url
```

second, to run app:
```bash
docker compose up -d
```

###### system will create admin user by default, email:`admin@mail.com` and password: `ASDasd123`

 to run each part in development mode, go to related directory:

### also you can find each section Guide in  `[README.md]` file 