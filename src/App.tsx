import { useState } from 'react';
import LandingPage from "./pages/LandingPage";
import FloatingButton from "./components/FloatingButton";
import BookingPage from "./pages/BookingPage";
import './App.css';

function App() {
  const [isBooking, setIsBooking] = useState(false);

  const handleStartBooking = () => setIsBooking(true);
  const handleBackToHome = () => setIsBooking(false);

  return (
    <>
      {isBooking ? (
        <BookingPage />
      ) : (
        <>
          {/* ✅ Ahora TypeScript sabe que onBookNow es válido */}
          <LandingPage onBookNow={handleStartBooking} />
          {/* ✅ Ahora TypeScript sabe que onClick es válido */}
        </>
      )}
    </>
  );
}

export default App;