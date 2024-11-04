// src/components/PostCard.tsx


import React from 'react';
import Link from 'next/link';
import { Post, User } from '../types';
import { useRouter } from 'next/router';

interface PostCardProps {
  post: Post;
  author: User | undefined;
}

const PostCard: React.FC<PostCardProps> = ({ post, author }) => {
    const router = useRouter();

    const handleClick = () => {
      router.push(`/post/${post.id}`);
    };
  return (
    
      <div
        className="post-card"
        onClick={handleClick}

        style={{
          maxWidth: '1000px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.5)',
          cursor: 'pointer',
           textDecoration: 'none',
          transition: 'transform 0.3s, box-shadow 0.3s',
          textAlign: 'left'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
      >
        <h2 style={{ fontSize: '1.5rem', color: '#333' }}>{post.title}</h2>
        <p className="post-body" style={{ fontSize: '1.15rem', color: '#333' }}>{post.body.slice(0, 100)}...</p>
        <p className="post-author" style={{textDecoration: 'none'}}>
          <strong>Author:</strong> {author ? author.name : 'Unknown'}
        </p>
        <div className="card-actions">
          <Link href={`/post/${post.id}`}>
            <button className="view-details-button" style={{
              marginTop: '10px',
              padding: '8px 12px',
              backgroundColor: 'green',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>View Details</button>
          </Link>
        </div>
      </div>
   
  );
};

export default PostCard;


