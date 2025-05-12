import Image from "next/image";
import { Star, Clock, MapPin, Train, Ruler } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StudySpace } from "@/types/study-space";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getOpenUntil } from "@/utils/timeUtils";

interface StudySpaceCardProps {
  space: StudySpace;
  onClick?: () => void;
  isOpen: boolean;
  currentTime: Date;
  distance?: number;
  isNearest?: boolean;
}

export function StudySpaceCard({
  space,
  onClick,
  isOpen,
  currentTime,
  distance,
  isNearest,
}: StudySpaceCardProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${space.coordinates[1]},${space.coordinates[0]}`;
  const openUntil = getOpenUntil(space, currentTime);

  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all duration-300 border shadow-sm hover:shadow-md hover:scale-[1.01] rounded-xl backdrop-blur-md bg-blue-900/40 border-blue-500/20 hover:border-blue-300/50 ${
        isNearest ? "border-blue-400 shadow-lg shadow-blue-400/30" : ""
      }`}
      onClick={onClick}
    >
      {/* Image Header */}
      <div className="relative h-40 w-full">
        <Image
          src={space.image}
          alt={space.name}
          fill
          className="object-cover"
          priority
        />
        {isNearest && (
          <div className="absolute top-2 right-2 bg-blue-600/90 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow">
            <MapPin className="w-3 h-3" />
            Nearest
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-blue-50 leading-tight">
            {space.name}
          </h3>
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-sm font-medium">{space.rating}</span>
          </div>
        </div>

        <div className="space-y-1 text-sm text-blue-200">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 ${
                isOpen ? "text-green-400" : "text-red-400"
              }`}
            >
              <Clock className="w-4 h-4" />
              {isOpen ? "Open" : "Closed"}
            </span>
            {isOpen && (
              <span className="text-blue-100/80">until {openUntil}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4" />
            {space.nearestStation}
          </div>
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4" />
            {distance !== undefined
              ? `${distance.toFixed(2)} km away`
              : `${space.distance} km away`}
          </div>
        </div>

        {/* Accordion for Opening Hours */}
        <Accordion type="single" collapsible className="pt-1">
          <AccordionItem value="hours">
            <AccordionTrigger className="text-sm text-blue-200 hover:text-blue-100">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Opening Hours
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-sm text-blue-100/80 space-y-1 mt-1">
                {Object.entries(space.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize">{day}</span>
                    <span className="tabular-nums">
                      {hours.open} – {hours.close}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Google Maps Link */}
        <Button
          variant="link"
          className="w-full justify-start text-blue-300 hover:text-blue-100 p-0"
          onClick={(e) => {
            e.stopPropagation();
            window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
          }}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Open in Google Maps
        </Button>
      </div>
    </Card>
  );
}
