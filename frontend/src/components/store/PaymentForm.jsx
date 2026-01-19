import { useState } from 'react';
import { CreditCard, Building, Smartphone, Send, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTelegram } from '@/context/TelegramContext';

const paymentMethods = [
  {
    id: 'blik',
    name: 'BLIK',
    description: 'Szybka płatność kodem BLIK',
    icon: Smartphone,
    available: true
  },
  {
    id: 'stripe',
    name: 'Karta płatnicza',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    available: true
  },
  {
    id: 'przelewy24',
    name: 'Przelewy24',
    description: 'Szybki przelew bankowy',
    icon: Building,
    available: true
  },
  {
    id: 'telegram',
    name: 'Telegram Pay',
    description: 'Płatność przez Telegram',
    icon: Send,
    telegramOnly: true
  }
];

export const PaymentForm = ({ 
  selectedMethod, 
  onMethodChange, 
  onPaymentSubmit,
  total,
  isProcessing 
}) => {
  const { isTelegram } = useTelegram();
  const [blikCode, setBlikCode] = useState('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const availableMethods = paymentMethods.filter(m => 
    m.available || (m.telegramOnly && isTelegram)
  );

  const handleBlikCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setBlikCode(value);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2);
    }
    return v;
  };

  const handleSubmit = () => {
    let paymentDetails = {};
    
    switch (selectedMethod) {
      case 'blik':
        paymentDetails = { blikCode };
        break;
      case 'stripe':
        paymentDetails = {
          cardNumber: cardData.cardNumber.replace(/\s/g, ''),
          expiry: cardData.expiry,
          cvc: cardData.cvc,
          name: cardData.name
        };
        break;
      case 'przelewy24':
        paymentDetails = { bankCode: 'auto' };
        break;
      case 'telegram':
        paymentDetails = {};
        break;
      default:
        break;
    }
    
    onPaymentSubmit(paymentDetails);
  };

  const isFormValid = () => {
    switch (selectedMethod) {
      case 'blik':
        return blikCode.length === 6;
      case 'stripe':
        return cardData.cardNumber.replace(/\s/g, '').length >= 15 && 
               cardData.expiry.length === 5 && 
               cardData.cvc.length >= 3;
      case 'przelewy24':
      case 'telegram':
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="space-y-3">
        {availableMethods.map((method) => {
          const Icon = method.icon;
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
                      className="font-medium text-foreground cursor-pointer flex items-center gap-2"
                    >
                      {method.name}
                      {method.telegramOnly && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                          Telegram
                        </span>
                      )}
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

      {/* BLIK Form */}
      {selectedMethod === 'blik' && (
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="blikCode" className="text-foreground">Kod BLIK</Label>
              <Input
                id="blikCode"
                type="text"
                inputMode="numeric"
                placeholder="______"
                value={blikCode}
                onChange={handleBlikCodeChange}
                className="mt-1.5 bg-input border-border text-foreground text-center text-2xl tracking-widest font-mono"
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Wpisz 6-cyfrowy kod z aplikacji bankowej
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Card Form */}
      {selectedMethod === 'stripe' && (
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="cardNumber" className="text-foreground">Numer karty</Label>
              <Input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={cardData.cardNumber}
                onChange={(e) => setCardData(prev => ({ 
                  ...prev, 
                  cardNumber: formatCardNumber(e.target.value) 
                }))}
                className="mt-1.5 bg-input border-border text-foreground font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className="text-foreground">Data ważności</Label>
                <Input
                  id="expiry"
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/RR"
                  value={cardData.expiry}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    expiry: formatExpiry(e.target.value) 
                  }))}
                  className="mt-1.5 bg-input border-border text-foreground font-mono"
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvc" className="text-foreground">CVC</Label>
                <Input
                  id="cvc"
                  type="text"
                  inputMode="numeric"
                  placeholder="123"
                  value={cardData.cvc}
                  onChange={(e) => setCardData(prev => ({ 
                    ...prev, 
                    cvc: e.target.value.replace(/\D/g, '').slice(0, 4) 
                  }))}
                  className="mt-1.5 bg-input border-border text-foreground font-mono"
                  maxLength={4}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Dla testu użyj: 4242 4242 4242 4242, dowolna data, dowolny CVC
            </p>
          </CardContent>
        </Card>
      )}

      {/* Przelewy24 Info */}
      {selectedMethod === 'przelewy24' && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              Po kliknięciu "Zapłać" zostaniesz przekierowany do strony Przelewy24, 
              gdzie wybierzesz swój bank i dokończysz płatność.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Telegram Info */}
      {selectedMethod === 'telegram' && (
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              Płatność zostanie przetworzona przez wbudowany system płatności Telegram.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-gold-glow"
        size="lg"
        onClick={handleSubmit}
        disabled={!isFormValid() || isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Przetwarzanie płatności...
          </span>
        ) : (
          <>
            Zapłać {total.toFixed(2)} zł
          </>
        )}
      </Button>
    </div>
  );
};

export default PaymentForm;
