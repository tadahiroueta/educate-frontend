import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from './context/AuthProvider';

import './index.css';

import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import BlogDashboard from './pages/BlogDashboard';
import BlogSession from './pages/BlogSession';
import FlashcardDashboard from './pages/FlashcardDashboard';
import FlashcardCreate from './pages/FlashcardCreate';
import FlashcardSession from './pages/FlashcardSession';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/blog" element={<BlogDashboard />} />
            <Route path="/blog/:document" element={<BlogSession />} />
            <Route path="/flashcard" element={<FlashcardDashboard />} />
            <Route path="/flashcard/create" element={<FlashcardCreate />} />
            <Route path="/flashcard/:collection" element={<FlashcardSession />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// TODO remove reportWebVitals and strict mode on production