// src/components/UserFilter.tsx

import React from 'react';
import { User } from '../types';

interface UserFilterProps {
  users: User[];
  setSelectedUser: (userId: number | null) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ users, setSelectedUser }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value === '' ? null : Number(event.target.value);
    setSelectedUser(userId);
  };

  return (
    <div className="user-filter" style={{ margin: '20px 0', textAlign: 'right' }}>
      <select
        onChange={handleChange}
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          fontSize: '16px',
        }}
      >
        <option value="">All Authors</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;
