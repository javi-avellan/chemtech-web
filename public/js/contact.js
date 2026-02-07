// CONFIGURACIÓN (Rellena aquí)
// ¡NO DES ENTER DENTRO DE LAS COMILLAS!
const EMAIL_SERVICE_ID = 'service_rjrxetu';
const EMAIL_TEMPLATE_ID = 'template_o18wiag';
const EMAIL_PUBLIC_KEY = 't0jK7I2LcesS8sTTh';
const GOOGLE_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

// Variable global para el widget
var captchaWidgetId;

// 1. ESTA FUNCIÓN LA LLAMA GOOGLE AUTOMÁTICAMENTE
window.iniciarCaptcha = function() {
    // Si existe el div, dibujamos el captcha ahí
    var contenedor = document.getElementById('caja-del-captcha');
    if (contenedor) {
        // Limpiamos por si acaso
        contenedor.innerHTML = ''; 
        // Dibujamos
        captchaWidgetId = grecaptcha.render('caja-del-captcha', {
          'sitekey' : GOOGLE_SITE_KEY
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS
    emailjs.init(EMAIL_PUBLIC_KEY);

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 2. VERIFICAR CAPTCHA USANDO EL WIDGET ID
            if (typeof captchaWidgetId === 'undefined') {
                return; // Aún no carga
            }
            
            const response = grecaptcha.getResponse(captchaWidgetId);

            if (response.length === 0) {
                Swal.fire({
                    title: 'Verificación requerida',
                    text: 'Por favor, confirma que no eres un robot.',
                    icon: 'warning',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // 3. ENVIAR CORREO
            Swal.fire({
                title: 'Enviando...',
                html: 'Conectando con el servidor.',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });

            emailjs.sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, this)
                .then(function() {
                    Swal.fire({
                        title: '¡Mensaje Enviado!',
                        text: 'Gracias por contactarnos.',
                        icon: 'success',
                        confirmButtonColor: '#005c36'
                    });
                    contactForm.reset();
                    grecaptcha.reset(captchaWidgetId);
                }, function(error) {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema al enviar el correo.',
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                });
        });
    }
});
