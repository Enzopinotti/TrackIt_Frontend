// src/pages/Requerimientos/CommentsSection.js

import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

function CommentsSection({ requirement, user }) {
  const [showChatInput, setShowChatInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [comments, setComments] = useState(requirement?.comments || []);
  const [newComment, setNewComment] = useState('');
  const emojiPickerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Actualizar los comentarios si cambia el prop 'requirement'
    setComments(requirement?.comments || []);
  }, [requirement]);

  // Agregar un mensaje preguardado para pruebas si no hay comentarios
  useEffect(() => {
    if (comments.length === 0) {
      const preSavedComment = {
        id: 1,
        user: 'Usuario Externo',
        message: 'Este es un mensaje preguardado para probar la funcionalidad.',
        date: '2023-09-30',
        time: '09:00',
        isExternal: true,
      };
      setComments([preSavedComment]);
    }
  }, [comments]);

  // Manejar clic fuera del emoji picker para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onEmojiClick = (emojiData, event) => {
    setNewComment((prev) => prev + emojiData.emoji);
  };

  const handleSendComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const comentarioNuevo = {
        id: comments.length + 1,
        user: user?.name || 'Usuario',
        message: newComment,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        isExternal: user?.role === 'External', // Asumiendo que el rol 'External' identifica a usuarios externos
      };

      // Simulación de envío al backend
      // Descomenta y ajusta según tu backend
      /*
      const response = await fetch(`/api/requerimientos/${requirement.id}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: newComment }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }

      const comentarioNuevo = await response.json();
      */

      // Actualizar los comentarios en el estado
      setComments((prevComments) => [comentarioNuevo, ...prevComments]);
      setNewComment('');
      setShowChatInput(false);
      setShowEmojiPicker(false);
    } catch (error) {
      console.error('Error:', error);
      // Manejar errores, quizás mostrar un mensaje al usuario
    }
  };

  const toggleChatInput = () => {
    setShowChatInput((prev) => !prev);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const renderComments = () => {
    let lastCommentDate = null;

    return comments.map((comment) => {
      const commentDate = comment.date;
      const showDateSeparator = commentDate !== lastCommentDate;

      lastCommentDate = commentDate;

      return (
        <React.Fragment key={comment.id}>
          {showDateSeparator && (
            <div className="date-separator">
              <hr />
              <span>{commentDate}</span>
              <hr />
            </div>
          )}
          <div className={`comment ${comment.isExternal ? 'external' : 'internal'}`}>
            <div className="comment-header">
              <strong>{comment.user}</strong> - {comment.time}
            </div>
            <div className="comment-body">{comment.message}</div>
          </div>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="comments-section">
      {/* Campo de Entrada de Nuevo Comentario */}
      

      {/* Top-Bar de Mensajes */}
      <div className="messages-top-bar">
        <button className="add-file-button" onClick={toggleChatInput}>
          <img src="/assets/icons/attach-file.png" alt="Añadir Archivos" />
        </button>
        <button className="send-comment-button" onClick={toggleChatInput}>
          Enviar Comentario
        </button>
      </div>
      {showChatInput && (
        <div className="add-comment" ref={inputRef}>
          <textarea
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <div className="input-actions">
            <button className="emoji-button" onClick={toggleEmojiPicker}>
              <img src="/assets/icons/emoji.png" alt="Emojis" />
            </button>
            <button className="send-icon-button" onClick={handleSendComment}>
              <img src="/assets/icons/send-message.png" alt="Enviar" />
            </button>
          </div>
          {/* Selector de Emojis */}
          {showEmojiPicker && (
            <div className="emoji-picker" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      )}
      {/* Cuerpo de Comentarios */}
      <div className="comments-body">
        <div className="comments-list">{renderComments()}</div>
      </div>
    </div>
  );
}

export default CommentsSection;
