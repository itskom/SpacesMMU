"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/map-view";
import { Sidebar } from "@/components/sidebar";
import { LoadingScreen } from "@/components/loading-screen";
import { StudySpace } from "@/types/study-space";
import { RotateCcw, Menu, Crosshair } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

// Todo : Implement API for Study Spaces (This is just sample data)
const SAMPLE_SPACES: StudySpace[] = [
  {
    id: "1",
    name: "Library",
    image: "/images/mmu-library.jpg",
    rating: 4.2,
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.239082521145019, 53.47188923579268],
    openingHours: {
      Monday: { open: "00:00", close: "23:59" },
      Tuesday: { open: "00:00", close: "23:59" },
      Wednesday: { open: "00:00", close: "23:59" },
      Thursday: { open: "00:00", close: "23:59" },
      Friday: { open: "00:00", close: "23:59" },
      Saturday: { open: "00:00", close: "23:59" },
      Sunday: { open: "00:00", close: "23:59" },
    },
  },
  {
    id: "2",
    name: "Dalton Building",
    image: "/images/mmu-dalton-building.jpg",
    rating: 4.8,
    nearestStation: "Oxford Road Station",
    distance: 0.3,
    coordinates: [-2.241476835677828, 53.47137021540773],
    openingHours: {
      Monday: { open: "08:00", close: "20:00" },
      Tuesday: { open: "08:00", close: "20:00" },
      Wednesday: { open: "08:00", close: "20:00" },
      Thursday: { open: "08:00", close: "20:00" },
      Friday: { open: "08:00", close: "20:00" },
      Saturday: { open: "09:00", close: "17:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "3",
    name: "Business School",
    image: "/images/mmu-business-school.jpg",
    rating: 4.6,
    nearestStation: "Oxford Road Station", // Adjust if necessary
    distance: 0.8,
    coordinates: [-2.240601928544768, 53.470449259326195],
    openingHours: {
      Monday: { open: "08:00", close: "21:00" },
      Tuesday: { open: "08:00", close: "21:00" },
      Wednesday: { open: "08:00", close: "21:00" },
      Thursday: { open: "08:00", close: "21:00" },
      Friday: { open: "08:00", close: "20:00" },
      Saturday: { open: "09:00", close: "17:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "4",
    name: "Student Union",
    image: "/images/mmu-student-union.jpg",
    rating: 4.4,
    nearestStation: "Oxford Road Station", // Adjust if necessary
    distance: 0.8,
    coordinates: [-2.2388252674147844, 53.46860304464709],
    openingHours: {
      Monday: { open: "08:00", close: "22:00" },
      Tuesday: { open: "08:00", close: "22:00" },
      Wednesday: { open: "08:00", close: "22:00" },
      Thursday: { open: "08:00", close: "22:00" },
      Friday: { open: "08:00", close: "22:00" },
      Saturday: { open: "00:00", close: "00:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "5",
    name: "Institute of Sport",
    image: "/images/mmu-institute-of-sport-building.jpg",
    rating: 4.5,
    nearestStation: "Oxford Road Station", // Adjust if necessary
    distance: 0.4,
    coordinates: [-2.2376468554658078, 53.471474335245006],
    openingHours: {
      Monday: { open: "08:00", close: "20:00" },
      Tuesday: { open: "08:00", close: "20:00" },
      Wednesday: { open: "08:00", close: "20:00" },
      Thursday: { open: "08:00", close: "20:00" },
      Friday: { open: "08:00", close: "20:00" },
      Saturday: { open: "00:00", close: "00:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "6",
    name: "Brooks Building",
    image: "/images/mmu-brooks-building.jpg",
    rating: 4.6,
    nearestStation: "Oxford Road Station",
    distance: 1.2,
    coordinates: [-2.2462402239497172, 53.46684082805467],
    openingHours: {
      Monday: { open: "08:00", close: "20:00" },
      Tuesday: { open: "08:00", close: "20:00" },
      Wednesday: { open: "08:00", close: "20:00" },
      Thursday: { open: "08:00", close: "20:00" },
      Friday: { open: "08:00", close: "20:00" },
      Saturday: { open: "09:00", close: "17:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "7",
    name: "Central Library",
    image: "/images/central-library.png",
    rating: 4.6,
    nearestStation: "St Peter's Square Station",
    distance: 0.4,
    coordinates: [-2.244521, 53.477839],
    openingHours: {
      Monday: { open: "09:00", close: "20:00" },
      Tuesday: { open: "09:00", close: "20:00" },
      Wednesday: { open: "09:00", close: "20:00" },
      Thursday: { open: "09:00", close: "20:00" },
      Friday: { open: "09:00", close: "17:00" },
      Saturday: { open: "09:00", close: "17:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "8",
    name: "Grosvenor East",
    image: "/images/mmu-grosvenor-east-building.jpg",
    rating: 4.7,
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.237485739541065, 53.46990045271208],
    openingHours: {
      Monday: { open: "08:00", close: "21:00" },
      Tuesday: { open: "08:00", close: "21:00" },
      Wednesday: { open: "08:00", close: "21:00" },
      Thursday: { open: "08:00", close: "21:00" },
      Friday: { open: "08:00", close: "19:30" },
      Saturday: { open: "09:00", close: "17:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "9",
    name: "Geoffrey Manton",
    image: "/images/mmu-geoffrey-manton-building.jpg",
    rating: 4.2,
    nearestStation: "Oxford Road Station",
    distance: 0.4,
    coordinates: [-2.236918742722237, 53.469264132352805],
    openingHours: {
      Monday: { open: "08:00", close: "19:30" },
      Tuesday: { open: "08:00", close: "19:30" },
      Wednesday: { open: "08:00", close: "19:30" },
      Thursday: { open: "08:00", close: "19:30" },
      Friday: { open: "08:00", close: "19:30" },
      Saturday: { open: "00:00", close: "00:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
  {
    id: "10",
    name: "Sandra Burslem",
    image: "/images/mmu-sandra-burslem-building.jpg",
    rating: 4.3,
    nearestStation: "Oxford Road Station",
    distance: 0.6,
    coordinates: [-2.2398154164056567, 53.47091654947796],
    openingHours: {
      Monday: { open: "08:00", close: "21:00" },
      Tuesday: { open: "08:00", close: "21:00" },
      Wednesday: { open: "08:00", close: "21:00" },
      Thursday: { open: "08:00", close: "21:00" },
      Friday: { open: "08:00", close: "20:00" },
      Saturday: { open: "00:00", close: "00:00" },
      Sunday: { open: "00:00", close: "00:00" },
    },
  },
];
export default function StudySpacesPage() {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mapKey, setMapKey] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [nearestSpace, setNearestSpace] = useState<StudySpace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    // Simulate loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    if (userLocation) {
      const nearest = findNearestSpace(userLocation, SAMPLE_SPACES);
      setNearestSpace(nearest);
    }
  }, [userLocation]);

  const handleSpaceSelect = (spaceId: string) => {
    setSelectedSpace(spaceId);

    // Track space selection
    trackEvent({
      action: "select_space",
      category: "Space Interaction",
      label: spaceId,
    });
  };

  const handleMapReload = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      // Track location request
      trackEvent({
        action: "request_location",
        category: "User Location",
      });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.longitude,
            position.coords.latitude,
          ]);
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert(
            "Unable to get your location. Please check your browser settings."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="relative h-screen w-full">
      {isLoading && <LoadingScreen />}
      <MapView
        key={mapKey}
        spaces={SAMPLE_SPACES}
        onMarkerClick={handleSpaceSelect}
        selectedSpaceId={selectedSpace}
        currentTime={currentTime}
        userLocation={userLocation}
        nearestSpace={nearestSpace}
      />
      <Sidebar
        spaces={SAMPLE_SPACES}
        onSpaceSelect={handleSpaceSelect}
        currentTime={currentTime}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userLocation={userLocation}
        nearestSpace={nearestSpace}
      />
      <div className="absolute top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="bg-blue-800/70 border-blue-700/50 text-white hover:bg-blue-700/70"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-800/70 border-blue-700/50 text-white hover:bg-blue-700/70 flex items-center gap-2 font-bold"
          onClick={getUserLocation}
        >
          <Crosshair className="h-4 w-4" />
          Fly to Me
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-blue-800/70 border-blue-700/50 text-white hover:bg-blue-700/70 flex items-center gap-2 font-bold"
          onClick={handleMapReload}
        >
          <RotateCcw className="h-4 w-4" />
          Reset Map
        </Button>
      </div>
    </div>
  );
}

function findNearestSpace(
  userLocation: [number, number],
  spaces: StudySpace[]
): StudySpace | null {
  if (spaces.length === 0) return null;

  let nearestSpace = spaces[0];
  let shortestDistance = calculateDistance(userLocation, spaces[0].coordinates);

  for (let i = 1; i < spaces.length; i++) {
    const distance = calculateDistance(userLocation, spaces[i].coordinates);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestSpace = spaces[i];
    }
  }

  return nearestSpace;
}

function calculateDistance(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1 = (coord1[1] * Math.PI) / 180;
  const lat2 = (coord2[1] * Math.PI) / 180;
  const lon1 = (coord1[0] * Math.PI) / 180;
  const lon2 = (coord2[0] * Math.PI) / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
