import * as dotenv from 'dotenv';
import {Client, Message, PartialMessage, TextChannel} from 'discord.js';
import { log } from "./helper";

const isPrime = num => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}

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
                await msg.reply('Please provide an ID and a reason!');
            }
        }

        if (CMD_NAME === 'ban') {
            if (args.length >= 3) {
                const [ MEMBER_ID, days, ...reason ] = args;
                if (!isNaN(+days) && +days > 0 && +days <= 90) {
                    await msg.reply('Number of days is invalid, must be between 1 and 90 days');
                }
                const member = await msg.guild.members.cache.get(MEMBER_ID);
                await member.ban({days: +days, reason: reason.join(' ')});
            } else {
                await msg.reply('Please provide an ID, reason and number of days the ban should last!');
            }
        }

        if (CMD_NAME === 'isPrime') {
            if (args.length === 1) {
                const prime: number = +args[0];
                if (!isNaN(prime) && isPrime(prime)) {
                    await msg.reply('Yes this is a prime number Balvin');
                } else {
                    await msg.reply('I dunno what the fuck this is but it aint a prime number fuckhead');
                }
            } else {
                await msg.reply('Please provide an ID, reason and number of days the ban should last!');
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
            (C) Dominik Dorfstetter 2021`);
        }
    }

    // Ping Pong
    if(msg.content === "ping") {
        await msg.reply('pong');
    }
});

// Discord: LOGIN
client.login(process.env.DISCORDJS_BOT_TOKEN).catch((err: any) => {
    log(`DiscordJS bot could'nt connect. ${err}`, 'ERROR');
    process.exit(1);
});

