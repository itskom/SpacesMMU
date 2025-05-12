# SpacesMMU

Tired of wandering around the library looking for a spot?
SpacesMMU helps you quickly find the best study spaces across campus, no more guesswork. Built by MMU students for MMU students, it features a clean, responsive design, real-time open space filtering, and an interactive map powered by Mapbox.

## Features

- Search and filter study spaces
- Toggle to show only currently open spaces
- Detect nearest study space based on user location
- Interactive Mapbox integration
- Live clock and distance calculations

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Lucide Icons](https://lucide.dev/)
- TypeScript

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/spacesmmu.git
cd spacesmmu
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Optional Improvements

- Add authentication for bookmarking spaces
- Admin panel to add/edit study space data
- Offline caching support for PWA experience

## Preview

![Homepage Screenshot](https://i.imgur.com/j0Eyou8.png)

## Author

Made by Komchan Mather
