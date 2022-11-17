# project NG.CASH Challenge
Desafio proposto pela ng.cash, desenvolver uma api onde seja possível realizar cadastro e transações entre usuários.

<p align="center">
  <img  src="https://play-lh.googleusercontent.com/OvpI_Ut-8B3-Z7t0iu4y0oKjInkCcu8vNVzQP48eb6fG89xODw7gqsB26_ozYgsBWxU=w240-h480-rw">
</p>
<h1 align="center">
  NG.CASH
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-316192?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  
  

  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

</br>

## Features

-   User sign-up and sign-in.
-   User account's balance info.
-   Transactions info.
-   Transactions info with filters.

</br>

### User Sign Up

```
http://localhost:5000
POST /sign-up
```

#### Request:

| Body            | Type     | Description                   |
| :-------------- | :------- | :---------------------------- |
| `username`      | `string` | **Required**. user's name     |
| `password`      | `string` | **Required**. user's password |

#### Response:

```
status: 201
```

`username must have at least 3 characters` 

`password must have at least 8 characters with an uppercase letter and a number`

#

### User Sign In

```
http://localhost:5000
POST /sign-in
```

#### Request:

| Body            | Type     | Description                   |
| :-------------- | :------- | :---------------------------- |
| `username`      | `string` | **Required**. user's name     |
| `password`      | `string` | **Required**. user's password |

#### Response:

```json
{
  "token": "jwt authorization token"
}
```

#

### Get user's account balance

```
http://localhost:5000
GET /account/info
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

#

#### Response:

```json
{
  "balance": 100
}
```

#

### Make a transaction

```
http://localhost:5000
POST /transactions
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

#

| Body         | Type     | Description                   |
| :----------- | :------- | :---------------------------- |
| `username`   | `string` | **Required**. recipient       |
| `value`      | `number` | **Required**. transfer amount |

#

#### Response:

```json
{
  "message": "Transaction completed!"
}
```

#

### Get transactions by date

```
http://localhost:5000
POST /my/transactions/date
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

###

| Body                 | Type      | Description              |
| :------------------- | :-------- | :----------------------- |
| `date`               | `string`  | **Required**. target day |

`date format yyyy-mm-dd`

#### Response:

```json
[
  {
    "id": 9,
    "debitedAccountId": 6,
    "creditedAccountId": 3,
    "value": 30,
    "createdAt": "2022-11-15T15:18:56.867Z",
    "username": "fulanodetal3"
  },
  ...
]
```

#

### Get user transactions

```
http://localhost:5000
GET /my/transactions
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token | 

####

</br>

#### Response:

```json
[
  {
    "id": 9,
    "debitedAccountId": 6,
    "creditedAccountId": 3,
    "value": 30,
    "createdAt": "2022-11-15T15:18:56.867Z",
    "username": "fulanodetal3"
  },
  ...
]
```

#

### Get all user's cashout transactions

```
http://localhost:5000
GET /my/transactions/out
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```json
[
  {
    "id": 9,
    "debitedAccountId": 6,
    "creditedAccountId": 3,
    "value": 30,
    "createdAt": "2022-11-15T15:18:56.867Z",
    "username": "fulanodetal3"
  },
  ...
]
```
#

### Get all user's cashin transactions

```
http://localhost:5000
GET /my/transactions/in
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

####

#### Response:

```json
[
  {
    "id": 9,
    "debitedAccountId": 6,
    "creditedAccountId": 3,
    "value": 30,
    "createdAt": "2022-11-15T15:18:56.867Z",
    "username": "fulanodetal3"
  },
  ...
]
```
#

## Environment Variables

To run this project, you will need to add the following environment variables to your back-end's.env file

`POSTGRES_USER = postgres`

`POSTGRES_PASSWORD = postgres`

`POSTGRES_DB = db_name`

`POSTGRES_PORT = 5432`

`HOST = localhost `

`PORT = number #recommended:5000`

`JWT_SECRET = string `

`NODE_ENV = string #production by default `

`DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

## Run Locally

Clone the project

```bash
  git clone https://github.com/FKnight-cyber/ngproject.git
```

Go to the project directory

```bash
  cd https://github.com/FKnight-cyber/myfoods/back-end
```

Install dependencies

```bash
  npm install -f
```

Create database

check your .env.development

```bash
  npm run prisma:migrate 
```

and prisma will build the postgress database.

Start the server

```bash
  npm run dev
```

You can also run through docker, check .env

NGINX is exposing port 80

`HOST = ngcash_db`

On root folder run

```bash
  docker-compose up --build
```

## Authors
-   Ryan Nicholas a full-stack developer looking for new challenges!.
<br/>

#
