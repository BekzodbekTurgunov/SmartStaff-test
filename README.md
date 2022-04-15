# SmartStuff test app

## Standing up local env

## Running prisma studio

Prisma studio studio can be run through global or local binary. In our case it is installed as dev dependency. If ran directly it will pick up `.env` which will point to production db and may cause issues. In case to run it from specific envs, use `dotenv` in scripts.

```
    yarn studio-dev
```

---

Run your postgres DB

```
docker-compose up -d
```

Your `.env.local` must look like this

```
PORT=3000
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/smartStuff"
```

Install all dependencies. You may want to install `prisma` as the global or dev package and run it before all.

```
yarn prisma studio
<!-- seed data -->
yarn prisma generate
yarn prisma db push
yarn prisma db seed

```

Now your app must run

```
yarn dev
```