function mostrarRespuestaBot() {
    const cuerpo = document.getElementById('cuerpo-chat');
    const lang = localStorage.getItem('idioma') || 'es';
    const t = datosBot[lang] || datosBot['es'];

    cuerpo.innerHTML = `
        <div style="background:rgba(255,255,255,0.92); height:100%; width:100%; position:absolute; top:0; left:0; z-index:0;"></div>
        <div style="position:relative; z-index:1;">
            <div style="background:#f1f1f1; padding:12px; border-radius:10px; font-size:14px; margin-bottom:15px; border:1px solid #e0e0e0; color:#333; line-height:1.4;">
                ${t.respuesta}
            </div>
            <button onclick="mostrarInicioBot()" style="margin-top:10px; background:#e0e0e0; border:none; padding:10px 14px; border-radius:8px; cursor:pointer; font-size:13px;">
                ${t.volver}
            </button>
        </div>
    `;
}
