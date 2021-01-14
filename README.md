# Suspicious DiscordJS Bot

A bot for discord that explores the functionality of the discord.js library.

## Setup

After cloning the repository make sure to call *npm install* to pull all external libraries.
Please create a **.env** file in your projects root directory and add the following with your bot token provided by discord:

```shell
DISCORDJS_BOT_TOKEN=
```

## Third party libraries and tools
    - Test-Setup with Jest
    - Typescript
    - DiscordJS Library

## NPM Scripts

### start

First compiles typescript code to plain javascript and then runs *dist/app.js*

### build

Just executes typescript compilation

### test

Executes jest

### npm run test:coverage

Executes jest with coverage

### npm run test:watch

Executes jest in watch-mode


