import React, { useState } from 'react';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';

function ChatbotOficio() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Estado para llevar control de qué texto está expandido/colapsado en la sidebar:
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter(i => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setLoading(true);

    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Eres un asistente especializado en redactar documentos formales.
                      Por favor, devuelve todas tus respuestas en formato Markdown.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
      });

      const responseContent = completion.choices[0]?.message?.content || '';
      setChatHistory([...chatHistory, { user: userMessage, bot: responseContent }]);
      setUserMessage('');
    } catch (error) {
      console.error('Error al llamar a OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  const historyData = [
    {
      date: 'Plantillas para escribir oficios',
      messages: [
        `Carta Formal de Solicitud de Cooperación Técnica

Contexto: SEGEPLAN busca establecer una alianza con una universidad para fortalecer la planificación territorial.
📝 Prompt:
*"Redacta una carta formal en nombre de SEGEPLAN dirigida al rector de una universidad, solicitando cooperación técnica en planificación territorial. La carta debe incluir:
1. Saludo formal y presentación de SEGEPLAN como entidad rectora de la planificación en Guatemala.
2. Contexto de la solicitud, explicando la necesidad de fortalecer capacidades técnicas en desarrollo territorial.
3. Propuesta de colaboración, mencionando el intercambio de información, asistencia técnica y posibles convenios.
4. Cierre formal con una invitación a una reunión para discutir detalles y firmar un acuerdo. 
La carta debe tener un tono formal, institucional y ser clara en sus intenciones."*,`,

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

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
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
            <p className="dsic my-4" style={{ color: '#fff' }}>
              <b>🌟 ¡Bienvenido al módulo de Asistentes Virtuales de IA de SEGEPLAN! 🌟</b>
              <br />Esta herramienta ha sido diseñada para facilitar tu trabajo diario, permitiéndote generar documentos, analizar expedientes y evaluar políticas públicas con el apoyo de la inteligencia artificial.
              <br/><br />📌 <b>¿Cómo funciona?</b>
              <br />1. Ingresa la información clave utilizando un prompt bien estructurado.
              <br />2. Revisa los ejemplos de prompts en la columna de la derecha para optimizar tu solicitud. ✅
              <br />3. Revisa y ajusta el resultado generado por la IA antes de utilizarlo.
              <br />4. Modifica y personaliza el texto según las necesidades institucionales. 🔍
              <br /><br />📢 <b>Recuerda:</b> La IA es una herramienta de apoyo. Siempre revisa los resultados y haz los ajustes necesarios antes de su uso oficial.
              <br /><br />⚠ <b>Supervisión humana recomendada</b> antes de su publicación. 
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
                  {/* NUEVO: Ajustamos el tamaño de fuente aquí */}
                  <div className="disc" style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                    <ReactMarkdown>{entry.bot}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && <div className="loading-indicator">Cargando...</div>}

          <form onSubmit={handleSubmit} className="search-form">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
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

      {/* Right side bar */}
      <div className="right-side-bar-new-chat-option">
        <div className="chat-history-wrapper">
          {historyData.map((history, index) => (
            <div className="chat-history-area-start" key={index}>
              <h6 className="title">{history.date}</h6>
              {history.messages.map((message, msgIndex) => {
                const isExpanded = expandedIndexes.includes(msgIndex);
                return (
                  // NUEVO: Hacemos clic en todo el contenedor "single-history" para expandir/colapsar
                  <div
                    className="single-history"
                    key={msgIndex}
                    onClick={() => toggleExpand(msgIndex)} // Al hacer clic en cualquier parte
                    style={{ cursor: 'pointer' }}           // Indicamos que es clickeable
                  >
                    {/* Ajustamos la clase según el estado expandido */}
                    <p className={isExpanded ? 'expanded' : 'collapsed'}>
                      {message}
                    </p>
                    {/* 
                      Mantenemos el botón si lo deseas, 
                      pero hacemos que su clic no se propague para evitar doble toggle 
                    */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Evita que el clic en el botón expanda el recuadro dos veces
                        toggleExpand(msgIndex);
                      }}
                    >
                      {isExpanded ? 'Mostrar menos' : <img src="assets/images/icons/05.svg" alt="icons" />}
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

export default ChatbotOficio;
