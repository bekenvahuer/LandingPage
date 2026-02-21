import { useState } from 'react';
import LandingPage from "./pages/LandingPage";
import FloatingButton from "./components/FloatingButton";
import BookingPage from "./pages/BookingPage";
import './App.css';

function App() {
  const [isBooking, setIsBooking] = useState(false);

  const handleStartBooking = () => setIsBooking(true);
  const handleBackToHome = () => {
    setIsBooking(false);
  };

  return (
    <>
      {isBooking ? (
        <BookingPage onClose={handleBackToHome} />
      ) : (
        <>
          <LandingPage onBookNow={handleStartBooking} />
          <FloatingButton onBookNow={handleStartBooking} />
        </>
      )}
    </>
  );
}

export default App;