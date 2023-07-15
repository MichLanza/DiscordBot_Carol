const ytdl = require('ytdl-core');
const Discord = require('@discordjs/voice');
const ytSearch = require('youtube-search-api');

class MusicBot {

  constructor() {
    this.player = Discord.createAudioPlayer();
    this.baseUrl = `https://www.youtube.com/watch?v=`;
    this.playing = false;
    this.queue = [];
    this.voice = null;
  }

  async play(message) {
    try {
      console.log(this.queue.length)

      let url;
      const { content, channel } = message;

      if (content.includes(this.baseUrl)) {
        url = content.slice(3);
      }
      else {
        const { items } = await ytSearch.GetListByKeyword(content.substring(2));
        const [firstResult] = items;
        url = `${this.baseUrl}${firstResult.id}`
      }
      
      this.queue.push(url);
      
      if ( this.playing === false ){      
        this.playNext(message, this.queue)
      }
      
      if (content.startsWith(`$m`)) {
        channel.send(`Reproduciendo: ${url}`);
      }

    } catch (error) {
      console.log(error)
    }
  }

  async playNext(interaction) {
    if (this.queue.length > 0) {
      const url = this.queue[0];
      this.queue.shift();
   
    const channel = interaction.member.voice.channel;

    if (channel === null)
      return await interaction.reply('Unete a un canal de voz Baaaka~');

    const songInfo = await ytdl.getInfo(url);

    const resource = Discord.createAudioResource(ytdl(songInfo.videoDetails.video_url, { filter: 'audioonly' }));

    this.voice = Discord.joinVoiceChannel({
      channelId: channel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    this.voice.subscribe(this.player);      
    this.player.play(resource); 
    this.playing = true;
      
    this.player.on(Discord.AudioPlayerStatus.Idle, () => { 
        this.playNext(interaction, this.queue)
    });
    
    this.player.on('error', () => {
      // queue.shift();
      // console.log(queue)
      // if (queue.length > 0) {
      //   console.log(queue)
      //   playNext(interaction, queue)
      // }
      this.voice.destroy();
    });
  }else
      { this.playing = false;}
  }

  async skip(interaction) {
    this.player.stop();
    await interaction.reply('Skipped!');
    if (this.queue.length > 0)
      this.playNext(interaction, this.queue)
    else 
      this.playing = false;
  }

  async stop(interaction) {
    await interaction.reply('Listo!');
    this.playing = false;
    this.voice.destroy();
  }

  async video(interaction, urlVideo) {
    const url = urlVideo;
    let channel = interaction.member.voice.channel;

    if (channel === null)
      return await interaction.reply('Unete a un canal de voz Baaaka~');

    const songInfo = await ytdl.getInfo(url);

    const player = Discord.createAudioPlayer();

    const resource = Discord.createAudioResource(ytdl(songInfo.videoDetails.video_url, { filter: 'audioonly', type: "opus" }));

    let voice = Discord.joinVoiceChannel({
      channelId: channel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });

    voice.subscribe(player);
    
    player.play(resource);
    
    player.on(Discord.AudioPlayerStatus.Idle, () => {
      //voice.destroy();
    });
  }
}

module.exports = MusicBot;