# Kittinder

Application matchmaking for your pets

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Server Setup](#server-setup)
- [Built With](#built-with)
- [Author](#author)

## Getting Started

Before starting to install the project, there're some things that need to be done first.

### Prerequisites

Make sure all of these are properly installed in your system.

| Application | Download                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Git         | [Windows](https://gitforwindows.org/) / [Linux](https://git-scm.com/download/linux) / [Mac](https://git-scm.com/download/mac) |
| Node.js     | [Link](https://nodejs.org/en/download/)                                                                                       |

### Installation

First, clone this repository into your system.

```
git clone https://github.com/harkon666/NS_landTick
```

Then, install all the packages that described in `package.json` of both `client` and `server` directories.

```
npm install
```

### Server Setup

For the server setup, first, make sure your PostgreSQL services is running fine. In `server` directory, you'll find `config.json` inside `config` folder. Open and edit the `development` configuration to match your database setup.

```
  "development": {
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "database": "YOUR_NAME_DATABASE",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
```

After completing the database configuration setup, migrate all the required tables.

```
npm run build
```

We also need to configure some environtment variables for the server, let's create .env file in server's root project, open and edit it, then input the code below.

```
PORT=5000
SECRET_KEY=ThisIsTheSecretKey
```

The `SECRET_KEY` and `PORT` you can custom it as you wish.

And for the last step, running the server

```
npm start
```

## Built With

- [React JS](https://reactjs.org/) - Front-end
- [Express JS](https://expressjs.com) - Back-end
- [PostgreSQL](https://www.postgresql.org/) - Database

## Author

**Bryan Dewa Wicaksana** - [harkon666](https://github.com/harkon666)
