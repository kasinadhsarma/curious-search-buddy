
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.classList.add(savedTheme === "light" ? "" : "dark");

if (savedTheme === "dark") {
  document.body.classList.add('bg-[#1A1F2C]', 'text-white');
} else {
  document.body.classList.add('bg-white', 'text-black');
}

createRoot(document.getElementById("root")!).render(<App />);
