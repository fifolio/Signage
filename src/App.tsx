import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// SERVICES
import { checkSession } from './backend/services/auth/checkSession';

// STORES
import useIsUserLoggedInState from './stores/backend/useIsLoggedinState';

// PAGES
import { Dashboard } from './pages';   
import { Auth } from './pages';   

// UI
import { LoadingState } from './components';
import { Toaster } from "@/components/ui/toaster"


export default function App() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useIsUserLoggedInState();
  const [sessionChecked, setSessionChecked] = useState(false);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  // Check if there's an active session by calling the checkSession() and check it's returns
  async function sessionCheck() {
    try {
      const response = await checkSession();
      setIsUserLoggedIn(response);
    } catch (error) {
      console.error('Error checking session:', error);
      setIsUserLoggedIn(false);
    } finally {
      setSessionChecked(true);
    }
  }

  useEffect(() => {
    sessionCheck()
  }, []);

  // Play audio when user logs in
  useEffect(() => {
    if (isUserLoggedIn && audioRef.current) {
      audioRef.current.play();
    }
  }, [isUserLoggedIn]);

  // loading indicator
  if (!sessionChecked) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingState setWidth="50" />
        {/* <p className="text-gray-500">Please wait..</p> */}
      </div>
    );
  }

  return (
    <BrowserRouter>
    <Toaster />

      <Routes>
        <Route index path="/" element={isUserLoggedIn ? <Dashboard /> : <Auth />} />
      </Routes>

      {/* Login Sound Effect */}
      <audio ref={audioRef} loop={false} src="assets/loginSoundEffect.mp3"></audio>
    </BrowserRouter>
  );
}