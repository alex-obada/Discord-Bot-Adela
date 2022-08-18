// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { token, id } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const message = "mesaj prietene";

const logError = () => {
    console.error;
    process.exit(1);
};

// When the client is ready, run this code (only once)
client.once("ready", async () => {
    console.log("Running...");

    // const { commandName } = interaction;

    const user = await client.users.fetch(id).catch(logError);
    await user
        .send(message)
        .catch(logError)
        .then(() => process.exit(0));
});

// Login to Discord with your client's token
client.login(token);
