import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import FloatingButton from "./components/FloatingButton";
import BookingPage from "./pages/BookingPage";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal - Landing Page */}
        <Route 
          path="/" 
          element={
            <>
              <LandingPage />
              <FloatingButton />
            </>
          } 
        />
        
        {/* Ruta de booking - Página de agendamiento */}
        <Route 
          path="/booking" 
          element={<BookingPage />} 
        />
        
        {/* Ruta alternativa (opcional) */}
        <Route 
          path="/agendar" 
          element={<BookingPage />} 
        />
      </Routes>
    </Router>
  );
}

export default App;