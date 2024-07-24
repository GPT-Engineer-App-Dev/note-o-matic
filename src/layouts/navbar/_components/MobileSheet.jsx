import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Package2 } from "lucide-react";
import { NavItem } from "./NavItem";
import { useNavigate } from "react-router-dom";

export const MobileSheet = ({ navItems }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <NavItem
            to="/"
            className="flex items-center gap-2 text-lg font-semibold"
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
      </SheetContent>
    </Sheet>
  );
};