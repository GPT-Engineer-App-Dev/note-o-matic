import { Package2 } from "lucide-react";
import { NavItem } from "./NavItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DesktopNavbar = ({ navItems }) => {
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 text-lg font-medium md:text-sm">
      <NavItem
        to="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </NavItem>
      {navItems.filter(item => !item.hidden).map((item) => (
        <NavItem key={item.to} to={item.to}>
          {item.title}
        </NavItem>
      ))}
      <Button onClick={() => navigate("/login")}>Login</Button>
    </nav>
  );
};