
This application is a demonstration prototype just to show how to use PassportJS and Passport GitHub Strategy. This prototype is the fourth level that implements user authentication with Social Login (GitHub), a user repository with MongoDB and handle authentication with token (JWT).

# Getting started

* Download this prototype

```console
$ git clone https://github.com/0xdbe/PassportJS_PrototypeLevel4.git
```

* Install required dependencies

```console
$ npm install
```

* Register your application on [GitHub (Developers Settings)](https://github.com/settings/developers) with :
  - Homepage URL: http://127.0.0.1:3000
  - Authorization callback URL : http://127.0.0.1:3000/signin/github/callback

* Run this prototype

```console
$ NODE_ENV=production PORT=3000 HOST=127.0.0.1 CLIENT_ID=xxxxxxxxxxxxxxxx CLIENT_SECRET=yyyyyyyyyyyyyyyyyyyyy MONGOURI=mongodb://username:password@hostname:27017/MyApp JWT_SECRET=Secret npm start
```

* Test it by opening your browser on http://127.0.0.1:3000/signin/github and accept the authorization request on GitHub
