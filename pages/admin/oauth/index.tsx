import React, { useEffect } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import Router from 'next/router';
import jwt_decode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import { GoogleAuth } from '..';
import { getCookie } from 'cookies-next';
import getAuthenticatedUser from '../../../utils/getAuthenticatedUser';

function AdminOauth() {
  const responseGoogle = (response: CredentialResponse) => {
    const data: GoogleAuth = jwt_decode(response.credential as string);
    if (data.email === 'imarta.untar@gmail.com') {
      //pw: Imartaadmin12
      toast.success(`Authorization success. Logging you in...`);
      const signedJwt = jwt.sign(
        {
          email: data.email
        },
        process.env.NEXT_PUBLIC_TOKEN_SECRET as string
      );
      setCookie('user', signedJwt);
      Router.push(`/admin`);
    } else {
      toast.error(`Accounts are not authorized. Please contact administrator`);
    }
  };

  useEffect(() => {
    if (getAuthenticatedUser(getCookie('user') as string)) {
      Router.push(`/admin`);
    }
  }, []);

  return (
    <div className="left-0 flex justify-center flex-col items-center right-0 max-w-4xl mx-auto absolute top-1/2 transform -translate-y-1/2">
      <div className="text-3xl mb-4">Login with Google</div>
      <GoogleLogin
        onSuccess={responseGoogle}
        onError={() => {
          toast.error(`Failed to login`);
        }}
      />
    </div>
  );
}

export default AdminOauth;
