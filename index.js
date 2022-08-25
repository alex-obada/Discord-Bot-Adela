// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { token, id, hour, minute, delay } = require("./config.json");
const fs = require("fs");

// useful for timeDelay
const seconds = (s) => s * 1000;
const minutes = (m) => m * seconds(60);
const hours = (h) => h * minutes(60);
const days = (d) => d * hours(24);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const filePath = "./logs.log";
let user;
let i = 0;
const timerDelay = hours(delay);
const message = fs.readFileSync("./message.txt", "utf8");
// console.log(message);

const logAction = async (line) => {
    fs.writeFileSync(filePath, line + "\n", { flag: "a+" }, (err) => {
        if (err) console.error(err);
    });
};

const sendMessage = async (user, message) => {
    // logging setup
    //======================================
    i++;
    const date = new Date(Date.now());
    console.log(i + " " + date);
    //======================================

    await user
        .send(message)
        .then(() => logAction(i + " " + date.toString()))
        .catch(logError);
};

const logError = async () => {
    console.error;
    await logAction("^========== Message not sent ==========^");
};

// stops timer after 5 minutes
const stopTimer = () => {
    setTimeout(() => {
        clearInterval(timerId);
        console.log("stop");
    }, minutes(5));
};

// When the client is ready, run this code (only once)
client.once("ready", async () => {
    console.log("Running...");

    user = await client.users
        .fetch(id)
        .then((usr) => {
            const now = new Date(Date.now());
            let date = now.getDate(),
                month = now.getMonth(),
                year = now.getFullYear();

            // if specified time passed in the current day
            if (
                hour < now.getHours() ||
                (now.getHours() === hour && minute < now.getMinutes())
            ) {
                date++;
                // console.log(date);
            }

            const etaMs = //seconds(1);
                new Date(
                    year,
                    month,
                    date,
                    hour, // hours
                    minute // minutes
                    // now.getSeconds() + 10
                ).getTime() - now;

            // console.log(new Date(Date.now()));
            console.log(etaMs + " ms till first message");

            const timeout = setTimeout(() => {
                // repeat with the interval of timerDelay

                // first is calling sendMessage and then waiting timerDelay for next call
                sendMessage(usr, message);
                const timerId = setInterval(async () => {
                    await sendMessage(usr, message);
                }, timerDelay);
            }, etaMs);
        })
        .catch(logError);

    // stops timer after 5 minutes
    // stopTimer();
});

// Login to Discord with your client's token
client.login(token);
