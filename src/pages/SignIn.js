import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import AuthContext from '../context/AuthProvider';

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import { Button, InputBox } from '../components';

export default function SignIn() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthentication = async () => {
    try {
      axios.post("https://390t17n7-5000.usw2.devtunnels.ms/api/login", { email, password })
        .then((res) => {
          setAuth(res.data);
        })
        .catch((e) => {
          console.error("Error occured:", e);
        });
      navigate("/");
    } catch (e) {
      console.error("Error occured:", e);
    }
  }

  return (
    <div className="grow w-full h-lvh flex bg-educate-blue-100">
      <img src="note-stock.png" alt="background" className="w-3/5 h-full object-cover" />
      {/* content */}
      <div className="w-2/5 min-h-full flex flex-col items-center justify-center">
        {/* inner container */}
        <div className="w-96 flex flex-col items-center justify-center gap-8">
          <img src="logo.png" alt="logo" className="w-20 mb-2" />
          {/* header */}
          <div className="w-full flex items-center gap-6">
            <hr className="h-0.5 grow bg-black" />
            <h3 className="font-plain text-xl font-semibold">Login your E-ducate account</h3>
            <hr className="h-0.5 grow bg-black" />
          </div>
          {/* form */}
          <div className="w-full flex flex-col gap-3">
            <InputBox>
              <EnvelopeIcon className="w-6 text-educate-blue-700" />
              <input type="email" placeholder="Email" value={ email } onChange={ (e) => { setEmail(e.target.value); }} className="grow" />
            </InputBox>
            <InputBox>
              <LockClosedIcon className="w-6 text-educate-blue-700" />
              <input type="password" placeholder="Password" value={ password } onChange={ (e) => { setPassword(e.target.value); }} className="grow" />
            </InputBox>
          </div>
          <Button fill={ email && password } onClick={ handleAuthentication }>Sign in</Button>
          {/* log in options */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-plain text-sm">Already have an account? Sign in</p>
            <p className="font-plain text-sm">Or loging with</p>
            {/* social medias */}
            <div className="flex items-center gap-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-educate-blue-700">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-educate-blue-700">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-educate-blue-700">
                <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}