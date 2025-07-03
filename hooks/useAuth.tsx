"use client";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organization?: {
    _id: string;
    name: string;
    logo?: string;
  };
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const email = Cookies.get('email');
    const firstName = Cookies.get('firstName');
    const lastName = Cookies.get('lastName');
    const role = Cookies.get('role');
    const organizationId = Cookies.get('organizationId');
    const logo = Cookies.get('logo');

    if (accessToken && email && firstName && lastName && role) {
      setUser({
        email,
        firstName,
        lastName,
        role,
        organization: organizationId ? {
          _id: organizationId,
          name: 'Organization', // You might want to fetch this from API
          logo: logo || undefined,
        } : undefined,
      });
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('email');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('role');
    Cookies.remove('organizationId');
    Cookies.remove('logo');
    setUser(null);
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
  };
};

export default useAuth;