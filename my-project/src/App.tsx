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
import { SpeedInsights } from "@vercel/speed-insights/next"

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #1e3a8a 0%, #0f766e 100%)',
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
        <SpeedInsights />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}