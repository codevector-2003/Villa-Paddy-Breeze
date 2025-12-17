import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCw, Eye, Home, Bed, Bath, Waves, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TourLocation {
  id: string;
  name: string;
  description: string;
  image: string;
  panoramic: string;
  icon: React.ElementType;
  hotspots?: Array<{
    x: number;
    y: number;
    targetId: string;
    label: string;
  }>;
}

const tourLocations: TourLocation[] = [
  {
    id: 'exterior',
    name: 'Villa Exterior',
    description: 'Breathtaking panoramic view of VillPaddy Breeze surrounded by lush paddy fields and ocean views',
    image: 'paddyview.jpg',
    panoramic: 'paddyview.jpg',
    icon: Home,
    hotspots: [
      { x: 30, y: 60, targetId: 'living', label: 'Enter Living Room' },
      { x: 70, y: 45, targetId: 'bedroom', label: 'Master Bedroom' }
    ]
  },
  {
    id: 'living',
    name: 'Living Room',
    description: 'Spacious living area with modern furnishings and stunning ocean views',
    image: 'livingroom.jpg',
    panoramic: 'livingroom.jpg',
    icon: Waves,
    hotspots: [
      { x: 20, y: 70, targetId: 'bedroom', label: 'Bedroom' },
      { x: 80, y: 50, targetId: 'bathroom', label: 'Bathroom' },
      { x: 50, y: 80, targetId: 'exterior', label: 'Go Outside' }
    ]
  },
  {
    id: 'bedroom',
    name: 'Kitchen',
    description: 'Luxurious master bedroom with private balcony and ocean breeze',
    image: 'kitchen.jpg',
    panoramic: 'kitchen.jpg',
    icon: Bed,
    hotspots: [
      { x: 60, y: 75, targetId: 'bathroom', label: 'En-suite Bathroom' },
      { x: 40, y: 85, targetId: 'living', label: 'Living Room' },
      { x: 80, y: 30, targetId: 'exterior', label: 'Balcony View' }
    ]
  },
  {
    id: 'bathroom',
    name: 'Spa Bathroom',
    description: 'Luxurious spa-style bathroom with soaking tub and rain shower',
    image: 'bathroom.jpg',
    panoramic: 'bathroom.jpg',
    icon: Bath,
    hotspots: [
      { x: 30, y: 90, targetId: 'bedroom', label: 'Back to Bedroom' },
      { x: 70, y: 80, targetId: 'living', label: 'Living Room' }
    ]
  }
];

interface PanoramicViewerProps {
  image: string;
  hotspots?: Array<{
    x: number;
    y: number;
    targetId: string;
    label: string;
  }>;
  onHotspotClick: (targetId: string) => void;
}

function PanoramicViewer({ image, hotspots = [], onHotspotClick }: PanoramicViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Memoized rotation function to prevent excessive re-renders
  const rotateAnimation = useCallback((_timestamp?: number) => {
    setRotation(prev => (prev + 0.2) % 360);
    if (isRotating && !isDragging) {
      animationRef.current = requestAnimationFrame(rotateAnimation);
    }
  }, [isRotating, isDragging]);

  useEffect(() => {
    if (isRotating && !isDragging) {
      animationRef.current = requestAnimationFrame(rotateAnimation);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRotating, isDragging, rotateAnimation]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastX(e.clientX);
    setIsRotating(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastX;
      setRotation(prev => (prev + deltaX * 0.3) % 360);
      setLastX(e.clientX);
    }
  }, [isDragging, lastX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const toggleAutoRotation = useCallback(() => {
    setIsRotating(!isRotating);
  }, [isRotating]);

  return (
    <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50">
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${image})`,
            transform: `translateX(${-(rotation / 360) * containerWidth}px)`,
            width: '200%',
            backgroundSize: 'cover'
          }}
        />

        {/* Hotspots */}
        {hotspots.map((hotspot, index) => (
          <button
            key={`hotspot-${index}`}
            className="absolute w-8 h-8 bg-gradient-to-r from-[#87715F] to-[#7a9ca5] rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform z-10 flex items-center justify-center group"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => onHotspotClick(hotspot.targetId)}
          >
            <Navigation className="w-4 h-4 text-white" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {hotspot.label}
            </div>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={toggleAutoRotation}
          className="bg-white/90 hover:bg-white border border-gray-200"
        >
          <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Instruction overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Click and drag to explore • Click hotspots to navigate</p>
      </div>
    </div>
  );
}

export default function VirtualTour() {
  const [currentLocation, setCurrentLocation] = useState('exterior');
  const [showDroneView, setShowDroneView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentLocationData = tourLocations.find(loc => loc.id === currentLocation);

  const handleLocationChange = useCallback((locationId: string) => {
    setCurrentLocation(locationId);
    setShowDroneView(false);
  }, []);

  const toggleDroneView = useCallback(() => {
    setShowDroneView(!showDroneView);
    setIsPlaying(false);
  }, [showDroneView]);

  const togglePlayback = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  return (
    <section id="virtual-tour" className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Virtual Tour Experience
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600">
            Immerse yourself in VillPaddy Breeze with our interactive 360° virtual tour.
            Explore every corner of our luxury villa, from panoramic exterior views to intimate interior spaces.
          </p>
        </motion.div>

        {/* Tour Type Toggle */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <Button
              variant={!showDroneView ? "default" : "ghost"}
              onClick={() => setShowDroneView(false)}
              className={`mr-2 ${!showDroneView
                ? "bg-[#87715F] hover:bg-[#6b5d4f] text-white border-[#87715F]"
                : ""
                }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              360° Interior Tour
            </Button>
            <Button
              variant={showDroneView ? "default" : "ghost"}
              onClick={toggleDroneView}
              className={`${showDroneView
                ? "bg-[#87715F] hover:bg-[#6b5d4f] text-white border-[#87715F]"
                : ""
                }`}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Drone Footage
            </Button>
          </div>
        </motion.div>

        {showDroneView ? (
          /* Drone View */
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 relative overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1599875140968-b4e3c63d6cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMHZpbGxhJTIwdmlld3xlbnwxfHx8fDE3NTkzODY0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Drone aerial view of VillPaddy Breeze"
                  className="w-full h-full object-cover"
                />

                {/* Video overlay controls */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={togglePlayback}
                    className="bg-white/90 hover:bg-white text-gray-900 rounded-full w-20 h-20"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Playback indicator */}
                {isPlaying && (
                  <motion.div
                    className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm">LIVE</span>
                  </motion.div>
                )}
              </div>

              <div className="p-6">
                <h3 className="mb-2">Aerial Drone Tour</h3>
                <p className="text-gray-600">
                  Experience breathtaking aerial views of VillPaddy Breeze, showcasing the stunning location
                  between emerald paddy fields and crystal-clear ocean waters.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* 360° Interior Tour */
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Location Navigation */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 justify-center">
                {tourLocations.map((location) => {
                  const IconComponent = location.icon;
                  return (
                    <Button
                      key={location.id}
                      variant={currentLocation === location.id ? "default" : "outline"}
                      onClick={() => handleLocationChange(location.id)}
                      className={`flex items-center gap-2 ${currentLocation === location.id
                        ? "bg-[#87715F] hover:bg-[#6b5d4f] text-white border-[#87715F]"
                        : ""
                        }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {location.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Current Location Info */}
            {currentLocationData && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-teal-50">
                <h3 className="mb-2">{currentLocationData.name}</h3>
                <p className="text-gray-600">{currentLocationData.description}</p>
              </div>
            )}

            {/* 360° Viewer */}
            <div className="p-6">
              {currentLocationData && (
                <div key={currentLocation}>
                  <PanoramicViewer
                    image={currentLocationData.panoramic}
                    hotspots={currentLocationData.hotspots}
                    onHotspotClick={handleLocationChange}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#87715F] to-[#7a9ca5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h4 className="mb-2">360° Views</h4>
            <p className="text-gray-600">Interactive panoramic exploration of every space</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#7a9ca5] to-[#87715F] rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-white" />
            </div>
            <h4 className="mb-2">Aerial Footage</h4>
            <p className="text-gray-600">Stunning drone views of the complete property</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#87715F] to-[#7a9ca5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h4 className="mb-2">Seamless Navigation</h4>
            <p className="text-gray-600">Effortless movement between rooms and areas</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}