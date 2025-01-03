import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// SERVICES
import { checkSession } from './backend/services/auth/checkSession';

// STORES
import useIsUserLoggedInState from './stores/backend/useIsLoggedinState';
import { useLoadingScreen } from './stores';

// PAGES
import { CTA, Dashboard } from './pages';
import { Auth } from './pages';

// UI
import { LoadingState } from './components';
import { Toaster } from "@/components/ui/toaster"


export default function App() {


  // check and set if user is logged in
  const { isUserLoggedIn, setIsUserLoggedIn } = useIsUserLoggedInState();

  // Loading screen
  const { loadingScreen, setLoadingScreen } = useLoadingScreen();

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio when user logs in
  useEffect(() => {
    if (isUserLoggedIn && audioRef.current) {
      audioRef.current.play();
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    const initializeSession = async () => {
      setLoadingScreen(true);
      try {
        const res = await checkSession();
        setIsUserLoggedIn(res === true && true);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsUserLoggedIn(false);
      } finally {
        setLoadingScreen(false);
      }
    };

    initializeSession();
  }, []);


  // loading indicator
  if (loadingScreen) {
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
        {isUserLoggedIn ? (
          <>
            <Route index path="/" element={<CTA />} />
            <Route path="/:fileId" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route index path="/" element={<Auth />} />
            <Route path="*" element={<Auth />} />
          </>
        )}

      </Routes>

      {/* Login Sound Effect */}
      <audio ref={audioRef} loop={false} src="assets/loginSoundEffect.mp3"></audio>
    </BrowserRouter>
  );
}