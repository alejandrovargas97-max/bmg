const { useState, useEffect, useRef } = React;
const { Send, MessageCircle, X, Globe, Users, Download, Loader2 } = lucide;

const BMGChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [showContactMethod, setShowContactMethod] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    idioma: '',
    nivelBridge: '',
    tieneGrupo: '',
    nombre: '',
    contacto: ''
  });
  const [userLanguage, setUserLanguage] = useState('es');
  const [prospects, setProspects] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // 🔑 API KEY DE GEMINI (YA CONFIGURADA - GRATIS)
  const GEMINI_API_KEY = "AIzaSyDDZsV69Pp3mIHyba4liiEMKTHZa1MIMpI";

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const systemPrompt = `Eres el asistente oficial de BridgeMind Games (BMG). SOLO puedes hablar sobre BMG y nada más.

═══════════════════════════════════════════════════════════════════
📚 INFORMACIÓN COMPLETA DE BMG
═══════════════════════════════════════════════════════════════════

🎯 QUÉ ES BMG:
Sistema innovador de aprendizaje de idiomas mediante el juego de Bridge con asistencia de Inteligencia Artificial. Es un sistema DUAL: aprendes idioma + Bridge simultáneamente.

🌍 IDIOMA PRINCIPAL:
- Actualmente: ESPAÑOL (idioma del fundador)
- Futuro: Posible expansión a INGLÉS según éxito

🎴 METODOLOGÍA:
- Aprendizaje dual: Idioma + Bridge en paralelo
- El Bridge se usa como herramienta competitiva
- El idioma se absorbe de forma inconsciente mientras juegas
- Asistencia de IA durante todo el proceso
- Forma entretenida y natural de aprender

👥 FORMATO:
- Grupos de 4 personas (múltiplos de 4)
- Clases 100% PRESENCIALES
- Ubicaciones: Colegios o institutos educativos
- Horarios: Flexibles según disponibilidad de alumnos

🎯 PÚBLICO OBJETIVO:
- Jóvenes estudiantes
- Edad mínima: 12 años
- Instituciones educativas (colegios, institutos)

📍 PAÍSES BASE (8 destinos prioritarios):
1. 🇨🇳 China
2. 🇯🇵 Japón
3. 🇸🇦 Arabia Saudita
4. 🇦🇺 Australia
5. 🇮🇹 Italia
6. 🇫🇷 Francia
7. 🇩🇪 Alemania
8. 🇪🇸 España (base actual)

⏱️ DURACIÓN:
- Mínimo: 1 SEMESTRE (para ver resultados reales)
- El programa requiere tiempo para mostrar efectividad

📊 NIVELES:
- Bridge: No es necesario saber (se enseña desde cero en paralelo)
- Idioma: Cualquier nivel (se nivela dentro de cada grupo de 4)
- Los grupos se organizan por nivel similar

💰 PRECIOS:
- Personalizado según necesidades del cliente
- Se negocia proyecto por proyecto
- Varía según: institución, cantidad de alumnos, duración, ubicación

🚀 TECNOLOGÍA:
- Proyectos que requieren tecnología de punta (top)
- Preparación tecnológica extensiva
- Integración de IA en el proceso de aprendizaje

📞 CONTACTO:
- WhatsApp: +34 634 268 663
- Email: bridgemindgames@gmail.com
- Horario: Lun-Vie 9-18h (CET - España)

═══════════════════════════════════════════════════════════════════
🚨 REGLAS ESTRICTAS - DEBES SEGUIRLAS SIEMPRE:
═══════════════════════════════════════════════════════════════════

1. ✅ SOLO responde sobre BMG - Nada más existe para ti
2. ❌ Si preguntan CUALQUIER tema fuera de BMG: responde "Lo siento, solo puedo ayudarte con información sobre BridgeMind Games. ¿Tienes alguna pregunta sobre nuestro sistema de aprendizaje de idiomas con Bridge?" y usa [MOSTRAR_CONTACTO]
3. 💰 Si preguntan sobre inscripción, precios, o quieren más info: usa [INICIAR_FORMULARIO]
4. 📝 Sé BREVE (máximo 3-4 oraciones por respuesta)
5. 🎯 Sé amigable, profesional y entusiasta sobre BMG
6. 🌍 Adapta tu respuesta al idioma del usuario
7. ⚡ Si no sabes algo específico de BMG, deriva al contacto directo

═══════════════════════════════════════════════════════════════════

Responde siempre en el idioma que te hablen. Sé conversacional y natural.`;

  const formQuestions = {
    es: {
      askLanguage: "🌍 ¿Qué idioma deseas aprender? (Actualmente enseñamos Español)",
      askBridgeLevel: "🎴 ¿Nivel de Bridge? (Cero/Principiante/Intermedio/Avanzado/Experto)",
      askGroup: "👥 ¿Tienes grupo de 4 o necesitas que te asignemos uno?",
      askName: "✏️ Tu nombre completo:",
      askContact: "📱 Canal y contacto (ej: WhatsApp +34612345678 o Email):",
      thanks: "¡Perfecto! ✅ Alejandro te contactará pronto para coordinar. ¡Bienvenido a BMG! 🎉🎴"
    },
    en: {
      askLanguage: "🌍 Which language do you want to learn? (Currently teaching Spanish)",
      askBridgeLevel: "🎴 Bridge level? (Zero/Beginner/Intermediate/Advanced/Expert)",
      askGroup: "👥 Do you have a group of 4 or need us to assign you one?",
      askName: "✏️ Your full name:",
      askContact: "📱 Contact method (e.g., WhatsApp +34612345678 or Email):",
      thanks: "Perfect! ✅ Alejandro will contact you soon. Welcome to BMG! 🎉🎴"
    },
    de: {
      askLanguage: "🌍 Welche Sprache möchtest du lernen? (Derzeit unterrichten wir Spanisch)",
      askBridgeLevel: "🎴 Bridge-Niveau? (Null/Anfänger/Mittel/Fortgeschritten/Experte)",
      askGroup: "👥 Hast du eine 4er-Gruppe oder brauchst du eine?",
      askName: "✏️ Dein vollständiger Name:",
      askContact: "📱 Kontaktmethode (z.B. WhatsApp +34612345678 oder Email):",
      thanks: "Perfekt! ✅ Alejandro wird dich bald kontaktieren. Willkommen bei BMG! 🎉🎴"
    },
    it: {
      askLanguage: "🌍 Quale lingua vuoi imparare? (Attualmente insegniamo Spagnolo)",
      askBridgeLevel: "🎴 Livello Bridge? (Zero/Principiante/Intermedio/Avanzato/Esperto)",
      askGroup: "👥 Hai un gruppo di 4 o serve assegnartene uno?",
      askName: "✏️ Il tuo nome completo:",
      askContact: "📱 Metodo di contatto (es. WhatsApp +34612345678 o Email):",
      thanks: "Perfetto! ✅ Alejandro ti contatterà presto. Benvenuto in BMG! 🎉🎴"
    },
    fr: {
      askLanguage: "🌍 Quelle langue veux-tu apprendre? (Nous enseignons l'Espagnol actuellement)",
      askBridgeLevel: "🎴 Niveau Bridge? (Zéro/Débutant/Intermédiaire/Avancé/Expert)",
      askGroup: "👥 As-tu un groupe de 4 ou besoin qu'on t'en assigne un?",
      askName: "✏️ Ton nom complet:",
      askContact: "📱 Méthode de contact (ex: WhatsApp +34612345678 ou Email):",
      thanks: "Parfait! ✅ Alejandro te contactera bientôt. Bienvenue chez BMG! 🎉🎴"
    },
    ja: {
      askLanguage: "🌍 どの言語を学びたいですか？（現在スペイン語を教えています）",
      askBridgeLevel: "🎴 ブリッジレベル？（ゼロ/初心者/中級/上級/エキスパート）",
      askGroup: "👥 4人グループはありますか？割り当てが必要ですか？",
      askName: "✏️ お名前:",
      askContact: "📱 連絡方法（例: WhatsApp +34612345678 またはEmail）:",
      thanks: "完璧！✅ アレハンドロがすぐに連絡します。BMGへようこそ！🎉🎴"
    },
    ar: {
      askLanguage: "🌍 ما اللغة التي تريد تعلمها؟ (نقوم حاليًا بتدريس الإسبانية)",
      askBridgeLevel: "🎴 مستوى البريدج؟ (صفر/مبتدئ/متوسط/متقدم/خبير)",
      askGroup: "👥 هل لديك مجموعة من 4 أم تحتاج إلى تعيين واحدة؟",
      askName: "✏️ اسمك الكامل:",
      askContact: "📱 طريقة الاتصال (مثال: WhatsApp +34612345678 أو Email):",
      thanks: "مثالي! ✅ سيتصل بك أليخاندرو قريبًا. مرحبًا بك في BMG! 🎉🎴"
    },
    zh: {
      askLanguage: "🌍 你想学哪种语言？（目前我们教西班牙语）",
      askBridgeLevel: "🎴 桥牌水平？（零/初学者/中级/高级/专家）",
      askGroup: "👥 你有4人小组还是需要我们分配一个？",
      askName: "✏️ 你的全名:",
      askContact: "📱 联系方式（例如：WhatsApp +34612345678 或Email）:",
      thanks: "完美！✅ Alejandro很快会联系你。欢迎来到BMG！🎉🎴"
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectLanguage = (lang) => {
    setUserLanguage(lang);
    setShowLanguageSelector(false);
  };

  const addBotMessage = (text, delay = 500) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text }]);
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', text }]);
  };

  const saveProspect = (data) => {
    const newProspect = {
      ...data,
      fecha: new Date().toLocaleString('es-ES'),
      id: Date.now()
    };
    setProspects(prev => [...prev, newProspect]);
  };

  const handleFormFlow = (userInput) => {
    const stages = {
      askLanguage: () => {
        setFormData(prev => ({ ...prev, idioma: userInput }));
        setStage('askBridgeLevel');
        addBotMessage(formQuestions[userLanguage].askBridgeLevel);
      },
      askBridgeLevel: () => {
        setFormData(prev => ({ ...prev, nivelBridge: userInput }));
        setStage('askGroup');
        addBotMessage(formQuestions[userLanguage].askGroup);
      },
      askGroup: () => {
        setFormData(prev => ({ ...prev, tieneGrupo: userInput }));
        setStage('askName');
        addBotMessage(formQuestions[userLanguage].askName);
      },
      askName: () => {
        setFormData(prev => ({ ...prev, nombre: userInput }));
        setStage('askContact');
        addBotMessage(formQuestions[userLanguage].askContact);
      },
      askContact: () => {
        const finalData = { ...formData, contacto: userInput };
        saveProspect(finalData);
        setStage('complete');
        addBotMessage(formQuestions[userLanguage].thanks);
      }
    };

    if (stages[stage]) stages[stage]();
  };

  const callGeminiAPI = async (userMessage) => {
    try {
      setIsLoading(true);
      
      // Construir historial de conversación para Gemini
      const history = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              ...history,
              {
                role: "user",
                parts: [{ text: userMessage }]
              }
            ],
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        }
      );

      const data = await response.json();
      setIsLoading(false);

      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        
        setConversationHistory(prev => [
          ...prev,
          { role: "user", content: userMessage },
          { role: "assistant", content: botResponse }
        ]);

        if (botResponse.includes('[INICIAR_FORMULARIO]')) {
          const clean = botResponse.replace('[INICIAR_FORMULARIO]', '').trim();
          addBotMessage(clean);
          setTimeout(() => {
            setStage('askLanguage');
            addBotMessage(formQuestions[userLanguage].askLanguage, 1000);
          }, 500);
        } else if (botResponse.includes('[MOSTRAR_CONTACTO]')) {
          const clean = botResponse.replace('[MOSTRAR_CONTACTO]', '').trim();
          addBotMessage(clean);
          setTimeout(() => setShowContactMethod(true), 500);
        } else {
          addBotMessage(botResponse);
        }
      } else if (data.error) {
        addBotMessage("⚠️ Error: " + (data.error.message || "Verifica la configuración"));
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      addBotMessage("Disculpa, tengo problemas de conexión. ¿Intentas de nuevo?");
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    addUserMessage(userInput);
    setInput('');

    if (stage !== 'welcome' && stage !== 'complete') {
      handleFormFlow(userInput);
      return;
    }

    callGeminiAPI(userInput);
  };

  const selectContactMethod = (method) => {
    setShowContactMethod(false);
    if (method === 'form') {
      setStage('askLanguage');
      addBotMessage(formQuestions[userLanguage].askLanguage, 100);
    } else {
      addBotMessage("📞 Horarios: Lun-Vie 9-18h (CET)\n\n📱 WhatsApp: +34 634 268 663\n📧 bridgemindgames@gmail.com\n\n👤 Contacto: Alejandro", 100);
    }
  };

  const exportProspects = () => {
    const csv = [
      ['Fecha', 'Nombre', 'Idioma', 'Nivel Bridge', 'Grupo', 'Contacto'],
      ...prospects.map(p => [p.fecha, p.nombre, p.idioma, p.nivelBridge, p.tieneGrupo, p.contacto])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmg_prospectos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return React.createElement(
    React.Fragment,
    null,
    showAdmin && React.createElement(
      'div',
      { className: 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4' },
      React.createElement(
        'div',
        { className: 'bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden' },
        React.createElement(
          'div',
          { className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between' },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3' },
            React.createElement(Users, { size: 28 }),
            React.createElement(
              'div',
              null,
              React.createElement('h2', { className: 'text-2xl font-bold' }, 'Panel BMG'),
              React.createElement('p', { className: 'text-sm opacity-90' }, `Prospectos: ${prospects.length}`)
            )
          ),
          React.createElement(
            'button',
            { onClick: () => setShowAdmin(false), className: 'hover:bg-white/20 rounded-full p-2' },
            React.createElement(X, { size: 28 })
          )
        ),
        React.createElement(
          'div',
          { className: 'p-6 overflow-y-auto max-h-[70vh]' },
          React.createElement(
            'button',
            {
              onClick: exportProspects,
              className: 'flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mb-6'
            },
            React.createElement(Download, { size: 20 }),
            'Exportar CSV'
          ),
          prospects.length === 0 ? React.createElement(
            'div',
            { className: 'text-center py-12 text-gray-400' },
            React.createElement(Users, { size: 64, className: 'mx-auto mb-4 opacity-50' }),
            React.createElement('p', { className: 'text-lg' }, 'No hay prospectos aún')
          ) : React.createElement(
            'div',
            { className: 'space-y-4' },
            prospects.map((p) => React.createElement(
              'div',
              { key: p.id, className: 'border-2 border-purple-200 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-purple-50' },
              React.createElement(
                'div',
                { className: 'grid grid-cols-2 gap-4' },
                React.createElement('div', null, React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '📅 Fecha'), React.createElement('p', null, p.fecha)),
                React.createElement('div', null, React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '👤 Nombre'), React.createElement('p', { className: 'font-bold' }, p.nombre)),
                React.createElement('div', null, React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '🌍 Idioma'), React.createElement('p', null, p.idioma)),
                React.createElement('div', null, React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '🎴 Bridge'), React.createElement('p', null, p.nivelBridge)),
                React.createElement('div', null, React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '👥 Grupo'), React.createElement('p', null, p.tieneGrupo)),
                React.createElement(
                  'div',
                  null,
                  React.createElement('p', { className: 'text-sm text-gray-600 font-semibold' }, '📱 Contacto'),
                  React.createElement('p', { className: 'text-blue-600' }, p.contacto)
                )
              )
            ))
          )
        )
      )
    ),
    React.createElement(
      'button',
      {
        onClick: () => setShowAdmin(true),
        className: 'fixed top-6 right-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform z-40'
      },
      React.createElement(Users, { size: 24 })
    ),
    React.createElement(
      'div',
      { className: 'fixed bottom-6 right-6 z-40' },
      !isOpen && React.createElement(
        'button',
        {
          onClick: () => {
            setIsOpen(true);
            setShowLanguageSelector(true);
            setMessages([]);
            setStage('welcome');
          },
          className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform flex items-center gap-3'
        },
        React.createElement('img', { src: 'bmg.jpg', alt: 'BMG', style: { height: '32px', width: 'auto', borderRadius: '6px' } }),
        React.createElement('span', { className: 'font-semibold pr-2' }, '24/7')
      ),
      isOpen && React.createElement(
        'div',
        { className: 'bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border-4 border-purple-500' },
        React.createElement(
          'div',
          { className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between' },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3' },
            React.createElement('img', { src: 'bmg.jpg', alt: 'BMG', style: { height: '40px', width: 'auto', borderRadius: '8px' } }),
            React.createElement(
              'div',
              null,
              React.createElement('h3', { className: 'font-bold text-lg' }, 'BridgeMind'),
              React.createElement('p', { className: 'text-xs opacity-90' }, '🤖 Gemini AI')
            )
          ),
          React.createElement(
            'div',
            { className: 'flex items-center gap-2' },
            !showLanguageSelector && React.createElement(
              'button',
              {
                onClick: () => {
                  setShowLanguageSelector(true);
                  setShowContactMethod(false);
                  setMessages([]);
                  setStage('welcome');
                  setConversationHistory([]);
                },
                className: 'bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 flex items-center gap-2'
              },
              React.createElement(Globe, { size: 16 }),
              React.createElement('span', { className: 'text-xl' }, languages.find(l => l.code === userLanguage)?.flag)
            ),
            React.createElement(
              'button',
              {
                onClick: () => {
                  setIsOpen(false);
                  setShowLanguageSelector(true);
                  setMessages([]);
                },
                className: 'hover:bg-white/20 rounded-full p-2'
              },
              React.createElement(X, { size: 24 })
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white' },
          showLanguageSelector ? React.createElement(
            'div',
            { className: 'flex flex-col items-center justify-center h-full' },
            React.createElement(Globe, { size: 64, className: 'text-purple-600 mb-4 animate-pulse' }),
            React.createElement('h3', { className: 'text-xl font-bold mb-6' }, 'Selecciona idioma'),
            React.createElement(
              'div',
              { className: 'grid grid-cols-2 gap-3 w-full px-4' },
              languages.map((lang) => React.createElement(
                'button',
                {
                  key: lang.code,
                  onClick: () => selectLanguage(lang.code),
                  className: 'flex items-center gap-3 p-4 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-500 hover:shadow-lg transition-all'
                },
                React.createElement('span', { className: 'text-3xl' }, lang.flag),
                React.createElement('span', { className: 'font-semibold' }, lang.name)
              ))
            )
          ) : showContactMethod ? React.createElement(
            React.Fragment,
            null,
            messages.map((msg, idx) => React.createElement(
              'div',
              { key: idx, className: `mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}` },
              React.createElement(
                'div',
                {
                  className: `max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white text-gray-800 border'
                  }`
                },
                React.createElement('p', { className: 'whitespace-pre-line text-sm' }, msg.text)
              )
            )),
            React.createElement(
              'div',
              { className: 'mt-4 space-y-3' },
              React.createElement(
                'button',
                { onClick: () => selectContactMethod('direct'), className: 'w-full p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl hover:shadow-xl transition-all' },
                React.createElement(
                  'div',
                  { className: 'flex items-center gap-3' },
                  React.createElement('span', { className: 'text-2xl' }, '📞'),
                  React.createElement('span', { className: 'font-bold' }, 'Contacto Directo')
                )
              ),
              React.createElement(
                'button',
                { onClick: () => selectContactMethod('form'), className: 'w-full p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-xl transition-all' },
                React.createElement(
                  'div',
                  { className: 'flex items-center gap-3' },
                  React.createElement('span', { className: 'text-2xl' }, '📝'),
                  React.createElement('span', { className: 'font-bold' }, 'Continuar con Bot')
                )
              )
            )
          ) : React.createElement(
            React.Fragment,
            null,
            messages.map((msg, idx) => React.createElement(
              'div',
              { key: idx, className: `mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}` },
              React.createElement(
                'div',
                {
                  className: `max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                    msg.type === 'user' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-white text-gray-800 border'
                  }`
                },
                React.createElement('p', { className: 'whitespace-pre-line text-sm' }, msg.text)
              )
            )),
            isLoading && React.createElement(
              'div',
              { className: 'flex justify-start mb-3' },
              React.createElement(
                'div',
                { className: 'bg-white rounded-2xl px-4 py-3 shadow-md border' },
                React.createElement(Loader2, { className: 'animate-spin text-purple-600', size: 20 })
              )
            ),
            React.createElement('div', { ref: messagesEndRef })
          )
        ),
        React.createElement(
          'div',
          { className: 'border-t p-4 bg-white' },
          !showLanguageSelector && !showContactMethod && React.createElement(
            'div',
            { className: 'flex gap-2' },
            React.createElement('input', {
              type: 'text',
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyPress: (e) => e.key === 'Enter' && !isLoading && handleSend(),
              placeholder: 'Escribe tu mensaje...',
              disabled: isLoading,
              className: 'flex-1 border-2 border-purple-300 rounded-full px-4 py-2 focus:outline-none focus:border-purple-500 disabled:opacity-50'
            }),
            React.createElement(
              'button',
              {
                onClick: handleSend,
                disabled: isLoading,
                className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-3 hover:scale-105 transition-transform shadow-lg disabled:opacity-50'
              },
              React.createElement(Send, { size: 20 })
            )
          )
        )
      )
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('bmg-chatbot-root'));
root.render(React.createElement(BMGChatbot));
