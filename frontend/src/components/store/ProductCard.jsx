import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ProductCard = ({ product }) => {
  const { id, name, price, image, category, requiresVerification, featured } = product;

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-300 card-hover">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {requiresVerification && (
              <Badge variant="secondary" className="bg-card/90 text-foreground text-xs">
                <Shield className="w-3 h-3 mr-1" />
                H2H
              </Badge>
            )}
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Zobacz produkt
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-primary font-medium uppercase tracking-wide mb-1">
                {category}
              </p>
              <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {name}
              </h3>
            </div>
            <p className="font-display text-lg font-semibold text-primary whitespace-nowrap">
              {price.toFixed(2)} zł
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
