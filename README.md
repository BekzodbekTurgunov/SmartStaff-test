# SmartStaff test app

## Standing up local env

## Running prisma studio

Prisma studio studio can be run through global or local binary. In our case it is installed as dev dependency. If ran directly it will pick up `.env` which will point to production db and may cause issues. In case to run it from specific envs, use `dotenv` in scripts.

```
    yarn prisma studio
```

---

Run your postgres DB


Your `.env` must look like this

```
PORT=3000
DATABASE_URL="postgresql://prisma:prisma@localhost:5433/smartStaff"
SENDGRID_EMAIL= (for send verification email)
SENDGRID_API_KEY=
JWT_SECRET=smart_test
```

Install all dependencies. You may want to install `prisma` as the global or dev package and run it before all.

```
<!-- seed data -->
yarn prisma generate
yarn prisma db push
yarn prisma studio
```

Now your app must run

```
yarn dev
```

 - **API docs:**
   - 
   - **USERS**
      
      - POST /users/new-user 
         - body {email, firstName, lastName, password}
         - returns {id, email, firstName, lastName, createdAt, updatedAt}
   - **AUTH**
     
      - POST /auth/verification
           - body {userId, verificationCode}
      - POST /auth/login
           - body {email, password}
      - The token is being set to the header, to access the **secret or me api**, enter the information in the header
           -Header: { name: x-auth-token, value:token } 
      - GET auth/secret
      - GET user/me 
