"use client";
import React, { useEffect, useState } from 'react';
import UserDetailCard from './user-detail-table';
import Spinner from '@/components/common/spinner';
import apiCall from '@/lib/utils/api-call';
import { routes } from '@/lib/utils/routes';

export default function UserDetails({ userId }: Readonly<{ userId: string }>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await apiCall({
          endpoint: routes.api.getuserdetails(userId),
          method: "GET",
          isProtected: true,
        });
        setData(response.data);
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  return (
    <>
      <UserDetailCard data={data} />
    </>
  );
}
