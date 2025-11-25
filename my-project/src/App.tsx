import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ImageGallery from './components/ImageGallery';
import VideoSection from './components/VideoSection';
import RoomsAmenities from './components/RoomsAmenities';
import ExperiencesSection from './components/ExperiencesSection';
import VirtualTour from './components/VirtualTour';
import LocationSection from './components/LocationSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactBooking from './components/ContactBooking';
import Footer from './components/Footer';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scrolling setup
  useEffect(() => {
    if (!isLoading) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-cyan-50">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #8b7355 0%, #7a9ca5 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
          },
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ImageGallery />
        <VideoSection />
        <RoomsAmenities />
        <ExperiencesSection />
        <VirtualTour />
        <LocationSection />
        <TestimonialsSection />
        <ContactBooking />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}