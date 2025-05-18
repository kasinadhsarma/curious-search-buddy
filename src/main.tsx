
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.classList.toggle("dark", savedTheme === "dark");

// Add appropriate bg and text color classes based on theme
if (savedTheme === "dark") {
  document.body.classList.add('bg-[#1A1F2C]', 'text-white');
  document.body.classList.remove('bg-white', 'text-black');
} else {
  document.body.classList.add('bg-white', 'text-black');
  document.body.classList.remove('bg-[#1A1F2C]', 'text-white');
}

createRoot(document.getElementById("root")!).render(<App />);
