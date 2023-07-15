const fetch = require("node-fetch");

const openia = process.env['openia_key'];

async function ConnectOpenAIIMG(message) {
  const dataIMG = JSON.stringify(
    {
      prompt: message,
      n: 1,
      size: "256x256"
    }
  );
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openia}`
  };
  const options = {
    method: 'POST',
    headers: headers,
    body: dataIMG
  }
  const response = await fetch("https://api.openai.com/v1/images/generations", options);
  const IaMessage = await response.json();
  console.log(IaMessage);
  const [image_url] = IaMessage.data;

  return image_url.url;
}


let context = `Te voy a implementar como un bot de Discord, cualquiera se va a dirigir a ti como Carol.`;
let assist = "";

async function ConnectOpenAI(message) {
  try {

    const data = JSON.stringify(
      {
        model: "gpt-3.5-turbo",
        messages:
          [
            { role: "system", content: context },
            { role: "user", content: message },
            { role: "assistant", content: assist },
          ]
      }
    );

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openia}`
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: data
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const IaMessage = await response.json();
    // console.log(IaMessage);
    const [choices] = IaMessage.choices;
    context += message;
    assist = choices.message.content;
    return choices.message.content;

  } catch (error) {
    console.log(error);
    throw error
  }
}


async function clearContext() {
  context = `Te voy a implementar como un bot de Discord, cualquiera se va a dirigir a ti como Carol.`;
  assist = "";
}

module.exports = {
  clearContext,
  ConnectOpenAI,
  ConnectOpenAIIMG
}
