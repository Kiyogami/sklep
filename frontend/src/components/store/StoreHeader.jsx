import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

export const StoreHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-bold text-lg text-primary-foreground">PB</span>
            </div>
            <span className="font-display text-xl font-semibold text-gold-gradient hidden sm:block">
              Prascy Bandyci
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Sklep
            </Link>
            <Link 
              to="/#products" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Produkty
            </Link>
            <Link 
              to="/#about" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              O nas
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sklep
              </Link>
              <Link 
                to="/#products" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produkty
              </Link>
              <Link 
                to="/#about" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                O nas
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default StoreHeader;
