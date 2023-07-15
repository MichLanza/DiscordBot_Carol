const fetch = require("node-fetch");

const urlBcv = process.env['URLBCV'];

async function Dolar(interaction) {
  try {
    const response = await fetch(urlBcv);

    const [tasa] = await response.json();

    return tasa;

  } catch (error) {        
    console.log(error)
    throw error
  }
}


module.exports = Dolar