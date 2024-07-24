import { Home } from "lucide-react";
import Index from "./pages/Index.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Notes",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Note Detail",
    to: "/note/:id",
    page: <NoteDetail />,
    hidden: true, // Hide from navigation, but still available for routing
  },
];