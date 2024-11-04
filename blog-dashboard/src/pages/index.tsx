// src/pages/index.tsx

import { useState, useEffect } from 'react';
import { fetchPosts, fetchUsers } from '../services/api';
import PostCard from '../components/PostCard';
import UserFilter from '../components/UserFilter';
import Pagination from '../components/Pagination';
import { Post, User } from '../types';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // You can adjust this number

  useEffect(() => {
    fetchPosts().then(response => setPosts(response.data));
    fetchUsers().then(response => setUsers(response.data));
  }, []);

  useEffect(() => {
    setFilteredPosts(
      selectedUser ? posts.filter(post => post.userId === selectedUser) : posts
    );
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedUser, posts]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <UserFilter users={users} setSelectedUser={setSelectedUser} />
      <div className="post-list">
        {currentPosts.map(post => {
          const author = users.find(user => user.id === post.userId);
          return <PostCard key={post.id} post={post} author={author} />;
        })}
      </div>
      {filteredPosts.length > postsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}