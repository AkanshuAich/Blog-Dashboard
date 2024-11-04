import { useState } from 'react';

interface CommentFormProps {
  onAddComment: (name: string, body: string) => void;
}

const CommentForm = ({ onAddComment }: CommentFormProps) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(name, body);
    setName('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        style={inputStyle}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment here..."
        style={textareaStyle}
      />
      <button type="submit" style={buttonStyle}>
        Add Comment
      </button>
    </form>
  );
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const textareaStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
  resize: 'vertical',
  minHeight: '80px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};


export default CommentForm;
