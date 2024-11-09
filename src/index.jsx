import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './src/app.css'
import App from './app.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  