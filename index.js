const duration = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[duration]; ]`

const current = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[current_duration]; ]`

const duration1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[duration]; ]`

const current1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[current_duration]; ]`

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello Express!');
});

app.listen(3000, () => {
	console.log('El bot a sido conectado!');
});

const dbdjs = require("dbd.js");

const bot = new dbdjs.Bot({

  

 token: "TOKEN", 

 prefix: "PREFIX",

});

bot.status({

	text:"mi prefix global es: %help",

	type: "LISTENING",

	time: 12

}) 

bot.status({

	text:"$allMembersCount miembros and $serverCount servidores",

	type: "PLAYING",

	time: 12

}) 

bot.variables({
 "duration": ""
}) 

bot.onMessage() 

bot.command({

name: "play",

code: `

$onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085>Favor Unete A Un Canal De Voz Primero.}]

$title[<a:emoji_75:802038017707081779> added to queue: $jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;title;]]

$addField[Duration:;$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;duration;];no]

$addField[Added by:;$userTag[$authorID];no]

$addField[Volume Establecido:;%100;no]

$image[$jsonRequest[http://api.somecool.repl.co/yt-search?search=$message;thumbnail;]]

$playSong[$message;1s;yes;yes:x: Song not found]

$footer[Requested By $username[$authorID];$authorAvatar] 

$addTimestamp

$color[RANDOM] `

})

bot.command({
	name: "np",
    code: `
$setUserVar[duration;$sendMessage[{title:$songInfo[title]}{url:$songInfo[url]}{description:$getObjectProperty[bar]
\`${current1} / ${duration1}\`

Requested by <@$songInfo[userID]>}{thumbnail:$songInfo[thumbnail]}{color:GREEN}{footer:© KasumiChan | Music}{author:Now Playing:$userAvatar[$clientID]};yes]]
$djseval[const util = require('dbd.js-utils')
d.object.bar = util.progressBar(${current}, ${duration}, 20, "📀", "▬", "▬")]
$createObject[{}]`
})

bot.command({
  name: "queue",
  aliases: "playlist", 
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085> Favor Unete A Un Canal De Voz Primero.}]
  $thumbnail[$serverIcon]
  $title[Playlist del servidor!]
  $description[10 primeras canciones de la lista:
  
  $queue[1]
  
  Canal: <#$voiceID>
  Pedido por: <@$songInfo[userID]>] 
  $footer[Requested By $username[$authorID];$authorAvatar]
  $addTimestamp
  $color[RANDOM] 
  `
})

bot.command({
  name: "volume", 
  aliases: "v", 
  code:`
  $argsCheck[>1;Sube el volumen de la música a un máximo de \`100\`]
  $onlyIf[$message[1]<=100;{description:❌  No puedes subir el volumen más de 100!}{color:RANDOM}]
  $if[$message[1]<=100]
  $volume[$message[1]]
  $endIf
  $if[$message[1]>=101]
  $addField[No se pudo!;Perdón pero no puedes subir más 100 de volumen!;no]
  $endIf
  $color[RANDOM]
  $description[El volumen subió a **$message[1]/100**]
  $deletecommand
  `
}) 

bot.command({
  name: "skip", 
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: :ModeBotError: Favor Unete A Un Canal De Voz Primero.}]
  $description[La cancion ha sido skippeada con éxito!]
  $color[RANDOM]
  $skipSong
  $deletecommand
  `
})

bot.command({
  name: "stop",
  code: `
  $onlyIf[$voiceID!=;{color:RED}{description: <:PeligroxX:785381669648597085> Favor Unete A Un Canal De Voz Primero.}]
$description[:Se ha parado la música correctamente.]
$color[$getRoleColor[$highestRole[$clientID]]]
$stopSong
$suppressErrors
`
})

bot.command({
  name: "help",
  code: `
$title[Comandos de <@$clientID>]
$description[**Bienvenido a help!**

\`play\` - comando donde buscas la cancion y la reproduces.
\`queue\` - puedes ver la lista de reproduccion.
\`skip\` - cambia la cancion.
\`stop\`- deten la cancion.
\`volume\` - sube o baja el volumen de tu canción.
\`np\` - puedes ver en que minuto esta tu canción.

**Servidor de soporte**
[dudas o quejas\\](https://discord.gg/4xCjYzypww)] 
$footer[Requested By $username[$authorID];$authorAvatar]
$color[RANDOM]
`
})
