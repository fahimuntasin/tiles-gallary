# TilesGallery

A premium tile gallery website showcasing beautiful tiles for your spaces. Built with Next.js (App Router), BetterAuth, MongoDB, and modern UI libraries.

## 🔗 Live URL

**Deployment:** Vercel (https://your-domain.vercel.app)

## 🎯 Key Features

- **Home Page:** Banner with "Discover Your Perfect Aesthetic", SwiperJS marquee, featured tiles with react-spring animations
- **All Tiles:** Search and browse tiles in a responsive grid
- **Tile Details:** Large preview, specs, and purchase info
- **Authentication:** Login/Register with email+password and Google OAuth
- **My Profile:** View and update profile with name and image
- **Protected Routes:** Private access to /tile/[id] and /my-profile

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** HeroUI + DaisyUI + TailwindCSS
- **Animations:** Animate.css, React-Spring, SwiperJS
- **Auth:** BetterAuth with MongoDB adapter
- **Database:** MongoDB Atlas
- **Icons:** Lucide React + Gravity UI Icons

## 📦 NPM Packages

```json
{
  "next": "16.2.4",
  "react": "19.2.4",
  "better-auth": "^1.6.9",
  "@heroui/react": "^3.0.3",
  "daisyui": "^5.5.19",
  "tailwindcss": "^4",
  "animate.css": "latest",
  "react-spring": "latest",
  "swiper": "^12.1.3",
  "lucide-react": "^1.14.0",
  "@gravity-ui/icons": "^2.18.0",
  "mongodb": "^7.2.0"
}
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Environment Variables

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://...
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📂 Project Structure

```
src/
├── app/
│   ├── page.jsx          # Home page
│   ├── all-tiles/       # Gallery page
│   ├── tile/[id]/      # Tile details
│   ├── login/          # Login page
│   ├── register/       # Register page
│   ├── my-profile/     # User profile
│   ├── update-profile/  # Update profile
│   ├── auth/google/   # OAuth redirect
│   └── api/          # API routes
├── components/
│   ├── Navbar.jsx
│   └── Footer.jsx
└── lib/
    ├── auth.js         # BetterAuth config
    └── auth-client.js # Auth client
```

## 📝 Routes

| Route | Type | Description |
|-------|------|------------|
| `/` | Public | Home page |
| `/all-tiles` | Public | Gallery |
| `/tile/[id]` | Private | Tile details |
| `/login` | Public | Login |
| `/register` | Public | Register |
| `/my-profile` | Private | Profile |
| `/update-profile` | Private | Update profile |
| `/auth/google` | Public | Google OAuth |

## 🎨 Design

- **Primary Color:** #1e3a5f (Dark Blue)
- **Accent Color:** #c8a97e (Gold)
- **Background:** #f8f6f3 (Light cream)

---

Built with ❤️ for the TilesGallery assignment.