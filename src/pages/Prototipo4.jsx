import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';
import { ClipLoader } from 'react-spinners';

// ***** Importar la versión legacy *****
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// ***** Asignar la ruta del worker (en carpeta public) *****
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

function Prototipo4() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Estado para el mensaje de "copiado"
  const [copiedMessage, setCopiedMessage] = useState('');

  // Estado para la posición del popup de "copiado"
  const [popup, setPopup] = useState({ visible: false, x: 0, y: 0 });

  // NUEVO ESTADO PARA GUARDAR TEXTO DEL PDF (si lo requieres para análisis interno)
  const [pdfContent, setPdfContent] = useState('');

  // NUEVO ESTADO PARA MENSAJE DE SUBIDA EN UNA CARD
  const [uploadMessage, setUploadMessage] = useState('');

  // Efecto para ocultar automáticamente el mensaje de subida después de 3s
  useEffect(() => {
    if (uploadMessage) {
      const timer = setTimeout(() => {
        setUploadMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadMessage]);

  // Función para extraer el título y el prompt de los ejemplos
  const parseMessage = (message) => {
    const lines = message.split('\n');
    const title = lines[0].trim(); // primera línea como título

    // Buscamos dónde empieza "📝 Prompt:"
    const promptIndex = message.indexOf('📝 Prompt:');
    let prompt = promptIndex >= 0 
      ? message.substring(promptIndex).trim()
      : message.trim();

    return { title, prompt };
  };

  // Cargar historial desde localStorage al inicio
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('chatHistory4')) || [];
    setChatHistory(savedHistory);
  }, []);

  // Guardar historial en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('chatHistory4', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Manejar la carga del archivo PDF
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificamos que sea PDF
    if (file.type !== 'application/pdf') {
      setUploadMessage('Por favor, selecciona un archivo PDF');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);

        // Cargamos el PDF usando pdfjsLib
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = '';

        // Extraer texto página por página
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          extractedText += pageText + '\n';
        }

        // Guardamos el contenido en un estado (para uso interno o como contexto)
        setPdfContent(extractedText);

        setUploadMessage('Contenido del PDF cargado correctamente y listo para usarse.');
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error al procesar el PDF:', error);
      setUploadMessage('Hubo un error al procesar el PDF.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si no hay mensaje del usuario y no hay PDF, no hacemos nada
    if (!userMessage.trim() && !pdfContent.trim()) return;

    setLoading(true);
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    // Preparar los mensajes para el chat
    const messages = [
      {
        role: 'system',
        content:
          'Eres un asistente especializado en redactar documentos formales. Por favor, devuelve todas tus respuestas en formato Markdown.'
      }
    ];

    // Agregar contenido del PDF como contexto en un mensaje del tipo "system"
    // para que el modelo tenga acceso a esta información,
    // sin incluirlo en el mensaje del usuario.
    if (pdfContent.trim()) {
      messages.push({
        role: 'system',
        content: `Información proveniente del PDF:\n${pdfContent}`
      });
    }

    // Agregamos las últimas 4 interacciones del historial
    messages.push(
      ...chatHistory.slice(-4).map((msg) => ({ role: 'user', content: msg.user }))
    );

    // Ahora, el texto que se envía como "user" NO incluye el PDF completo,
    // solo una indicación de que se adjuntó (en caso de existir).
    const finalUserMessage = pdfContent.trim()
      ? `Se adjuntó un PDF. Pregunta/Comentario:\n${userMessage}`
      : userMessage;

    // Agregamos el mensaje del usuario
    messages.push({ role: 'user', content: finalUserMessage });

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
      });

      const responseContent = completion.choices[0]?.message?.content || '';

      // Actualizamos el historial
      const newHistory = [
        ...chatHistory,
        { user: finalUserMessage, bot: responseContent },
      ];
      // Mantener solo las últimas 5 conversaciones
      setChatHistory(newHistory.slice(-5));
      setUserMessage('');

      // ***** OJO: Aquí "borramos" el contenido del PDF *****
      setPdfContent('');

      // Si quieres limpiar el PDF después de cada envío, descomenta:
      // setPdfContent('');
    } catch (error) {
      console.error('Error al llamar a OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cierra el banner superior
  const handleClose = () => {
    setIsVisible(false);
  };

  // Copia el contenido al portapapeles y muestra un mensaje tipo "toast"
  const copyToClipboard = (text, event) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        const { clientX, clientY } = event;
        setPopup({ visible: true, x: clientX, y: clientY - 30 });
        setTimeout(() => setPopup({ visible: false, x: 0, y: 0 }), 2000);
      })
      .catch((err) => {
        console.error('Error al copiar:', err);
      });
  };

  const historyData = [
    {
      date: 'Plantillas para escribir oficios',
      messages: [
        ` Ejemplo de Prompt Estructurado
&quot;Analiza este expediente de inversión en infraestructura y extrae los aspectos clave: objetivos,
presupuesto, riesgos y alineación con el Plan Nacional de Desarrollo. Genera recomendaciones
estratégicas para su aprobación.&quot;

 Estructura del Informe
Sección Descripción
Resumen Ejecutivo Descripción del expediente, objetivos y criterios evaluados.
Viabilidad del Proyecto Cumplimiento de normativas y requisitos.
Análisis Financiero Evaluación del presupuesto y fuentes de financiamiento.
Identificación de Riesgos Posibles obstáculos y medidas de mitigación.
Recomendaciones Finales Sugerencias para mejorar el proyecto o pasos siguientes.`,
        `Memorando Interno para Cambio en Procedimientos Administrativos

Contexto: SEGEPLAN implementará nuevos procedimientos administrativos internos y necesita informar a su personal.
📝 Prompt:
*"Genera un memorando interno para todos los funcionarios de SEGEPLAN informando sobre el cambio en procedimientos administrativos.
Debe incluir:
1. Encabezado oficial con fecha, destinatario y asunto.
2. Introducción breve explicando la razón del cambio.
3. Descripción de los nuevos procedimientos, detallando qué cambia, desde cuándo aplica y qué se espera del personal.
4. Indicaciones adicionales, como dónde encontrar más información o a quién dirigirse para dudas.
5. Cierre con un tono profesional y llamado a la acción para asegurar que todos los funcionarios cumplan con las nuevas directrices."*,`,
        `Informe Ejecutivo sobre Avances de un Proyecto

Contexto: SEGEPLAN debe presentar un informe de avances sobre un proyecto de planificación urbana financiado por cooperación internacional.
📝 Prompt:
*"Escribe un informe ejecutivo sobre los avances del proyecto de planificación urbana que SEGEPLAN está ejecutando con financiamiento de cooperación internacional.
El informe debe incluir:
1. Resumen ejecutivo (1 párrafo) con los avances generales del proyecto.
2. Objetivos del proyecto y su estado actual.
3. Logros alcanzados hasta la fecha, incluyendo cifras y datos relevantes.
4. Desafíos y riesgos identificados, junto con estrategias para mitigarlos.
5. Próximos pasos y acciones previstas para los próximos tres meses. 
Debe mantener un tono técnico, claro y enfocado en resultados medibles."*,`,
        `Solicitud de Presupuesto para un Evento de SEGEPLAN

Contexto: SEGEPLAN necesita solicitar presupuesto para un evento sobre transformación digital en la administración pública.
📝 Prompt:
*"Redacta una solicitud de presupuesto dirigida al departamento financiero de SEGEPLAN para la organización del evento “Transformación Digital en la Administración Pública”.
Debe incluir:
1. Introducción explicando la relevancia del evento para la modernización institucional.
2. Detalle de los gastos estimados, incluyendo alquiler de espacio, materiales, honorarios de expertos, entre otros.
3. Justificación del presupuesto, resaltando el impacto y beneficios esperados.
4. Solicitud de aprobación y pasos siguientes en el proceso administrativo. 
Debe mantener un tono formal y estructurado, con cifras estimadas y referencias a lineamientos institucionales."*,`,
        `Respuesta Oficial a una Consulta Ciudadana sobre Planificación Territorial

Contexto: Un ciudadano ha solicitado información sobre los proyectos de planificación territorial en su municipio. SEGEPLAN debe responder formalmente.
📝 Prompt:
*"Escribe una respuesta oficial a una consulta ciudadana recibida en SEGEPLAN sobre proyectos de planificación territorial en un municipio específico.
Debe incluir:
1. Saludo formal y agradecimiento por la consulta.
2. Explicación del marco general de planificación territorial y el rol de SEGEPLAN en este proceso.
3. Información sobre proyectos activos en el municipio, mencionando objetivos, estado de avance y fuentes de financiamiento.
4. Referencias a documentos oficiales o enlaces donde el ciudadano pueda obtener más información.
5. Cierre cordial, ofreciendo contacto adicional para resolver más dudas. 
Debe mantener un tono accesible pero formal, asegurando que la información sea clara y comprensible para el ciudadano."*`
      ]
    }
  ];

  return (
    <>
      {/* Si hay algo en copiedMessage, muestra un "toast" o aviso */}
      {copiedMessage && (
        <div className="toast-notification">
          {copiedMessage}
        </div>
      )}

      <div className="main-center-content-m-left-2 center-content search-sticky">
        {isVisible && (
          <div className="banner-badge bg_image mb-4 relative">
            <button 
              onClick={handleClose} 
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              aria-label="Close Banner"
            >
              ✕
            </button>
            <p className="dsic my-4">
          🌟 <b>¡Bienvenido al módulo de Ciencia de Datos!</b> 🌟
              <br/>
              Este asistente usa técnicas de <b>ciencia de datos</b> para analizar tendencias en inversión, desarrollo y planificación estratégica.
              <br/><br/>
              📌 <b>¿Cómo funciona?</b>
              <br/>  1️⃣ Carga bases de datos en formato Excel o CSV.
              <br/>  2️⃣ Especifica qué patrones o correlaciones deseas analizar.
              <br/>  3️⃣ El asistente genera gráficos interactivos y modelos predictivos.
              <br/>  4️⃣ Proporciona informes con visualizaciones y tendencias clave.
              <br/>  5️⃣ Descarga los resultados para reportes estratégicos.
              <br/>
              <br/>
              📢 <b>Recuerda:</b> La IA es una herramienta de apoyo. Siempre revisa los resultados y haz los ajustes necesarios antes de su uso oficial.
              <br/>⚠ <b>Supervisión humana recomendada</b> antes de su publicación. 👀
            </p>
          </div>
        )}

        <div className="question_answer__wrapper__chatbot">
          {chatHistory.map((entry, index) => (
            <div key={index} className="single__question__answer">
              <div className="question_user">
                <div className="left_user_info">
                  <img style={{ width: '50px' }} src="/redciudadana.png" alt="avatar" />
                  <div className="question__user">{entry.user}</div>
                </div>
                <div className="edit__icon openuptip" tooltip="Edit It">
                  <i className="fs-20 fa-regular fa-pen-to-square" />
                </div>
              </div>

              <div className="answer__area">
                <div className="thumbnail">
                  <img src="assets/images/avatar/04.png" alt="avatar" />
                </div>
                <div className="answer_main__wrapper">
                  <h4 className="common__title">Respuesta</h4>
                  <div className="disc" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                    <ReactMarkdown>{entry.bot}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div
              className="loading-indicator"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <ClipLoader color="#497696" loading={loading} size={50} />
            </div>
          )}

          {/* FORMULARIO DE ENVÍO */}
          <form onSubmit={handleSubmit} className="search-form">
            {/* Botón para cargar PDF */}
            <input 
              type="file" 
              accept="application/pdf"
              onChange={handleFileUpload} 
              style={{ marginBottom: '1rem' }}
            />

            {/* Mostrar el mensaje de subida dentro de una card amigable */}
            {uploadMessage && (
              <div
                style={{
                  position: 'absolute',
                  background: '#f8f9fa', // Gris claro
                  border: '1px solid #dee2e6', 
                  borderRadius: '8px',
                  padding: '1rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  zIndex: 9999,
                }}
              >
                <strong>{uploadMessage}</strong>
              </div>
            )}

            <textarea
              placeholder="Escribe tu pregunta o petición..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            <button type="submit" disabled={loading}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </form>

          <div className="copyright-area-bottom">
            <p>
              Un proyecto con la asistencia técnica de la <a href="https://redciudadana.org/">Asociación Civil Red Ciudadana</a> - 2025
            </p>
          </div>
        </div>
      </div>

      {/* Popup de "Copiado al portapapeles" */}
      {popup.visible && (
        <div
          className="clipboard-popup"
          style={{
            position: 'absolute',
            top: `${popup.y}px`,
            left: `${popup.x}px`,
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '6px 10px',
            borderRadius: '5px',
            fontSize: '1.3rem',
            pointerEvents: 'none',
            zIndex: 1000,
            transition: 'opacity 0.3s',
            opacity: 1,
          }}
        >
          📋 ¡Copiado al portapapeles!
        </div>
      )}

      {/* Right side bar */}
      <div className="right-side-bar-new-chat-option">
        <div className="chat-history-wrapper">
          {historyData.map((history, index) => (
            <div className="chat-history-area-start" key={index}>
              <h6 className="title">{history.date}</h6>

              {history.messages.map((message, msgIndex) => {
                const { title, prompt } = parseMessage(message);

                return (
                  <div
                    key={msgIndex}
                    className="single-history"
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onClick={(e) => copyToClipboard(prompt, e)}
                  >
                    <p>{title}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(prompt, e);
                      }}
                    >
                      <i className="fa-regular fa-clipboard"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="right-side-open-clouse" id="collups-right">
          <img src="assets/images/icons/01.svg" alt="icons" />
        </div>
      </div>
    </>
  );
}

export default Prototipo4;
