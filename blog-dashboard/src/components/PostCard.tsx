// src/components/PostCard.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, User } from '../types';
import { useRouter } from 'next/router';

interface PostCardProps {
  post: Post;
  author: User | undefined;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
  const router = useRouter();

  // State to manage current screen width
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  // Effect to update screen width on window resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define responsive styles
  const styles = {
    card: {
      maxWidth: screenWidth > 768 ? '1000px' : '100%',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.5)',
      cursor: 'pointer',
      transition: 'transform 0.3s, box-shadow 0.3s',
      textAlign: 'left',
    } as React.CSSProperties,
    title: {
      fontSize: screenWidth > 768 ? '1.5rem' : '1.2rem',
      color: '#333',
    },
    body: {
      fontSize: screenWidth > 768 ? '1.15rem' : '1rem',
      color: '#333',
    },
    author: {
      fontSize: screenWidth > 768 ? '1rem' : '0.9rem',
      color: '#666',
    },
    button: {
      marginTop: '10px',
      padding: '8px 12px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const handleClick = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      className="post-card"
      onClick={handleClick}
      style={styles.card}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
    >
      <h2 style={styles.title}>{post.title}</h2>
      <p style={styles.body}>{post.body.slice(0, 100)}...</p>
      <p style={styles.author}>
        <strong>Author:</strong> {author ? author.name : 'Unknown'}
      </p>
      <div className="card-actions">
        <Link href={`/post/${post.id}`}>
          <button style={styles.button}>View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
