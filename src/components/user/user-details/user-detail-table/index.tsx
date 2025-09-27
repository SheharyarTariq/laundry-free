import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Divider } from '@mui/material';
import { Person, Email, Phone, LocationOn, CalendarToday, VerifiedUser } from '@mui/icons-material';

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
  const formatAddress = (address:AddressProps) => {
    if (!address || typeof address !== 'object') return 'No address provided';
    
    const addressParts = [];
    if (address.street) addressParts.push(address.street);
    if (address.city) addressParts.push(address.city);
    if (address.state) addressParts.push(address.state);
    if (address.zipCode) addressParts.push(address.zipCode);
    if (address.country) addressParts.push(address.country);
    
    return addressParts.length > 0 ? addressParts.join(', ') : 'No address provided';
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#212636', mb: 3 }}>
        User Details
      </Typography>

      <Card 
        elevation={0}
        sx={{ 
          borderRadius: 3, 
          border: '1px solid #DCDFE4', 
          boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)',
          backgroundColor: 'white',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              borderRadius: '50%', 
              backgroundColor: '#f0f0f0', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mr: 3
            }}>
              <Person sx={{ fontSize: 40, color: '#666' }} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#212636', mb: 1 }}>
                {data.fullName}
              </Typography>
              <Chip
                icon={<VerifiedUser />}
                label={data.emailVerifiedAt ? 'Email Verified' : 'Email Not Verified'}
                color={data.emailVerifiedAt ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Contact Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212636', mb: 2 }}>
              Contact Information
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ color: '#666', mr: 2, fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {data.email}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ color: '#666', mr: 2, fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {data.phone || 'Not provided'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOn sx={{ color: '#666', mr: 2, fontSize: 20, mt: 0.5 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatAddress(data.address)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Account Information */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#212636', mb: 2 }}>
              Account Information
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ color: '#666', mr: 2, fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(data.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ color: '#666', mr: 2, fontSize: 20 }} />
              <Box>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.875rem' }}>
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {data.id}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
