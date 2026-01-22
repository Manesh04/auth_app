import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Services from './pages/Services.tsx';
import About from './pages/About.tsx';
import RootLayout from './pages/RootLayout.tsx';
import Userlayout from './pages/users/Userlayout.tsx';
import Userhome from './pages/users/Userhome.tsx';
import Userprofile from './pages/users/Userprofile.tsx';
import OAuthSuccess from './pages/OAuthSuccess.tsx';
import OAuthFailure from './pages/OAuthFailure.tsx';


createRoot(document.getElementById('root')!).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
      <Route index element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} /> 
      <Route path="/dashboard" element={<Userlayout />} >
       <Route index element={<Userhome />} />
       <Route path="profile" element={<Userprofile />} />
       {/* ....... */}
      </Route>
      <Route path="/oauth/success" element={<OAuthSuccess />} />
      <Route path="oauth/failure" element={<OAuthSuccess  />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
