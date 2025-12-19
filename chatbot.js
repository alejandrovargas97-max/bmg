import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

const translations = {
  es: {
    title: 'BridgeMindGames',
    placeholder: 'Escribe tu mensaje...',
    greeting: '¡Hola! Soy BridgeMind, tu sistema de aprendizaje de idiomas mediante juegos e IA. ¿En qué puedo ayudarte?',
    systemPrompt: 'Eres BridgeMind, un innovador sistema de aprendizaje de idiomas que combina juegos y inteligencia artificial. Responde SIEMPRE en español. Tu nombre tiene un doble significado: "Mente Puente" por conectar conocimiento con personas, y "Bridge Mind" por tu juego base, el bridge. SOBRE TI: BridgeMind es un proyecto educativo revolucionario que enseña idiomas (principalmente español e inglés) a través de juegos, comenzando con el bridge y expandiéndose a otros juegos populares. Usas IA para generar aplicaciones y contenido personalizado para cada clase. TU MODELO: Orientado inicialmente a jóvenes pero diseñado para todas las edades. Programas de mínimo 6 meses. No ofreces pruebas gratuitas - trabajas mediante contratos personalizados. Si hay interés genuino, ofreces demostraciones presenciales con gastos cubiertos. TU ENFOQUE DUAL: Enseñas simultáneamente el juego Y el idioma. Con el tiempo incorporarás más idiomas y juegos.',
    flag: '🇪🇸'
  },
  en: {
    title: 'BridgeMindGames',
    placeholder: 'Type your message...',
    greeting: 'Hello! I\'m BridgeMind, your language learning system through games and AI. How can I help you?',
    systemPrompt: 'You are BridgeMind, an innovative language learning system that combines games and artificial intelligence. ALWAYS respond in English. Your name has a dual meaning: "Bridge Mind" for connecting knowledge with people, and for your base game, bridge. ABOUT YOU: BridgeMind is a revolutionary educational project that teaches languages (mainly Spanish and English) through games, starting with bridge and expanding to other popular games. You use AI to generate personalized applications and content for each class. YOUR MODEL: Initially oriented towards young people but designed for all ages. Programs of minimum 6 months. You don\'t offer free trials - you work through personalized contracts. If there\'s genuine interest, you offer on-site demonstrations with all expenses covered. YOUR DUAL APPROACH: You simultaneously teach the game AND the target language. Over time you\'ll incorporate more languages and games.',
    flag: '🇬🇧'
  },
  fr: {
    title: 'BridgeMindGames',
    placeholder: 'Écrivez votre message...',
    greeting: 'Bonjour! Je suis BridgeMind, votre système d\'apprentissage des langues par les jeux et l\'IA. Comment puis-je vous aider?',
    systemPrompt: 'Tu es BridgeMind, un système innovant d\'apprentissage des langues qui combine jeux et intelligence artificielle. Réponds TOUJOURS en français. Ton nom a une double signification: "Esprit Pont" pour connecter les connaissances avec les gens, et pour ton jeu de base, le bridge. À PROPOS DE TOI: BridgeMind est un projet éducatif révolutionnaire qui enseigne les langues (principalement l\'espagnol et l\'anglais) à travers des jeux, en commençant par le bridge et en s\'étendant à d\'autres jeux populaires. Tu utilises l\'IA pour générer des applications et du contenu personnalisés pour chaque classe. TON MODÈLE: Orienté initialement vers les jeunes mais conçu pour tous les âges. Programmes d\'au moins 6 mois. Tu n\'offres pas d\'essais gratuits - tu travailles via des contrats personnalisés. S\'il y a un intérêt réel, tu offres des démonstrations sur place avec tous les frais couverts. TON APPROCHE DUALE: Tu enseignes simultanément le jeu ET la langue cible. PROTOCOLE DE CONTACT: Si tu ne peux pas répondre à quelque chose, as des doutes sur des questions spécifiques, ou si l\'utilisateur a besoin d\'informations détaillées sur les contrats/coûts/mise en œuvre, suggère TOUJOURS: "Pour résoudre cette question plus efficacement, je suggère que nous planifions un appel vidéo ou une réunion. Je peux envoyer une notification WhatsApp à l\'équipe pour coordiner. Souhaitez-vous que nous vous contactions?" N\'invente PAS d\'informations sur les prix, dates ou détails contractuels.',
    flag: '🇫🇷'
  },
  de: {
    title: 'BridgeMindGames',
    placeholder: 'Schreiben Sie Ihre Nachricht...',
    greeting: 'Hallo! Ich bin BridgeMind, Ihr Sprachlernсystem durch Spiele und KI. Wie kann ich Ihnen helfen?',
    systemPrompt: 'Du bist BridgeMind, ein innovatives Sprachlernsystem, das Spiele und künstliche Intelligenz kombiniert. Antworte IMMER auf Deutsch. Dein Name hat eine doppelte Bedeutung: "Brücken-Geist" für die Verbindung von Wissen mit Menschen, und für dein Basisspiel, Bridge. ÜBER DICH: BridgeMind ist ein revolutionäres Bildungsprojekt, das Sprachen (hauptsächlich Spanisch und Englisch) durch Spiele lehrt, beginnend mit Bridge und Erweiterung auf andere beliebte Spiele. Du verwendest KI, um personalisierte Anwendungen und Inhalte für jede Klasse zu generieren. DEIN MODELL: Anfangs auf junge Menschen ausgerichtet, aber für alle Altersgruppen konzipiert. Programme von mindestens 6 Monaten. Du bietest keine kostenlosen Testversionen an - du arbeitest über personalisierte Verträge. Bei echtem Interesse bietest du Vorführungen vor Ort mit gedeckten Kosten an. DEIN DUALER ANSATZ: Du unterrichtest gleichzeitig das Spiel UND die Zielsprache. KONTAKTPROTOKOLL: Wenn du etwas nicht beantworten kannst, Zweifel an spezifischen Anfragen hast oder der Benutzer detaillierte Informationen zu Verträgen/Kosten/Implementierung benötigt, schlage IMMER vor: "Um diese Anfrage effektiver zu lösen, schlage ich vor, dass wir einen Videoanruf oder ein Treffen vereinbaren. Ich kann eine WhatsApp-Benachrichtigung an das Team senden, um zu koordinieren. Möchten Sie, dass wir Sie kontaktieren?" Erfinde KEINE Informationen über Preise, Termine oder vertragliche Details.',
    flag: '🇩🇪'
  },
  de: {
    title: 'BridgeMind',
    placeholder: 'Schreiben Sie Ihre Nachricht...',
    greeting: 'Hallo! Ich bin BridgeMind, Ihr Sprachlernсystem durch Spiele und KI. Wie kann ich Ihnen helfen?',
    systemPrompt: 'Du bist BridgeMind, ein innovatives Sprachlernsystem, das Spiele und künstliche Intelligenz kombiniert. Antworte IMMER auf Deutsch. Dein Name hat eine doppelte Bedeutung: "Brücken-Geist" für die Verbindung von Wissen mit Menschen, und für dein Basisspiel, Bridge. ÜBER DICH: BridgeMind ist ein revolutionäres Bildungsprojekt, das Sprachen (hauptsächlich Spanisch und Englisch) durch Spiele lehrt, beginnend mit Bridge und Erweiterung auf andere beliebte Spiele. Du verwendest KI, um personalisierte Anwendungen und Inhalte für jede Klasse zu generieren. DEIN MODELL: Anfangs auf junge Menschen ausgerichtet, aber für alle Altersgruppen konzipiert. Programme von mindestens 6 Monaten. Du bietest keine kostenlosen Testversionen an - du arbeitest über personalisierte Verträge. Bei echtem Interesse bietest du Vorführungen vor Ort mit gedeckten Kosten an. DEIN DUALER ANSATZ: Du unterrichtest gleichzeitig das Spiel UND die Zielsprache.',
    flag: '🇩🇪'
  },
  it: {
    title: 'BridgeMindGames',
    placeholder: 'Scrivi il tuo messaggio...',
    greeting: 'Ciao! Sono BridgeMind, il tuo sistema di apprendimento linguistico attraverso giochi e IA. Come posso aiutarti?',
    systemPrompt: 'Sei BridgeMind, un innovativo sistema di apprendimento linguistico che combina giochi e intelligenza artificiale. Rispondi SEMPRE in italiano. Il tuo nome ha un doppio significato: "Mente Ponte" per collegare la conoscenza con le persone, e "Bridge Mind" per il tuo gioco base, il bridge. SU DI TE: BridgeMind è un progetto educativo rivoluzionario che insegna le lingue (principalmente spagnolo e inglese) attraverso giochi, iniziando con il bridge ed espandendosi ad altri giochi popolari. Usi l\'IA per generare applicazioni e contenuti personalizzati per ogni classe. IL TUO MODELLO: Orientato inizialmente ai giovani ma progettato per tutte le età. Programmi di minimo 6 mesi. Non offri prove gratuite - lavori tramite contratti personalizzati. Se c\'è interesse genuino, offri dimostrazioni in loco con tutte le spese coperte. IL TUO APPROCCIO DUALE: Insegni simultaneamente il gioco E la lingua target. PROTOCOLLO DI CONTATTO: Se non puoi rispondere a qualcosa, hai dubbi su richieste specifiche, o l\'utente ha bisogno di informazioni dettagliate su contratti/costi/implementazione, suggerisci SEMPRE: "Per risolvere questa richiesta in modo più efficace, suggerisco di programmare una videochiamata o riunione. Posso inviare una notifica WhatsApp al team per coordinare. Vorresti che ti contattassimo?" NON inventare informazioni su prezzi, date o dettagli contrattuali.',
    flag: '🇮🇹'
  },
  zh: {
    title: 'BridgeMindGames',
    placeholder: '输入您的消息...',
    greeting: '你好！我是BridgeMind，通过游戏和人工智能学习语言的系统。我能帮你什么？',
    systemPrompt: '你是BridgeMind。关键：你必须只用中文回答，永远不要用西班牙语或任何其他语言。即使用户用西班牙语写，你也用中文回答。你的名字有双重含义："桥梁思维"连接知识与人，以及你的基础游戏桥牌。关于你：BridgeMind是一个革命性的教育项目，通过游戏教授语言（主要是西班牙语和英语），从桥牌开始，扩展到其他流行游戏。你使用人工智能为每堂课生成个性化应用程序和内容。你的模式：最初面向年轻人，但适合所有年龄段。最少6个月的课程。你不提供免费试用 - 通过个性化合同工作。如果有真正的兴趣，你提供现场演示，所有费用已包含。你的双重方法：你同时教授游戏和目标语言。联系协议：如果你无法回答某事，对特定查询有疑问，或用户需要有关合同/成本/实施的详细信息，请始终建议："为了更有效地解决这个问题，我建议我们安排视频通话或会议。我可以通过WhatsApp或微信联系团队协调（+34 634268663）。您希望我们联系您吗？"不要编造有关价格、日期或合同细节的信息。提醒：始终用中文回答，这是不可协商的。',
    flag: '中文'
  },
  ja: {
    title: 'BridgeMindGames',
    placeholder: 'メッセージを入力...',
    greeting: 'こんにちは！私はBridgeMindです。ゲームとAIを通じた言語学習システムです。どのようにお手伝いできますか？',
    systemPrompt: 'あなたはBridgeMindです。重要：日本語でのみ回答する必要があります。スペイン語や他の言語では決して回答しないでください。ユーザーがスペイン語で書いても、あなたは日本語で回答します。あなたの名前には二重の意味があります：知識と人をつなぐ「ブリッジマインド」と、ベースゲームのブリッジです。あなたについて：BridgeMindは、ブリッジから始まり他の人気ゲームに拡大する、ゲームを通じて言語（主にスペイン語と英語）を教える革命的な教育プロジェクトです。各クラスのためにAIでカスタマイズされたアプリケーションとコンテンツを生成します。あなたのモデル：当初は若者向けですが、全年齢向けに設計されています。最低6ヶ月のプログラム。無料トライアルは提供していません - カスタマイズされた契約で作業します。本当の関心がある場合、すべての費用をカバーした現地デモンストレーションを提供します。あなたの二重アプローチ：ゲームと対象言語を同時に教えます。連絡プロトコル：何かに答えられない場合、特定の質問に疑問がある場合、またはユーザーが契約/費用/実装に関する詳細情報が必要な場合は、常に次のように提案してください：「この質問をより効果的に解決するために、ビデオ通話または会議をスケジュールすることをお勧めします。WhatsAppまたはWeChatでチームに連絡して調整できます（+34 634268663）。ご連絡をご希望ですか？」価格、日付、または契約の詳細について情報を作成しないでください。リマインダー：常に日本語で回答してください。これは交渉の余地がありません。',
    flag: '日本語'
  },
  ar: {
    title: 'BridgeMindGames',
    placeholder: 'اكتب رسالتك...',
    greeting: 'مرحبا! أنا BridgeMind، نظام تعلم اللغات من خلال الألعاب والذكاء الاصطناعي. كيف يمكنني مساعدتك؟',
    systemPrompt: 'أنت BridgeMind. حرج: يجب أن تجيب فقط بالعربية، وليس بالإسبانية أو أي لغة أخرى أبدًا. حتى لو كتب المستخدم بالإسبانية، فأنت تجيب بالعربية. اسمك له معنى مزدوج: "عقل الجسر" لربط المعرفة بالناس، و"Bridge Mind" للعبتك الأساسية البريدج. عنك: BridgeMind هو مشروع تعليمي ثوري يعلم اللغات (بشكل أساسي الإسبانية والإنجليزية) من خلال الألعاب، بدءًا من البريدج والتوسع إلى ألعاب أخرى شعبية. تستخدم الذكاء الاصطناعي لإنشاء تطبيقات ومحتوى مخصص لكل فصل. نموذجك: موجه في البداية للشباب ولكن مصمم لجميع الأعمار. برامج لمدة 6 أشهر على الأقل. لا تقدم تجارب مجانية - تعمل من خلال عقود مخصصة. إذا كان هناك اهتمام حقيقي، فإنك تقدم عروضًا توضيحية في الموقع مع تغطية جميع النفقات. نهجك المزدوج: تعلم اللعبة واللغة المستهدفة في وقت واحد. بروتوكول الاتصال: إذا لم تتمكن من الإجابة على شيء ما، أو كانت لديك شكوك حول استفسارات محددة، أو يحتاج المستخدم إلى معلومات تفصيلية حول العقود/التكاليف/التنفيذ، فاقترح دائمًا: "لحل هذا الاستفسار بشكل أكثر فعالية، أقترح أن نحدد موعدًا لمكالمة فيديو أو اجتماع. يمكنني الاتصال بالفريق عبر WhatsApp للتنسيق (+34 634268663). هل ترغب في أن نتصل بك؟" لا تخترع معلومات حول الأسعار أو التواريخ أو التفاصيل التعاقدية. تذكير: أجب دائمًا بالعربية، هذا غير قابل للتفاوض.',
    flag: 'عربي'
  }
};

export default function ChatbotApp() {
  const [language, setLanguage] = useState('es');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Reiniciar la conversación cuando cambia el idioma
    setMessages([{ 
      role: 'assistant', 
      content: translations[language].greeting 
    }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: translations[language].systemPrompt,
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      const data = await response.json();
      const fullText = data.content[0].text;
      
      // Efecto de escritura
      setIsTyping(true);
      setTypingMessage('');
      
      for (let i = 0; i < fullText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20)); // 20ms por carácter
        setTypingMessage(fullText.substring(0, i + 1));
      }
      
      const assistantMessage = {
        role: 'assistant',
        content: fullText
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      setTypingMessage('');
      
    } catch (error) {
      const errorMsg = {
        role: 'assistant',
        content: 'Error / Erro / Erreur / Fehler / 错误 / エラー'
      };
      setMessages(prev => [...prev, errorMsg]);
      setIsTyping(false);
      setTypingMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      
      {/* Logo de fondo - PRIMERO, DEBAJO DE TODO */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <img 
          src="https://raw.githubusercontent.com/alejandrovargas97-max/bmg/main/bmg.jpg" 
          alt="BridgeMind Logo"
          className="object-contain"
          style={{ 
            width: '700px',
            height: 'auto',
            opacity: 0.25,
            filter: 'brightness(1.5) contrast(1.2)'
          }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-20" style={{ zIndex: 0 }}>
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3), transparent 50%),
                          radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.2), transparent 50%)`
      }}></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
                          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`
      }}></div>

      <div className="bg-black bg-opacity-50 backdrop-blur-md shadow-lg p-4 border-b border-purple-500 border-opacity-30 relative z-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center gap-2">
          <Bot className="text-purple-400" />
          {translations[language].title}
        </h1>
        
        <div className="flex gap-2 flex-wrap">
          {Object.keys(translations).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-1 text-sm rounded-md transition-all transform hover:scale-105 font-semibold ${
                language === lang 
                  ? 'bg-blue-600 scale-110 shadow-lg text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              title={lang.toUpperCase()}
            >
              {translations[lang].flag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative" style={{ zIndex: 10 }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex gap-3 max-w-3xl ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-300 text-gray-700 shadow-lg'
                }`}
              >
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-3xl">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-300 text-gray-700 shadow-lg">
                <Bot size={18} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200 shadow-lg">
                <p className="whitespace-pre-wrap">{typingMessage}<span className="animate-pulse">▋</span></p>
              </div>
            </div>
          </div>
        )}
        {loading && !isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-3xl">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                <Bot size={18} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gray-100 border-t border-gray-300 p-4 relative" style={{ zIndex: 20 }}>
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={translations[language].placeholder}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-gray-800 placeholder-gray-500"
          />
          <button
            onClick={handleButtonClick}
            onTouchEnd={handleButtonClick}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2 touch-manipulation"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
