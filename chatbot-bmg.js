(function() {
  'use strict';
  
  const GEMINI_API_KEY = "AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI";
  
  const languages = {
    es: { name: 'Español', flag: '🇪🇸' },
    en: { name: 'English', flag: '🇬🇧' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    fr: { name: 'Français', flag: '🇫🇷' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    zh: { name: '中文', flag: '🇨🇳' }
  };

  const systemPrompts = {
    es: `Eres el asistente oficial de BridgeMind Games (BMG). SOLO hablas sobre BMG en ESPAÑOL.

INFORMACIÓN BMG:
- Sistema de aprendizaje de idiomas mediante Bridge + IA
- Metodología dual: Idioma + Bridge simultáneamente
- Grupos de 4 personas, presencial en colegios/institutos
- Desde 12 años de edad
- Mínimo 1 semestre para ver resultados
- 8 países: China, Japón, Arabia Saudita, Australia, Italia, Francia, Alemania, España
- Precios personalizados según proyecto
- Contacto: Alejandro +34 634 268 663

REGLAS:
1. SOLO responde sobre BMG
2. Si preguntan algo NO relacionado: "Lo siento, solo puedo ayudarte con BridgeMind Games"
3. Sé breve (máximo 3-4 oraciones)
4. Si preguntan precios: "Te puedo conectar con Alejandro al +34 634 268 663"`,
    
    en: `You are the official BridgeMind Games (BMG) assistant. You ONLY talk about BMG in ENGLISH.

BMG INFO:
- Language learning system through Bridge + AI
- Dual methodology: Language + Bridge simultaneously
- Groups of 4 people, in-person at schools/institutes
- From 12 years old
- Minimum 1 semester for results
- 8 countries: China, Japan, Saudi Arabia, Australia, Italy, France, Germany, Spain
- Custom pricing per project
- Contact: Alejandro +34 634 268 663

RULES:
1. ONLY answer about BMG
2. If asked about unrelated topics: "Sorry, I can only help with BridgeMind Games"
3. Be brief (max 3-4 sentences)
4. If asked about prices: "I can connect you with Alejandro at +34 634 268 663"`,
    
    de: `Du bist der offizielle BridgeMind Games (BMG) Assistent. Du sprichst NUR über BMG auf DEUTSCH.

BMG INFO:
- Sprachlernsystem durch Bridge + KI
- Duale Methodik: Sprache + Bridge gleichzeitig
- Gruppen von 4 Personen, persönlich in Schulen/Instituten
- Ab 12 Jahren
- Mindestens 1 Semester für Ergebnisse
- 8 Länder: China, Japan, Saudi-Arabien, Australien, Italien, Frankreich, Deutschland, Spanien
- Individuelle Preise pro Projekt
- Kontakt: Alejandro +34 634 268 663

REGELN:
1. NUR über BMG antworten
2. Bei nicht verwandten Fragen: "Entschuldigung, ich kann nur bei BridgeMind Games helfen"
3. Sei kurz (max 3-4 Sätze)
4. Bei Preisfragen: "Ich kann dich mit Alejandro verbinden unter +34 634 268 663"`,
    
    it: `Sei l'assistente ufficiale di BridgeMind Games (BMG). Parli SOLO di BMG in ITALIANO.

INFO BMG:
- Sistema di apprendimento linguistico tramite Bridge + IA
- Metodologia duale: Lingua + Bridge simultaneamente
- Gruppi di 4 persone, di persona in scuole/istituti
- Dai 12 anni
- Minimo 1 semestre per risultati
- 8 paesi: Cina, Giappone, Arabia Saudita, Australia, Italia, Francia, Germania, Spagna
- Prezzi personalizzati per progetto
- Contatto: Alejandro +34 634 268 663

REGOLE:
1. Rispondi SOLO su BMG
2. Se chiedono altro: "Mi dispiace, posso aiutarti solo con BridgeMind Games"
3. Sii breve (max 3-4 frasi)
4. Se chiedono prezzi: "Posso metterti in contatto con Alejandro al +34 634 268 663"`,
    
    fr: `Tu es l'assistant officiel de BridgeMind Games (BMG). Tu parles UNIQUEMENT de BMG en FRANÇAIS.

INFO BMG:
- Système d'apprentissage des langues via Bridge + IA
- Méthodologie duale: Langue + Bridge simultanément
- Groupes de 4 personnes, en présentiel dans écoles/instituts
- À partir de 12 ans
- Minimum 1 semestre pour résultats
- 8 pays: Chine, Japon, Arabie Saoudite, Australie, Italie, France, Allemagne, Espagne
- Prix personnalisés par projet
- Contact: Alejandro +34 634 268 663

RÈGLES:
1. Réponds UNIQUEMENT sur BMG
2. Si on demande autre chose: "Désolé, je peux seulement t'aider avec BridgeMind Games"
3. Sois bref (max 3-4 phrases)
4. Si on demande les prix: "Je peux te connecter avec Alejandro au +34 634 268 663"`,
    
    ja: `あなたはBridgeMind Games（BMG）の公式アシスタントです。日本語でBMGについてのみ話します。

BMG情報:
- ブリッジ + AIによる言語学習システム
- デュアル方法論：言語 + ブリッジを同時に
- 4人グループ、学校/研究所での対面
- 12歳から
- 結果には最低1学期必要
- 8か国：中国、日本、サウジアラビア、オーストラリア、イタリア、フランス、ドイツ、スペイン
- プロジェクトごとのカスタム価格
- 連絡先：Alejandro +34 634 268 663

ルール:
1. BMGについてのみ回答
2. 関係ない質問には：「申し訳ございませんが、BridgeMind Gamesについてのみお手伝いできます」
3. 簡潔に（最大3-4文）
4. 価格について聞かれたら：「Alejandroと連絡を取れます +34 634 268 663」`,
    
    ar: `أنت المساعد الرسمي لـ BridgeMind Games (BMG). أنت تتحدث فقط عن BMG بالعربية.

معلومات BMG:
- نظام تعلم اللغات من خلال Bridge + AI
- منهجية مزدوجة: اللغة + Bridge في نفس الوقت
- مجموعات من 4 أشخاص، حضورياً في المدارس/المعاهد
- من عمر 12 سنة
- فصل دراسي واحد كحد أدنى للنتائج
- 8 دول: الصين، اليابان، السعودية، أستراليا، إيطاليا، فرنسا، ألمانيا، إسبانيا
- أسعار مخصصة لكل مشروع
- الاتصال: Alejandro +34 634 268 663

القواعد:
1. أجب فقط عن BMG
2. إذا سُئلت عن موضوع آخر: "عذراً، يمكنني المساعدة فقط في BridgeMind Games"
3. كن مختصراً (3-4 جمل كحد أقصى)
4. إذا سُئلت عن الأسعار: "يمكنني توصيلك بـ Alejandro على +34 634 268 663"`,
    
    zh: `你是BridgeMind Games（BMG）的官方助手。你只用中文谈论BMG。

BMG信息:
- 通过桥牌 + AI的语言学习系统
- 双重方法论：同时学习语言 + 桥牌
- 4人小组，在学校/研究所面对面
- 12岁起
- 至少需要1个学期才能看到结果
- 8个国家：中国、日本、沙特阿拉伯、澳大利亚、意大利、法国、德国、西班牙
- 每个项目定制价格
- 联系方式：Alejandro +34 634 268 663

规则:
1. 只回答关于BMG的问题
2. 如果问到无关话题："抱歉，我只能帮助解答BridgeMind Games相关问题"
3. 简洁（最多3-4句话）
4. 如果问到价格："我可以帮你联系Alejandro +34 634 268 663"`
  };

  let selectedLanguage = null;
  let conversationHistory = [];
  let isLoading = false;

  // CSS
  const style = document.createElement('style');
  style.textContent = `
    * { box-sizing: border-box; }
    
    #bmg-chat-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 16px 24px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s;
      font-family: Arial, sans-serif;
    }
    #bmg-chat-button:hover { transform: scale(1.05); }
    
    #bmg-chat-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      border: 4px solid #764ba2;
      font-family: Arial, sans-serif;
    }
    #bmg-chat-container.open { display: flex; }
    
    #bmg-chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    #bmg-chat-close {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 20px;
    }
    #bmg-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: linear-gradient(to bottom, #f9fafb, white);
    }
    .bmg-message {
      margin-bottom: 12px;
      display: flex;
    }
    .bmg-message.user { justify-content: flex-end; }
    .bmg-message.bot { justify-content: flex-start; }
    .bmg-message-content {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.5;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .bmg-message.user .bmg-message-content {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .bmg-message.bot .bmg-message-content {
      background: #f3f4f6;
      color: #1f2937;
      border: 1px solid #e5e7eb;
    }
    .bmg-loading {
      display: flex;
      gap: 4px;
      padding: 12px 16px;
    }
    .bmg-loading-dot {
      width: 8px;
      height: 8px;
      background: #9ca3af;
      border-radius: 50%;
      animation: bmg-bounce 1.4s infinite ease-in-out;
    }
    .bmg-loading-dot:nth-child(1) { animation-delay: -0.32s; }
    .bmg-loading-dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bmg-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    #bmg-chat-input-container {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
    }
    #bmg-chat-input {
      flex: 1;
      border: 2px solid #e5e7eb;
      border-radius: 24px;
      padding: 12px 16px;
      font-size: 14px;
      outline: none;
      font-family: Arial, sans-serif;
    }
    #bmg-chat-input:focus { border-color: #764ba2; }
    #bmg-chat-send {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 18px;
      transition: transform 0.2s;
    }
    #bmg-chat-send:hover { transform: scale(1.05); }
    #bmg-chat-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    #bmg-language-selector {
      padding: 24px;
      text-align: center;
    }
    #bmg-language-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 24px;
    }
    .bmg-lang-btn {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      font-family: Arial, sans-serif;
    }
    .bmg-lang-btn:hover {
      border-color: #764ba2;
      box-shadow: 0 4px 12px rgba(118,75,162,0.2);
    }
    #bmg-welcome {
      text-align: center;
      color: #9ca3af;
      padding: 48px 24px;
    }
    @media (max-width: 480px) {
      #bmg-chat-container {
        width: calc(100vw - 32px);
        height: calc(100vh - 100px);
      }
    }
  `;
  document.head.appendChild(style);

  // HTML
  const chatHTML = `
    <button id="bmg-chat-button">
      <span style="font-size: 24px;">🎴</span>
      <span>BMG Chat</span>
    </button>
    
    <div id="bmg-chat-container">
      <div id="bmg-chat-header">
        <div>
          <div style="font-weight: bold; font-size: 18px;">🎴 BridgeMind</div>
          <div style="font-size: 12px; opacity: 0.9;">Gemini AI</div>
        </div>
        <button id="bmg-chat-close">×</button>
      </div>
      
      <div id="bmg-chat-messages"></div>
      
      <div id="bmg-chat-input-container">
        <input 
          type="text" 
          id="bmg-chat-input" 
          placeholder="Escribe tu mensaje..."
        />
        <button id="bmg-chat-send">➤</button>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.innerHTML = chatHTML;
  document.body.appendChild(container);

  // Referencias
  const button = document.getElementById('bmg-chat-button');
  const chatContainer = document.getElementById('bmg-chat-container');
  const closeBtn = document.getElementById('bmg-chat-close');
  const messagesDiv = document.getElementById('bmg-chat-messages');
  const input = document.getElementById('bmg-chat-input');
  const sendBtn = document.getElementById('bmg-chat-send');

  // Mostrar selector de idiomas
  function showLanguageSelector() {
    let html = '<div id="bmg-language-selector">';
    html += '<div style="font-size: 48px; margin-bottom: 16px;">🌍</div>';
    html += '<div style="font-size: 20px; font-weight: bold; color: #1f2937;">Selecciona idioma</div>';
    html += '<div id="bmg-language-grid">';
    
    for (let code in languages) {
      html += `
        <button class="bmg-lang-btn" onclick="window.bmgSelectLanguage('${code}')">
          <span style="font-size: 28px;">${languages[code].flag}</span>
          <span>${languages[code].name}</span>
        </button>
      `;
    }
    
    html += '</div></div>';
    messagesDiv.innerHTML = html;
  }

  // Seleccionar idioma
  window.bmgSelectLanguage = function(code) {
    selectedLanguage = code;
    conversationHistory = [];
    messagesDiv.innerHTML = `
      <div id="bmg-welcome">
        <div style="font-size: 48px; margin-bottom: 16px;">👋</div>
        <div style="font-size: 16px; font-weight: bold; color: #4b5563; margin-bottom: 8px;">
          ${code === 'es' ? '¡Hola! Soy el asistente de BMG' : 
            code === 'en' ? 'Hello! I\'m the BMG assistant' :
            code === 'de' ? 'Hallo! Ich bin der BMG-Assistent' :
            code === 'it' ? 'Ciao! Sono l\'assistente BMG' :
            code === 'fr' ? 'Bonjour! Je suis l\'assistant BMG' :
            code === 'ja' ? 'こんにちは！BMGアシスタントです' :
            code === 'ar' ? 'مرحباً! أنا مساعد BMG' :
            code === 'zh' ? '你好！我是BMG助手' : '¡Hola!'}
        </div>
        <div style="font-size: 14px;">
          ${code === 'es' ? 'Pregúntame sobre nuestro sistema de idiomas + Bridge' :
            code === 'en' ? 'Ask me about our language + Bridge system' :
            code === 'de' ? 'Fragen Sie mich über unser Sprach- + Bridge-System' :
            code === 'it' ? 'Chiedimi del nostro sistema lingua + Bridge' :
            code === 'fr' ? 'Demande-moi sur notre système langue + Bridge' :
            code === 'ja' ? '言語 + Bridgeシステムについて質問してください' :
            code === 'ar' ? 'اسألني عن نظام اللغة + Bridge' :
            code === 'zh' ? '询问我们的语言 + 桥牌系统' : 'Pregúntame'}
        </div>
      </div>
    `;
    input.focus();
  };

  // Abrir/Cerrar
  button.addEventListener('click', () => {
    chatContainer.classList.add('open');
    button.style.display = 'none';
    showLanguageSelector();
  });

  closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('open');
    button.style.display = 'flex';
    selectedLanguage = null;
  });

  // Agregar mensaje
  function addMessage(text, type) {
    const welcome = document.getElementById('bmg-welcome');
    if (welcome) welcome.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `bmg-message ${type}`;
    messageDiv.innerHTML = `<div class="bmg-message-content">${escapeHtml(text)}</div>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Loading
  function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bmg-message bot';
    loadingDiv.id = 'bmg-loading-message';
    loadingDiv.innerHTML = `
      <div class="bmg-message-content bmg-loading">
        <div class="bmg-loading-dot"></div>
        <div class="bmg-loading-dot"></div>
        <div class="bmg-loading-dot"></div>
      </div>
    `;
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function hideLoading() {
    const loading = document.getElementById('bmg-loading-message');
    if (loading) loading.remove();
  }

  // Llamar Gemini
  async function callGemini(userMessage) {
    if (!selectedLanguage) {
      addMessage('Por favor selecciona un idioma primero', 'bot');
      return;
    }

    try {
      isLoading = true;
      sendBtn.disabled = true;
      input.disabled = true;
      showLoading();

      const history = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              ...history,
              { role: 'user', parts: [{ text: userMessage }] }
            ],
            systemInstruction: { parts: [{ text: systemPrompts[selectedLanguage] || systemPrompts.es }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
          })
        }
      );

      const data = await response.json();
      hideLoading();

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        
        conversationHistory.push(
          { role: 'user', content: userMessage },
          { role: 'assistant', content: botResponse }
        );

        addMessage(botResponse, 'bot');
      } else {
        const errorMsg = selectedLanguage === 'es' ? '⚠️ Error al conectar' :
                        selectedLanguage === 'en' ? '⚠️ Connection error' :
                        selectedLanguage === 'de' ? '⚠️ Verbindungsfehler' :
                        selectedLanguage === 'it' ? '⚠️ Errore di connessione' :
                        selectedLanguage === 'fr' ? '⚠️ Erreur de connexion' :
                        selectedLanguage === 'ja' ? '⚠️ 接続エラー' :
                        selectedLanguage === 'ar' ? '⚠️ خطأ في الاتصال' :
                        selectedLanguage === 'zh' ? '⚠️ 连接错误' : '⚠️ Error';
        addMessage(errorMsg, 'bot');
      }
    } catch (error) {
      hideLoading();
      console.error('Error:', error);
      const errorMsg = selectedLanguage === 'es' ? 'Disculpa, tengo problemas de conexión' :
                      selectedLanguage === 'en' ? 'Sorry, connection problems' :
                      'Error de conexión';
      addMessage(errorMsg, 'bot');
    } finally {
      isLoading = false;
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  // Enviar
  function sendMessage() {
    if (!selectedLanguage) {
      showLanguageSelector();
      return;
    }

    const message = input.value.trim();
    if (!message || isLoading) return;

    addMessage(message, 'user');
    input.value = '';
    callGemini(message);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isLoading) sendMessage();
  });

  console.log('✅ BMG Chatbot cargado correctamente');
})();
