const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const commands = [
  { name: 'carol', description: 'Carol te saluda!' },
  { name: 'baka', description: 'Carol entra al voice channel' },
  { name: 'ruge', description: 'Carol modo diabla' },
  { name: 'dolar', description: 'Carol te dice la tasa del BCV!' },
  { name: 'siu', description: 'CRISTIANO RONALDO!' },
  { name: 'return', description: 'Carol regresa!' }
];

//{name: 'debug' , description: 'debug'},
const GUILD_ID = process.env['guild_id']
const TOKEN = process.env['token']
const CLIENT_ID = process.env['client_id']
const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
/////
