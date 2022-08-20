// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { token, id } = require("./config.json");
const fs = require("fs");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const timerDelay = 0.25; // minutes
const message = "woooooooooooo";

const filePath = "./logs.log";
let user;
let i = 0;

const logAction = async (line) => {
    fs.writeFileSync(filePath, line + "\n", { flag: "a+" }, (err) => {
        if (err) console.error(err);
    });
};

const sendMessage = async (user, message) => {
    // logging setup
    //======================================
    i++;
    console.log(i);
    const date = new Date(Date.now());
    //======================================

    await user
        .send(message)
        .then(() => logAction(i + " " + date.toString()))
        .catch(logError);
    // .then(() => process.exit(0));
};

const logError = async () => {
    console.error;
    await logAction("^========== Message not sent ==========^");
    // process.exit(1);
};

// stops timer after 5 minutes
const stopTimer = () => {
    setTimeout(() => {
        clearInterval(timerId);
        console.log("stop");
    }, minutes(5));
};

const seconds = (s) => s * 1000;
const minutes = (m) => m * seconds(60);
const hours = (h) => h * minutes(60);
const days = (d) => d * hours(24);

// When the client is ready, run this code (only once)
client.once("ready", async () => {
    console.log("Running...");

    user = await client.users
        .fetch(id)
        .then((usr) => {
            const now = new Date(Date.now());
            const etaMs =
                new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    now.getHours(),
                    now.getMinutes() + 1
                ).getTime() - now;
            console.log(now.getMinutes() + 1);

            const timeout = setTimeout(() => {
                const timerId = setInterval(
                    async () => await sendMessage(usr, message),
                    minutes(timerDelay)
                );
            }, etaMs);
        })
        .catch(logError);

    // repeat with the interval of timerDelay

    // stops timer after 5 minutes
    stopTimer();
});

// Login to Discord with your client's token
client.login(token);
