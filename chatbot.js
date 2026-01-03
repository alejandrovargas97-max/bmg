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

  const systemPrompt = `Eres un asistente especializado EXCLUSIVAMENTE en BridgeMindGames (BMG).

INFORMACIÓN BMG:
- Grupos de 4 personas presenciales
- 8 idiomas: Español, Inglés, Alemán, Italiano, Francés, Japonés, Árabe, Chino
- Instructor humano + tecnología
- Bridge para inmersión lingüística

REGLAS:
1. SOLO responde sobre BMG
2. Si preguntan otro tema: "Lo siento, solo puedo ayudarte con BMG" y usa [MOSTRAR_CONTACTO]
3. Si preguntan inscripción/precios: usa [INICIAR_FORMULARIO]
4. Sé breve (2-4 oraciones)`;

  const formQuestions = {
    es: {
      askLanguage: "🌍 ¿Qué idioma deseas aprender?",
      askBridgeLevel: "🎴 ¿Nivel de Bridge? (Cero/Principiante/Intermedio/Avanzado/Experto)",
      askGroup: "👥 ¿Tienes grupo o necesitas uno?",
      askName: "✏️ Tu nombre completo:",
      askContact: "📱 Canal y contacto (ej: WhatsApp +34612345678):",
      thanks: "¡Perfecto! ✅ Te contactaremos pronto. ¡Bienvenido a BMG! 🎉"
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

  const callClaudeAPI = async (userMessage) => {
    try {
      setIsLoading(true);
      
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...conversationHistory,
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.content && data.content[0]) {
        const botResponse = data.content[0].text;
        
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
      }
    } catch (error) {
      setIsLoading(false);
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

    callClaudeAPI(userInput);
  };

  const selectContactMethod = (method) => {
    setShowContactMethod(false);
    if (method === 'form') {
      setStage('askLanguage');
      addBotMessage(formQuestions[userLanguage].askLanguage, 100);
    } else {
      addBotMessage("📞 Horarios: Lun-Vie 9-18h\n\n📱 WhatsApp: +34 634 268 663\n📧 bridgemindgames@gmail.com", 100);
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
                  React.createElement('a', { href: `https://wa.me/${p.contacto.replace(/\D/g, '')}`, target: '_blank', rel: 'noopener noreferrer', className: 'text-blue-600 hover:underline' }, p.contacto)
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
              React.createElement('p', { className: 'text-xs opacity-90' }, '24/7')
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
