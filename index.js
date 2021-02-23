const duration = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[duration]; ]`

const current = `$replaceText[$replaceText[$splitText[1];(;];);] $textSplit[$songInfo[current_duration]; ]`

const duration1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[duration]; ]`

const current1 = `$replaceText[$replaceText[$splitText[3];(;];);]$textSplit[$songInfo[current_duration]; ]`

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

