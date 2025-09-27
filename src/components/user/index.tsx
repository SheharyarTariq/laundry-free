"use client"
import React from 'react';
import UserSearch from './user-search';
import UserTable from './user-table';

interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
  address: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserProps {
  data: {
    member: User[];
    totalItems: number;
  };
  currentPage: string;
}

export default function User({ data, currentPage }: Readonly<UserProps>) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Users</h1>
        <UserSearch />
      </div>
      <UserTable 
        data={data.member || []} 
        totalItems={data.totalItems || 0} 
        loading={false} 
        currentPage={currentPage} 
      />
    </div>
  );
}