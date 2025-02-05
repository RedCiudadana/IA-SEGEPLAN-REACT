import React, { useState } from 'react';
import OpenAI from 'openai';

function ChatbotOficio() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

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
        messages: [{ role: 'user', content: userMessage }],
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

  return (
    <div className="question_answer__wrapper__chatbot">
      {chatHistory.map((entry, index) => (
        <div key={index} className="single__question__answer">
          <div className="question_user">
            <div className="left_user_info">
              <img src="assets/images/avatar/03.png" alt="avatar" />
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
              <h4 className="common__title">Respuesta del ChatGPT</h4>
              <p className="disc">{entry.bot}</p>
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
          <a href="#">Reactheme©</a> 2024. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default ChatbotOficio;