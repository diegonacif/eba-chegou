import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Result } from './pages/Result/Result';
import { Auth } from './pages/Auth/Auth';
import { AuthGoogleProvider } from './contexts/AuthGoogleProvider';
import { AuthEmailProvider } from './contexts/AuthEmailProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthEmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/result/:status" element={<Result />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </AuthEmailProvider>
  </React.StrictMode>,
)
