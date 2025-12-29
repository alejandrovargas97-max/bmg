// chatbot.js - Chatbot inteligente no repetitivo para BridgeMind Games

const chatbotMemory = {
    conversations: [],
    lastResponses: [],
    
    addMessage: function(user, message) {
        this.conversations.push({
            user: user,
            message: message,
            timestamp: new Date().toISOString()
        });
        
        // Mantener solo las últimas 50 conversaciones
        if (this.conversations.length > 50) {
            this.conversations.shift();
        }
    },
    
    getContext: function() {
        return this.conversations.slice(-5);
    },
    
    wasRecentlyAnswered: function(message) {
        const lowerMsg = message.toLowerCase();
        // Verificar si ya respondimos algo similar recientemente
        return this.lastResponses.some(resp => 
            resp.toLowerCase().includes(lowerMsg) || 
            lowerMsg.includes(resp.toLowerCase())
        );
    }
};

// Respuestas inteligentes por idioma
const chatbotIntelligence = {
    responses: {
        es: {
            greeting: ["¡Hola! ¿En qué puedo ayudarte hoy?", "¡Buenos días! Soy el asistente de BridgeMind. ¿Necesitas información sobre nuestros programas educativos?", "¡Hola! ¿Cómo puedo asistirte con BridgeMind Games Education?"],
            pricing: ["Los precios varían según el programa y número de usuarios. Te recomiendo contactarnos para una cotización personalizada: bridgemindgames@gmail.com", "Tenemos diferentes planes adaptados a colegios, universidades y empresas. ¿Para qué tipo de institución te interesa?", "Podemos enviarte una propuesta personalizada sin compromiso. ¿Podrías indicarme el número aproximado de usuarios?"],
            demo: ["¡Claro! Podemos agendar una demostración personalizada de 30 minutos. ¿Qué día y hora te viene mejor?", "Perfecto. Las demostraciones son online y muestran todo el sistema. ¿Prefieres esta semana o la próxima?", "Nos encantaría mostrarte el sistema en acción. ¿Te interesa para primaria/secundaria o formación corporativa?"],
            contact: ["📧 Email: bridgemindgames@gmail.com\n📱 WhatsApp: +34 634 268 663\n⏰ Horario: L-V 9:00-18:00", "Puedes escribirnos directamente a info@bridgemindgames.com o llamarnos al +34 634 268 663", "Nuestro equipo está disponible para resolver tus dudas. Contacto principal: bridgemindgames@gmail.com"],
            program: ["🎯 3 Programas principales:\n1. Para Colegios (primaria/secundaria)\n2. Para Universidades\n3. Formación Empresarial\n¿Cuál te interesa?", "El sistema se adapta a diferentes niveles. Tenemos programas específicos para cada etapa educativa y empresas.", "Funciona tanto para educación reglada como formación corporativa. ¿Buscas mejorar habilidades cognitivas o lingüísticas?"],
            ai: ["🧠 Nuestra IA entrena simultáneamente:\n• Memoria y atención\n• Habilidades lingüísticas\n• Pensamiento crítico\n• Capacidad de resolución", "El sistema usa algoritmos de IA que se adaptan al nivel de cada usuario, maximizando el aprendizaje personalizado.", "La inteligencia artificial permite un seguimiento detallado del progreso y recomendaciones personalizadas para cada estudiante."],
            default: ["Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?", "Entiendo. ¿Te refieres específicamente a precios, demos o información técnica?", "Gracias por tu consulta. Para darte la mejor respuesta, ¿podrías especificar si es para colegio, universidad o empresa?"]
        },
        en: {
            greeting: ["Hello! How can I help you today?", "Good morning! I'm the BridgeMind assistant. Do you need information about our educational programs?", "Hi! How can I assist you with BridgeMind Games Education?"],
            pricing: ["Prices vary depending on the program and number of users. I recommend contacting us for a personalized quote: bridgemindgames@gmail.com", "We have different plans for schools, universities and companies. For which type of institution are you interested?", "We can send you a personalized proposal. Could you tell me the approximate number of users?"],
            demo: ["Sure! We can schedule a personalized 30-minute demo. What day and time works best for you?", "Perfect. Demos are online and show the entire system. Do you prefer this week or next week?", "We'd love to show you the system in action. Are you interested in K-12 education or corporate training?"],
            contact: ["📧 Email: bridgemindgames@gmail.com\n📱 WhatsApp: +34 634 268 663\n⏰ Schedule: Mon-Fri 9:00-18:00", "You can write to us directly at info@bridgemindgames.com or call us at +34 634 268 663", "Our team is available to answer your questions. Main contact: bridgemindgames@gmail.com"],
            program: ["🎯 3 Main programs:\n1. For Schools (K-12)\n2. For Universities\n3. Corporate Training\nWhich one interests you?", "The system adapts to different levels. We have specific programs for each educational stage and companies.", "It works for both formal education and corporate training. Are you looking to improve cognitive or linguistic skills?"],
            ai: ["🧠 Our AI trains simultaneously:\n• Memory and attention\n• Linguistic skills\n• Critical thinking\n• Problem-solving ability", "The system uses AI algorithms that adapt to each user's level, maximizing personalized learning.", "Artificial intelligence allows detailed progress tracking and personalized recommendations for each student."],
            default: ["Interesting question. Could you give me more details to help you better?", "I understand. Are you specifically referring to prices, demos or technical information?", "Thank you for your inquiry. To give you the best answer, could you specify if it's for school, university or company?"]
        },
        fr: {
            greeting: ["Bonjour ! Comment puis-je vous aider aujourd'hui ?", "Bonjour ! Je suis l'assistant de BridgeMind. Avez-vous besoin d'informations sur nos programmes éducatifs ?", "Salut ! Comment puis-je vous assister avec BridgeMind Games Education ?"],
            pricing: ["Les prix varient selon le programme et le nombre d'utilisateurs. Je vous recommande de nous contacter pour un devis personnalisé : bridgemindgames@gmail.com", "Nous avons différents plans pour les écoles, universités et entreprises. Pour quel type d'établissement êtes-vous intéressé ?", "Nous pouvons vous envoyer une proposition personnalisée. Pourriez-vous m'indiquer le nombre approximatif d'utilisateurs ?"],
            demo: ["Bien sûr ! Nous pouvons programmer une démonstration personnalisée de 30 minutes. Quel jour et heure vous conviennent le mieux ?", "Parfait. Les démonstrations sont en ligne et montrent tout le système. Préférez-vous cette semaine ou la semaine prochaine ?", "Nous serions ravis de vous montrer le système en action. Êtes-vous intéressé par l'enseignement primaire/secondaire ou la formation en entreprise ?"],
            contact: ["📧 Email : bridgemindgames@gmail.com\n📱 WhatsApp : +34 634 268 663\n⏰ Horaires : Lun-Ven 9h00-18h00", "Vous pouvez nous écrire directement à info@bridgemindgames.com ou nous appeler au +34 634 268 663", "Notre équipe est disponible pour répondre à vos questions. Contact principal : bridgemindgames@gmail.com"],
            program: ["🎯 3 Programmes principaux :\n1. Pour les Écoles (primaire/secondaire)\n2. Pour les Universités\n3. Formation d'Entreprise\nLequel vous intéresse ?", "Le système s'adapte à différents niveaux. Nous avons des programmes spécifiques pour chaque étape éducative et entreprise.", "Il fonctionne pour l'éducation formelle et la formation en entreprise. Cherchez-vous à améliorer les compétences cognitives ou linguistiques ?"],
            ai: ["🧠 Notre IA forme simultanément :\n• Mémoire et attention\n• Compétences linguistiques\n• Pensée critique\n• Capacité de résolution", "Le système utilise des algorithmes d'IA qui s'adaptent au niveau de chaque utilisateur, maximisant l'apprentissage personnalisé.", "L'intelligence artificielle permet un suivi détaillé des progrès et des recommandations personnalisées pour chaque étudiant."],
            default: ["Question intéressante. Pourriez-vous me donner plus de détails pour mieux vous aider ?", "Je comprends. Parlez-vous spécifiquement des prix, des démos ou des informations techniques ?", "Merci pour votre demande. Pour vous donner la meilleure réponse, pourriez-vous préciser si c'est pour une école, une université ou une entreprise ?"]
        },
        de: {
            greeting: ["Hallo! Wie kann ich Ihnen heute helfen?", "Guten Morgen! Ich bin der BridgeMind-Assistent. Benötigen Sie Informationen zu unseren Bildungsprogrammen?", "Hallo! Wie kann ich Ihnen mit BridgeMind Games Education helfen?"],
            pricing: ["Die Preise variieren je nach Programm und Anzahl der Benutzer. Ich empfehle, uns für ein individuelles Angebot zu kontaktieren: bridgemindgames@gmail.com", "Wir haben verschiedene Pläne für Schulen, Universitäten und Unternehmen. Für welche Art von Einrichtung interessieren Sie sich?", "Wir können Ihnen ein personalisiertes Angebot zusenden. Könnten Sie mir die ungefähre Anzahl der Benutzer nennen?"],
            demo: ["Sicher! Wir können eine personalisierte 30-minütige Demo vereinbaren. Welcher Tag und welche Zeit passt Ihnen am besten?", "Perfekt. Demos sind online und zeigen das gesamte System. Bevorzugen Sie diese oder nächste Woche?", "Wir würden Ihnen gerne das System in Aktion zeigen. Interessieren Sie sich für Schulbildung oder Unternehmensschulung?"],
            contact: ["📧 E-Mail: bridgemindgames@gmail.com\n📱 WhatsApp: +34 634 268 663\n⏰ Zeitplan: Mo-Fr 9:00-18:00", "Sie können uns direkt unter info@bridgemindgames.com schreiben oder uns unter +34 634 268 663 anrufen", "Unser Team steht für Ihre Fragen zur Verfügung. Hauptkontakt: bridgemindgames@gmail.com"],
            program: ["🎯 3 Hauptprogramme:\n1. Für Schulen (K-12)\n2. Für Universitäten\n3. Unternehmensschulung\nWelches interessiert Sie?", "Das System passt sich verschiedenen Niveaus an. Wir haben spezielle Programme für jede Bildungsstufe und Unternehmen.", "Es funktioniert sowohl für formale Bildung als auch für Unternehmensschulung. Möchten Sie kognitive oder sprachliche Fähigkeiten verbessern?"],
            ai: ["🧠 Unsere KI trainiert gleichzeitig:\n• Gedächtnis und Aufmerksamkeit\n• Sprachliche Fähigkeiten\n• Kritisches Denken\n• Problemlösungsfähigkeit", "Das System verwendet KI-Algorithmen, die sich an das Niveau jedes Benutzers anpassen und personalisiertes Lernen maximieren.", "Künstliche Intelligenz ermöglicht detaillierte Fortschrittsverfolgung und personalisierte Empfehlungen für jeden Schüler."],
            default: ["Interessante Frage. Könnten Sie mir mehr Details geben, um Ihnen besser helfen zu können?", "Ich verstehe. Beziehen Sie sich speziell auf Preise, Demos oder technische Informationen?", "Vielen Dank für Ihre Anfrage. Um Ihnen die beste Antwort zu geben, könnten Sie angeben, ob es für Schule, Universität oder Unternehmen ist?"]
        }
        // Puedes agregar más idiomas: it, jp, ch, ar
    },
    
    analyzeMessage: function(message, lang = 'es') {
        const lowerMsg = message.toLowerCase();
        const langResponses = this.responses[lang] || this.responses.es;
        
        // Evitar respuestas repetidas
        if (chatbotMemory.wasRecentlyAnswered(message)) {
            if (lang === 'es') return "Ya hablamos sobre esto. ¿Hay algo más en lo que pueda ayudarte?";
            if (lang === 'en') return "We already talked about this. Is there anything else I can help you with?";
            if (lang === 'fr') return "Nous avons déjà parlé de cela. Y a-t-il autre chose avec lequel je peux vous aider?";
            if (lang === 'de') return "Wir haben bereits darüber gesprochen. Gibt es noch etwas, wobei ich Ihnen helfen kann?";
            return "We already discussed this. Can I help you with something else?";
        }
        
        // Análisis de intención
        const greetings = ['hola', 'hello', 'hi', 'bonjour', 'hallo', 'ciao', 'こんにちは', '你好', 'مرحبا'];
        if (greetings.some(greet => lowerMsg.includes(greet))) {
            return this.getRandomResponse(langResponses.greeting);
        }
        
        const priceWords = ['precio', 'price', 'cost', 'coste', 'cuánto', 'how much', 'prix', 'preis'];
        if (priceWords.some(word => lowerMsg.includes(word))) {
            chatbotMemory.lastResponses.push("precios|prices");
            return this.getRandomResponse(langResponses.pricing);
        }
        
        const demoWords = ['demo', 'demostración', 'demonstration', 'probar', 'test', 'try', 'ver', 'see', 'démo'];
        if (demoWords.some(word => lowerMsg.includes(word))) {
            chatbotMemory.lastResponses.push("demo|demonstration");
            return this.getRandomResponse(langResponses.demo);
        }
        
        const contactWords = ['contacto', 'contact', 'email', 'correo', 'teléfono', 'phone', 'whatsapp', 'llamar', 'call'];
        if (contactWords.some(word => lowerMsg.includes(word))) {
            chatbotMemory.lastResponses.push("contacto|contact");
            return this.getRandomResponse(langResponses.contact);
        }
        
        const programWords = ['programa', 'program', 'sistema', 'system', 'funciona', 'works', 'cómo', 'how'];
        if (programWords.some(word => lowerMsg.includes(word))) {
            chatbotMemory.lastResponses.push("programa|program");
            return this.getRandomResponse(langResponses.program);
        }
        
        const aiWords = ['ia', 'ai', 'inteligencia', 'intelligence', 'artificial', 'algoritmo', 'algorithm'];
        if (aiWords.some(word => lowerMsg.includes(word))) {
            chatbotMemory.lastResponses.push("ia|ai");
            return this.getRandomResponse(langResponses.ai);
        }
        
        return this.getRandomResponse(langResponses.default);
    },
    
    getRandomResponse: function(responsesArray) {
        return responsesArray[Math.floor(Math.random() * responsesArray.length)];
    }
};

// Función principal para enviar mensajes
window.sendChatMessage = function() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    const messagesDiv = document.getElementById('chatbot-messages');
    
    if (!message) return;
    
    // Añadir mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = message;
    messagesDiv.appendChild(userMsg);
    
    // Guardar en memoria
    chatbotMemory.addMessage('user', message);
    
    // Limpiar input
    input.value = '';
    
    // Obtener idioma actual
    const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'es';
    
    // Respuesta inteligente con delay
    setTimeout(() => {
        const response = chatbotIntelligence.analyzeMessage(message, currentLang);
        
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        botMsg.textContent = response;
        messagesDiv.appendChild(botMsg);
        
        // Guardar respuesta en memoria
        chatbotMemory.addMessage('bot', response);
        chatbotMemory.lastResponses.push(response.substring(0, 50));
        
        // Limitar respuestas recientes a 5
        if (chatbotMemory.lastResponses.length > 5) {
            chatbotMemory.lastResponses.shift();
        }
        
        // Scroll automático
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
    }, 600 + Math.random() * 400); // Delay aleatorio entre 600-1000ms
};

// Inicialización del chatbot
document.addEventListener('DOMContentLoaded', function() {
    // Configurar Enter para enviar
    const chatbotInput = document.getElementById('chatbot-input');
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.sendChatMessage();
            }
        });
    }
    
    // Configurar botón de enviar
    const sendButton = document.getElementById('send-chat-btn');
    if (sendButton) {
        sendButton.addEventListener('click', window.sendChatMessage);
    }
    
    // Mensaje inicial personalizado por idioma
    setTimeout(() => {
        const initialMsg = document.getElementById('initial-chatbot-msg');
        if (initialMsg) {
            const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'es';
            const responses = chatbotIntelligence.responses[lang] || chatbotIntelligence.responses.es;
            initialMsg.textContent = responses.greeting[0];
        }
    }, 1000);
    
    console.log('Chatbot BridgeMind cargado correctamente');
});
