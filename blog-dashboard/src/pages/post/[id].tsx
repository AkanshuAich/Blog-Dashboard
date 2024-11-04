// src/pages/post/[id].tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchPosts, fetchUsers, fetchComments, addComment } from '../../services/api';
import CommentForm from '../../components/CommentForm';
import { Post, User, Comment } from '../../types';

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPosts().then(response => {
        const foundPost = response.data.find((p: Post) => p.id === Number(id));
        setPost(foundPost);
        if (foundPost) {
          fetchUsers().then(usersResponse => {
            const foundUser = usersResponse.data.find((u: User) => u.id === foundPost.userId);
            setAuthor(foundUser);
          });
        }
      });
      fetchComments(Number(id)).then(response => setComments(response.data));
    }
  }, [id]);

  const handleAddComment = async (name: string, body: string) => {
    const response = await addComment(Number(id), name, body);
    setComments([response.data, ...comments]);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return post ? (
    <div className="post-detail" style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1 className="post-detail-title" style={{ fontSize: '2rem', color: '#333' }}>{post.title}</h1>
      <p className="post-detail-body" style={{ marginTop: '15px', fontSize: '1.1rem', lineHeight: '1.6' }}>{post.body}</p>
      <p className="post-detail-author" style={{ color: '#555', marginTop: '20px' }}>
        <strong>Author:</strong> {author ? author.name : 'Unknown'}
      </p>
      <h2 style={{ marginTop: '30px', fontSize: '1.5rem' }}>Comments</h2>
      <CommentForm onAddComment={handleAddComment} />
      {comments.length > 0 ? comments.map(comment => (
        <div
          key={comment.id}
          className="comment"
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>{comment.name}</p>
          <p>{comment.body}</p>
          <button
            onClick={() => handleDeleteComment(comment.id)}
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: '#e63946',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      )) : <p>No comments yet. Be the first to comment!</p>}
    </div>
  ) : <p>Loading...</p>;
};

export default PostDetail;
