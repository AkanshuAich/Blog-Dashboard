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
    <>
      <div className="post-card" onClick={handleClick}>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-body">{post.body.slice(0, 100)}...</p>
        <p className="post-author">
          <strong>Author:</strong> {author ? author.name : 'Unknown'}
        </p>
        <div className="card-actions">
          <Link href={`/post/${post.id}`}>
            <button className="view-details-button">View Details</button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .post-card {
          max-width: 1000px;
          margin: 20px auto;
          padding: 30px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: left;
        }

        .post-card:hover {
          transform: scale(1.02);
        }

        .post-title {
          font-size: 1.5rem;
          color: #333;
        }

        .post-body {
          font-size: 1.15rem;
          color: #333;
        }

        .post-author {
          font-size: 1rem;
          color: #666;
        }

        .view-details-button {
          margin-top: 10px;
          padding: 8px 12px;
          background-color: green;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-details-button:hover {
          background-color: darkgreen;
        }

        /* Media queries for responsiveness */
        @media (max-width: 768px) {
          .post-card {
            padding: 20px;
            max-width: 90%;
          }

          .post-title {
            font-size: 1.3rem;
          }

          .post-body {
            font-size: 1rem;
          }

          .post-author {
            font-size: 0.9rem;
          }

          .view-details-button {
            padding: 6px 10px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .post-card {
            padding: 10px;
            max-width: 100%;
          }

          .post-title {
            font-size: 1.1rem;
          }

          .post-body {
            font-size: 0.9rem;
          }

          .post-author {
            font-size: 0.8rem;
          }

          .view-details-button {
            padding: 5px 8px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </>
  );
};

export default PostCard;
