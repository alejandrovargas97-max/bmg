const { useState, useEffect, useRef } = React;
const { Send, X, Globe, Users, Download, Loader2 } = lucide;

const BMGChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLanguage, setUserLanguage] = useState('es');
  const [prospects, setProspects] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

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

  const systemPrompt = `Eres el asistente oficial de BridgeMind Games (BMG). SOLO hablas sobre BMG.

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
2. Si preguntan algo NO relacionado con BMG: "Lo siento, solo puedo ayudarte con BridgeMind Games"
3. Sé breve (máximo 3-4 oraciones)
4. Si preguntan precios o quieren inscribirse: "Te puedo conectar con Alejandro al +34 634 268 663"`;

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

  const callGeminiAPI = async (userMessage) => {
    try {
      setIsLoading(true);
      
      const history = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...history,
              { role: "user", parts: [{ text: userMessage }] }
            ],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
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

        addBotMessage(botResponse);
      } else {
        addBotMessage("⚠️ Error al conectar. Verifica tu conexión.");
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
    callGeminiAPI(userInput);
  };

  const exportProspects = () => {
    const csv = [
      ['Fecha', 'Datos'],
      ...prospects.map(p => [p.fecha, JSON.stringify(p)])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmg_conversaciones_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'button',
      {
        onClick: () => setShowAdmin(true),
        className: 'fixed top-6 right-6 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform z-50',
        style: { display: prospects.length > 0 ? 'block' : 'none' }
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
          },
          className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-transform flex items-center gap-3'
        },
        React.createElement('span', { className: 'text-2xl' }, '🎴'),
        React.createElement('span', { className: 'font-semibold' }, 'BMG Chat')
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
            React.createElement('span', { className: 'text-3xl' }, '🎴'),
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
                  setMessages([]);
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
            React.createElement('h3', { className: 'text-xl font-bold mb-6 text-gray-800' }, 'Selecciona idioma'),
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
                React.createElement('span', { className: 'font-semibold text-gray-700' }, lang.name)
              ))
            )
          ) : React.createElement(
            React.Fragment,
            null,
            messages.length === 0 && React.createElement(
              'div',
              { className: 'text-center text-gray-400 py-12' },
              React.createElement('p', { className: 'text-lg mb-2' }, '👋 ¡Hola! Soy el asistente de BMG'),
              React.createElement('p', { className: 'text-sm' }, 'Pregúntame sobre nuestro sistema de idiomas + Bridge')
            ),
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
          !showLanguageSelector && React.createElement(
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
