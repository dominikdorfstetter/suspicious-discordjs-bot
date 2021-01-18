# Suspicious DiscordJS Bot

A bot for discord that explores the functionality of the discord.js library.
It includes logging functionality on message-delete & message-update, ping-command & kick/ban admin functionality.

## Setup

After cloning the repository make sure to call *npm install* to pull all external libraries.
Please create a **.env** file in your projects root directory and add the following with your bot token provided by discord.

Please create a text-channel with admin-only visibility, add the channel ID as LOGGING_CHANNELID and add your bot.

```shell
DISCORDJS_BOT_TOKEN=
DISCORDJS_LOGGING_CHANNELID=
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


