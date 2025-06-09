import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const path = "https://TangSan003-question-answering-api.hf.space/pred"; // ✅ Đúng URL API

    try {
      const response = await axios.post(path, {
        context,
        question,
      });

      setAnswer(response.data.answer || 'Không tìm thấy câu trả lời.');
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setAnswer('❌ Đã xảy ra lỗi khi gửi yêu cầu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>🧠 Question Answering Demo</h1>

      <label>
        <strong>Context:</strong>
        <br />
        <textarea
          rows={8}
          style={{ width: '100%', marginTop: 8 }}
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </label>

      <br /><br />

      <label>
        <strong>Question:</strong>
        <br />
        <input
          type="text"
          style={{ width: '100%', marginTop: 8 }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </label>

      <br /><br />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 5,
        }}
      >
        {loading ? 'Đang xử lý...' : 'Gửi câu hỏi'}
      </button>

      <br /><br />

      {answer && (
        <div style={{  padding: 15, borderRadius: 5 }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
