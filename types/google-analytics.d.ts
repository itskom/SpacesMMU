interface Window {
  gtag: (
    command: "event" | "config",
    action: string,
    options: {
      event_category?: string;
      event_label?: string;
      value?: number;
      [key: string]: any;
    }
  ) => void;
}
