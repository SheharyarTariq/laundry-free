import React from 'react';
import BackArrow from '@/components/common/arrowback';

interface UserDetail {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
  address: AddressProps;
}

interface AddressProps {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export default function UserDetailCard({ data }: Readonly<{ data: UserDetail }>) {
  const formatAddress = (address: AddressProps) => {
    if (!address || typeof address !== 'object') return 'No address provided';
    const addressParts: string[] = [];
    if (address.street) addressParts.push(address.street);
    if (address.city) addressParts.push(address.city);
    if (address.state) addressParts.push(address.state);
    if (address.zipCode) addressParts.push(address.zipCode);
    if (address.country) addressParts.push(address.country);
    return addressParts.length > 0 ? addressParts.join(', ') : 'No address provided';
  };

  const memberSince = new Date(data.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <BackArrow/>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>
      </div>

      <div className="rounded-xl border border-icy-mist shadow-custom-subtle bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Full Name</div>
            <div className="text-sm font-medium">{data.fullName}</div>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Email</div>
            <div className="text-sm font-medium break-all">{data.email}</div>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Phone</div>
            <div className="text-sm mt-2 font-medium">{data.phone || 'Not provided'}</div>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Email Verification</div>
            <div>
              <span
                className={
                  data.emailVerifiedAt
                    ? 'inline-flex mt-2 px-2 py-1 rounded-xl text-xs font-medium bg-green-100 text-green-700'
                    : 'inline-flex mt-2 px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700'
                }
              >
                {data.emailVerifiedAt ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>
          <div className="p-4 md:col-span-2 border-b md:border-b-0 border-icy-mist">
            <div className="text-xs text-gray-500">Address</div>
            <div className="text-sm font-medium">{formatAddress(data.address)}</div>
          </div>
          <div className="p-4 border-b md:border-b-0 md:border-r border-icy-mist">
            <div className="text-xs text-gray-500">Member Since</div>
            <div className="text-sm font-medium">{memberSince}</div>
          </div>
          <div className="p-4">
            <div className="text-xs text-gray-500">User ID</div>
            <div className="text-sm font-medium break-all">{data.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
