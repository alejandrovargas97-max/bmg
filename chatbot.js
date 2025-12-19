<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BridgeMind IA Chat</title>
<style>
body {margin:0; font-family:Arial; background:#007bff; height:100vh; display:flex; flex-direction:column;}
#header {background:#0056b3; color:white; padding:15px; text-align:center;}
#chatbox {flex:1; padding:20px; overflow-y:auto; background:#f8f9fa;}
.message {margin:10px 0; padding:12px; border-radius:8px; max-width:80%;}
.user {background:#007bff; color:white; margin-left:auto; text-align:right;}
.bot {background:white; border:1px solid #ddd;}
#inputarea {padding:15px; background:#fff; border-top:1px solid #ddd;}
#messageInput {width:80%; padding:12px; border:1px solid #ccc; border-radius:4px;}
#sendBtn {width:15%; padding:12px; background:#28a745; color:white; border:none; border-radius:4px; cursor:pointer;}
#langBtns {position:fixed; top:10px; right:10px; z-index:1000;}
.langBtn {background:#0056b3; color:white; border:none; padding:8px 12px; margin:2px; border-radius:4px; cursor:pointer;}
</style>
</head>
<body>
<div id="langBtns">
<button class="langBtn" onclick="setLang('es')">ES</button>
<button class="langBtn" onclick="setLang('en')">EN</button>
</div>

<div id="header">
<h2>🤖 BridgeMind IA</h2>
<p id="welcome">¡Hola! Soy tu asistente de juegos mentales e idiomas</p>
</div>

<div id="chatbox"></div>
<div id="inputarea">
<input type="text" id="messageInput" placeholder="Escribe tu mensaje..." onkeypress="if(event.key==='Enter') sendMessage()">
<button id="sendBtn" onclick="sendMessage()">→</button>
</div>

<script>
let currentLang = 'es';
const langs = {
  es: {welcome: "¡Hola! Soy tu asistente de juegos mentales e idiomas", placeholder: "Escribe tu mensaje..."},
  en: {welcome: "Hi! I'm your mind games & languages assistant", placeholder: "Type your message..."}
};

function setLang(lang) {
  currentLang = lang;
  document.getElementById('welcome').textContent = langs[lang].welcome;
  document.getElementById('messageInput').placeholder = langs[lang].placeholder;
}

function addMessage(text, isUser) {
  const chatbox = document.getElementById('chatbox');
  const msg = document.createElement('div');
  msg.className = `message ${isUser ? 'user' : 'bot'}`;
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const msg = input.value.trim();
  if (!msg) return;
  
  addMessage(msg, true);
  input.value = '';
  
  // Simular respuesta IA (luego API real)
  setTimeout(() => {
    const responses = {
      es: [
        "¡Excelente! BridgeMind combina bridge/poker con aprendizaje de idiomas usando IA adaptativa.",
        "La plataforma detecta tu nivel y ajusta la dificultad en tiempo real.",
        "¿Te interesa para centros educativos, empresas o uso personal?",
        "Podemos crear contenido en 8 idiomas: ES, EN, FR, DE, IT, JP, ZH, AR."
      ],
      en: [
        "Great! BridgeMind combines bridge/poker with language learning using adaptive AI.",
        "The platform detects your level and adjusts difficulty in real-time.",
        "Interested for schools, companies or personal use?",
        "Content available in 8 languages: ES, EN, FR, DE, IT, JP, ZH, AR."
      ]
    };
    const reply = responses[currentLang][Math.floor(Math.random() * responses[currentLang].length)];
    addMessage(reply, false);
  }, 1000);
}

// Mensaje de bienvenida
addMessage("¡Bienvenido a BridgeMind! Pregúntame sobre juegos mentales, idiomas o nuestro sistema IA.", false);
</script>
</body>
</html>
