
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

document.documentElement.classList.add('dark')
document.body.classList.add('bg-[#1A1F2C]', 'text-white')

createRoot(document.getElementById("root")!).render(<App />);
