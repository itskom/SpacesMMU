// Cleaned up and added comments for better readability and explanation
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { StudySpaceCard } from "@/components/study-space-card";
import { StudySpace } from "@/types/study-space";
import { isSpaceOpen } from "@/utils/timeUtils";
import { X, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  spaces: StudySpace[]; // List of study spaces
  onSpaceSelect: (spaceId: string) => void; // Callback when a space is selected
  currentTime: Date; // Current time for filtering open spaces
  isOpen: boolean; // Whether the sidebar is open
  onClose: () => void; // Callback to close the sidebar
  userLocation: [number, number] | null; // User's current location
  nearestSpace: StudySpace | null; // Nearest study space to the user
}

export function Sidebar({
  spaces,
  onSpaceSelect,
  currentTime,
  isOpen,
  onClose,
  userLocation,
  nearestSpace,
}: SidebarProps) {
  // State for search query and filter toggle
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // Format the current time for display
  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(currentTime);

  // Handle space selection and close sidebar on small screens
  const handleSpaceClick = (spaceId: string) => {
    onSpaceSelect(spaceId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
    coord1: [number, number],
    coord2: [number, number]
  ): number => {
    const R = 6371; // Earth's radius in kilometers
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
    return R * c;
  };

  // Sort spaces by proximity to the user's location
  const sortedSpaces = userLocation
    ? [...spaces].sort(
        (a, b) =>
          calculateDistance(userLocation, a.coordinates) -
          calculateDistance(userLocation, b.coordinates)
      )
    : spaces;

  // Filter spaces based on search query and open status
  const filteredSpaces = sortedSpaces.filter(
    (space) =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showOpenOnly || isSpaceOpen(space, currentTime))
  );

  return (
    <div
      className={`fixed inset-y-4 left-0 z-50 w-[calc(95%-2rem)] max-w-[400px] sm:w-[420px] transition-transform duration-300 ease-in-out transform rounded-2xl shadow-xl border border-white/10 bg-gradient-to-br from-blue-900/60 to-blue-800/40 backdrop-blur-2xl ${
        isOpen ? "translate-x-4" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* HEADER */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-blue-950/50">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="relative w-9 h-9 bg-blue-600 rounded-lg shadow-md">
                <MapPinned className="absolute inset-1 w-7 h-7 text-white drop-shadow" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">SpacesMMU</h1>
                <p className="text-sm text-blue-200">
                  Find the best study spaces near you
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-blue-700/50 md:hidden"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Search Input */}
          <div className="mt-4">
            <Input
              placeholder="Search spaces..."
              className="bg-white/10 border border-white/20 text-white placeholder-white focus:ring-2 focus:ring-blue-400 focus:outline-none rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Switch
                id="open-filter"
                checked={showOpenOnly}
                onCheckedChange={setShowOpenOnly}
              />
              <Label htmlFor="open-filter" className="text-sm text-white">
                Show open only
              </Label>
            </div>
            <span className="text-sm text-blue-100 font-mono">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* CARD LIST */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-blue-800/10">
          {filteredSpaces.map((space) => (
            <StudySpaceCard
              key={space.id}
              space={space}
              onClick={() => handleSpaceClick(space.id)}
              isOpen={isSpaceOpen(space, currentTime)}
              currentTime={currentTime}
              distance={
                userLocation
                  ? calculateDistance(userLocation, space.coordinates)
                  : undefined
              }
              isNearest={space.id === nearestSpace?.id}
              className={`
                transition-all duration-300 border rounded-xl shadow-md
                ${
                  isSpaceOpen(space, currentTime)
                    ? "bg-green-500/20 border-green-500"
                    : "bg-red-500/20 border-red-500"
                }
                ${
                  space.id === nearestSpace?.id
                    ? "border-purple-500 shadow-lg"
                    : ""
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Scrollbar Styling */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.4) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
