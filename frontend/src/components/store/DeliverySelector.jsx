import { Package, User, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { deliveryMethods } from '@/data/mockData';

export const DeliverySelector = ({ 
  selectedMethod, 
  onMethodChange, 
  lockerCode, 
  onLockerCodeChange,
  pickupLocation,
  onPickupLocationChange,
  requiresVerification 
}) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Package': return Package;
      case 'User': return User;
      default: return Package;
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange}>
        {deliveryMethods.map((method) => {
          const Icon = getIcon(method.icon);
          const isSelected = selectedMethod === method.id;
          
          return (
            <div key={method.id}>
              <Card 
                className={`cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => onMethodChange(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <Label 
                          htmlFor={method.id} 
                          className="font-medium text-foreground cursor-pointer"
                        >
                          {method.name}
                        </Label>
                        <span className="font-semibold text-primary">
                          {method.price > 0 ? `${method.price.toFixed(2)} zł` : 'Gratis'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {method.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Czas dostawy: {method.estimatedDays} dni
                      </p>
                    </div>
                  </div>

                  {/* InPost locker selection */}
                  {isSelected && method.id === 'inpost' && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Label className="text-sm text-foreground mb-2 block">
                        <MapPin className="w-4 h-4 inline-block mr-1" />
                        Wybierz paczkomat
                      </Label>
                      <Input
                        placeholder="Wpisz kod paczkomatu (np. WAW123)"
                        value={lockerCode}
                        onChange={(e) => onLockerCodeChange(e.target.value)}
                        className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Znajdź najbliższy paczkomat na{' '}
                        <a 
                          href="https://inpost.pl/znajdz-paczkomat" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          inpost.pl
                        </a>
                      </p>
                    </div>
                  )}

                  {/* H2H pickup location */}
                  {isSelected && method.id === 'h2h' && (
                    <div className="mt-4 pt-4 border-t border-border space-y-4">
                      <div>
                        <Label className="text-sm text-foreground mb-2 block">
                          <MapPin className="w-4 h-4 inline-block mr-1" />
                          Preferowana lokalizacja odbioru
                        </Label>
                        <Input
                          placeholder="np. Warszawa, Centrum"
                          value={pickupLocation}
                          onChange={(e) => onPickupLocationChange(e.target.value)}
                          className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                        />
                      </div>

                      {(requiresVerification || method.requiresVerification) && (
                        <Alert className="bg-warning/10 border-warning/30">
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          <AlertDescription className="text-sm">
                            <strong className="text-foreground">Wymagana weryfikacja tożsamości</strong>
                            <p className="text-muted-foreground mt-1">
                              Dla zamówień H2H wymagamy nagrania krótkiego wideo potwierdzającego 
                              Twoją tożsamość. Nagranie zostanie przesłane po złożeniu zamówienia.
                            </p>
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default DeliverySelector;
