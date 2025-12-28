// chatbot.js - BridgeMindGames BGM
(function() {
    const bgmBotData = {
        es: { msg: "¡Hola! Bienvenido a BridgeMindGames. ¿Cómo podemos ayudarte?", btn: "WhatsApp Directo", link: "https://wa.me/34634268663", extra: "Email Support" },
        en: { msg: "Hello! Welcome to BGM. How can we help you today?", btn: "Telegram Support", link: "https://t.me/TuUsuario", extra: "Email Support" },
        zh: { msg: "您好！欢迎来到 BGM。建议通过 WeChat 联系我们。", btn: "WeChat ID: BGM_Global", link: "#", extra: "Email" },
        ar: { msg: "مرحبًا بك في BridgeMindGames. كيف يمكننا مساعدتك؟", btn: "الدعم عبر تلغرام", link: "https://t.me/TuUsuario", extra: "Email" },
        it: { msg: "Benvenuti in BGM! Come possiamo aiutarvi?", btn: "Supporto Telegram", link: "https://t.me/TuUsuario", extra: "Email" },
        de: { msg: "Willkommen bei BGM! Wie können wir Ihnen helfen?", btn: "Telegram Support", link: "https://t.me/TuUsuario", extra: "E-Mail" },
        fr: { msg: "Bonjour ! Bienvenue chez BGM. Comment pouvons-nous vous aider ?", btn: "Support Telegram", link: "https://t.me/TuUsuario", extra: "Email" },
        jp: { msg: "BridgeMind Games へようこそ！お問い合わせはこちらから。", btn: "メールを送る", link: "mailto:bridgemindgames@gmail.com", extra: "" }
    };

    window.toggleBGMChat = function() {
        const container = document.getElementById('chatbot-container');
        if (!container) return;

        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'block';
            const lang = window.currentBGMLang || 'es';
            const t = bgmBotData[lang] || bgmBotData['en'];

            container.innerHTML = `
                <div style="background: white; border-radius: 10px; padding: 15px; color: #333; box-shadow: 0 4px 15px rgba(0,0,0,0.2); text-align: left; font-family: Arial, sans-serif;">
                    <p style="margin: 0 0 10px 0;"><strong>BGM Assistant:</strong><br>${t.msg}</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <a href="${t.link}" target="_blank" style="background: #28a745; color: white; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-weight: bold; font-size: 14px;">${t.btn}</a>
                        ${t.extra ? `<a href="mailto:bridgemindgames@gmail.com" style="background: #007bff; color: white; padding: 10px; border-radius: 5px; text-decoration: none; text-align: center; font-size: 14px;">${t.extra}</a>` : ''}
                    </div>
                </div>`;
        } else {
            container.style.display = 'none';
        }
    };
})();
