import { CreditCard, Building, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { paymentMethods } from '@/data/mockData';

export const PaymentSelector = ({ selectedMethod, onMethodChange }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'CreditCard': return CreditCard;
      case 'Building': return Building;
      case 'Smartphone': return Smartphone;
      default: return CreditCard;
    }
  };

  return (
    <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="space-y-3">
      {paymentMethods.map((method) => {
        const Icon = getIcon(method.icon);
        const isSelected = selectedMethod === method.id;
        
        return (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all ${
              isSelected 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/30'
            }`}
            onClick={() => onMethodChange(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <Label 
                    htmlFor={method.id} 
                    className="font-medium text-foreground cursor-pointer"
                  >
                    {method.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </RadioGroup>
  );
};

export default PaymentSelector;
