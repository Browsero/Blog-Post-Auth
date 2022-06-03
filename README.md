# Blog-Post-Auth

Node JS Express app, which allows user to authenticate via email & password, alternatively via Google. Authenticated user can publish own posts or browse existing ones.

# Tech Stack
<img width="50" height="50" src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" /> <img width="50" height="50" src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" /> 

## 🚀 Test this project in less than 5 minutes

First, `git clone` this repository to your local directory.

Then run:

```bash
npm install
```

You have to prepare MongoDB, before starting the project. For mor information visit https://www.mongodb.com/docs/
Setup `.env` file with this fields:
```bash
DB_URL - Atlas db url.
SALT_ROUNDS - How many times your password should be hashed.
CLINET_ID - google auth client id
SECRET_KEY - google auth secret key
CALLBACK_URL - yoururl.domain/auth/google/callback
```

To run this application in developemnt use:

```bash
npm run dev
```

To run this application in production use:

```bash
npm start
```

