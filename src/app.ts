import * as dotenv from 'dotenv';
import { Client, Message, PartialMessage, TextChannel } from 'discord.js';
import { log } from "./helper";
import { isPrime } from "./math";

// Startup message
log('Startup DiscordJS bot.', 'INFO');

// Setup environment
dotenv.config();

// Discord Client
const LOGGING_CHANNEL_ID = process.env.DISCORDJS_LOGGING_CHANNELID;
const client = new Client();
const COMMAND_PREFIX = '$';

// ON: connection ready
client.on('ready', () => {
    log(`Logged in as ${client.user.tag}`, 'INFO');
    log(`Waiting for events`, 'INFO');
});

// ON: message deletion
client.on('messageDelete', async (messageDelete: Message | PartialMessage) => {
    const logChannel = await client.channels.cache.get(LOGGING_CHANNEL_ID) as TextChannel;
    const logMessage = `Message : "${messageDelete.content}" by ${messageDelete.author} was deleted. Their ID is ${messageDelete.author.id}`;
    await logChannel.send(logMessage);
    log(logMessage, "INFO");
});

// ON: message deletion
client.on('messageUpdate', async (messagePrev: Message | PartialMessage, messageAfter: Message | PartialMessage) => {
    const logChannel = await client.channels.cache.get(LOGGING_CHANNEL_ID) as TextChannel;
    const logMessage = `Message : "${messagePrev.content}" by ${messagePrev.author} was changed to "${messageAfter.content}". Their ID is ${messagePrev.author.id}`;
    await logChannel.send(logMessage);
    log(logMessage, "INFO");
});

// ON: received message
client.on('message', async (msg: Message) => {
    const logChannel = await client.channels.cache.get(LOGGING_CHANNEL_ID) as TextChannel;

    // If message is coming from a bot, skip.
    if(msg.author.bot) return;

    // Command Mode
    if(msg.content.startsWith(COMMAND_PREFIX)) {
        // split commands, separated by whitespace
        // first item is always command name
        const [CMD_NAME, ...args] = msg.content
            .trim()
            .substring(COMMAND_PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (args.length > 2) {
                const [ MEMBER_ID, ...REASON ] = args;
                const member = msg.guild.members.cache.get(MEMBER_ID);
                console.log(member);
                await member.kick(REASON.join(' '));
                await logChannel.send('')
            } else {
                await msg.reply('please provide an ID and a reason!');
            }
        }

        if (CMD_NAME === 'ban') {
            if (args.length >= 3) {
                const [ MEMBER_ID, days, ...reason ] = args;
                if (!isNaN(+days) && +days > 0 && +days <= 90) {
                    await msg.reply('number of days is invalid, must be between 1 and 90 days');
                }
                const member = await msg.guild.members.cache.get(MEMBER_ID);
                await member.ban({days: +days, reason: reason.join(' ')});
            } else {
                await msg.reply('please provide an ID, number of days the ban should last and a reason!');
            }
        }

        if (CMD_NAME === 'isPrime') {
            if (args.length === 1) {
                const prime: number = +args[0];
                if (!isNaN(prime) && isPrime(prime)) {
                    await msg.reply('yes this is a prime number');
                } else {
                    await msg.reply('this is not a prime number');
                }
            } else {
                await msg.reply('Please provide a number to check!');
            }
        }

        if (CMD_NAME === 'calculatePrime') {
            if (args.length === 1) {
                const num: number = +args[0];
                if (!isNaN(num) && num >= 0 && num <= 2000) {
                    const numbers = Array.from(Array(num).keys());
                    const primes = numbers.filter((el) => isPrime(el));
                    await msg.reply(`Prime numbers until ${num} are: ${primes}`);
                } else {
                    await msg.reply('Number has to be equal or less than 2000');
                }
            } else {
                await msg.reply('Please provide a number!');
            }
        }

        if (CMD_NAME === 'whereAmI') {
            await msg.reply('I happen to know that the real question is: "When am I! 🤓');
        }

        if (CMD_NAME === 'help') {
            await msg.reply(`I'll print out my manual for you!\n\n
            ########### AVAILABLE COMMANDS ########\n
            $kick USERID REASON // kick user from server\n
            $ban USERID DAYS REASON // ban user from server for x days\n
            $isPrime NUMBER // checks if number is a prime number\n
            $whereAmI // as it was requested by Balvin\n
            ping --> pong\n
            #######################################\n
            (C) tasty 2021`);
        }
    }

    // Ping Pong
    if(msg.content === "ping") {
        await msg.reply('pong');
    }
});

// Discord: LOGIN
client.login(process.env.DISCORDJS_BOT_TOKEN).catch((err: any) => {
    log(`DiscordJS bot could'nt connect. ${err}`, "ERROR");
    process.exit(1);
});

