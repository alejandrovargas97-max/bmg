function showContactForm(type) {
    const labels = {
        es: { name: 'Nombre', email: 'Email', phone: 'Teléfono', message: 'Mensaje', submit: 'Enviar' },
        en: { name: 'Name', email: 'Email', phone: 'Phone', message: 'Message', submit: 'Send' },
        fr: { name: 'Nom', email: 'Email', phone: 'Téléphone', message: 'Message', submit: 'Envoyer' },
        de: { name: 'Name', email: 'Email', phone: 'Telefon', message: 'Nachricht', submit: 'Senden' },
        it: { name: 'Nome', email: 'Email', phone: 'Telefono', message: 'Messaggio', submit: 'Invia' },
        ja: { name: '名前', email: 'メール', phone: '電話', message: 'メッセージ', submit: '送信' },
        zh: { name: '姓名', email: '邮箱', phone: '电话', message: '留言', submit: '发送' },
        ar: { name: 'الاسم', email: 'البريد', phone: 'الهاتف', message: 'الرسالة', submit: 'إرسال' }
    };
    
    const l = labels[selectedLang] || labels.es;
    
    const div = document.createElement('div');
    div.className = 'bmg-msg bot';
    div.innerHTML = `
        <div class="bmg-form">
            <input type="text" id="bmg-form-name" placeholder="${l.name}">
            <input type="email" id="bmg-form-email" placeholder="${l.email}">
            <input type="tel" id="bmg-form-phone" placeholder="${l.phone}">
            <textarea id="bmg-form-msg" placeholder="${l.message}" rows="3"></textarea>
            <button onclick="window.bmgSubmitForm('${type}')">${l.submit}</button>
        </div>
    `;
    
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

window.bmgSubmitForm = async function(type) {
    const name = document.getElementById('bmg-form-name').value;
    const email = document.getElementById('bmg-form-email').value;
    const phone = document.getElementById('bmg-form-phone').value;
    const message = document.getElementById('bmg-form-msg').value;
    
    if (!name || !email) {
        alert('Por favor completa nombre y email / Please fill name and email');
        return;
    }
    
    await sendNotification(type, { name, email, phone, message });
    
    const confirmations = {
        es: '✅ ¡Perfecto! Te contactaremos pronto.\n\n📱 WhatsApp: +34 634 268 663\n💬 WeChat: +34 634 268 663\n📲 Telegram: +34 634 268 663',
        en: '✅ Perfect! We\'ll contact you soon.\n\n📱 WhatsApp: +34 634 268 663\n💬 WeChat: +34 634 268 663\n📲 Telegram: +34 634 268 663'
    };
    
    add(confirmations[selectedLang] || confirmations.es, 'bot');
};

function showTyping() {
    const div = document.createElement('div');
    div.className = 'bmg-msg bot';
    div.id = 'bmg-typing';
    const typing = document.createElement('div');
    typing.className = 'bmg-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    div.appendChild(typing);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('bmg-typing');
    if (t) t.remove();
}

async function sendMsg() {
    const msg = inp.value.trim();
    if (!msg || processing || !selectedLang) return;
    
    processing = true;
    send.disabled = true;
    
    add(msg, 'user');
    inp.value = '';
    
    chatHistory.push({ role: 'user', parts: [{ text: msg }] });
    saveState();
    
    showTyping();
    
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: BUSINESS_INFO[selectedLang] }] },
                    ...chatHistory
                ],
                generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
            })
        });
        
        const data = await res.json();
        removeTyping();
        
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            const reply = data.candidates[0].content.parts[0].text;
            add(reply, 'bot');
            chatHistory.push({ role: 'model', parts: [{ text: reply }] });
            saveState();
        } else {
            throw new Error('Invalid response');
        }
    } catch (err) {
        removeTyping();
        console.error(err);
        add('Error. Contact: +34 634 268 663', 'bot');
    }
    
    processing = false;
    send.disabled = false;
    inp.focus();
}

// =============================================
// EVENTOS
// =============================================

btn.onclick = toggle;
close.onclick = toggle;
send.onclick = sendMsg;
inp.onkeypress = (e) => {
    if (e.key === 'Enter') sendMsg();
};

// =============================================
// INICIALIZACIÓN
// =============================================

initUser();
console.log('✅ BridgeMind Chatbot cargado');
console.log('User ID:', userId);
