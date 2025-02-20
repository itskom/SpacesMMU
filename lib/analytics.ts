type EventParams = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

export const trackEvent = ({
  action,
  category,
  label,
  value,
}: EventParams): void => {
  // Ensure gtag is available
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
