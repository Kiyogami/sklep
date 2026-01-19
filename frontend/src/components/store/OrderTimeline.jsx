import { Check, Clock, Package, CreditCard, Shield, Truck, MapPin } from 'lucide-react';

const timelineSteps = [
  { id: 'created', label: 'Zamówienie złożone', icon: Package },
  { id: 'payment_confirmed', label: 'Płatność potwierdzona', icon: CreditCard },
  { id: 'verification_pending', label: 'Oczekuje na weryfikację', icon: Shield },
  { id: 'verification_approved', label: 'Weryfikacja zatwierdzona', icon: Shield },
  { id: 'shipped', label: 'Wysłano', icon: Truck },
  { id: 'ready_for_pickup', label: 'Gotowe do odbioru', icon: MapPin },
  { id: 'delivered', label: 'Dostarczone', icon: Check }
];

const statusOrder = {
  'created': 0,
  'payment_confirmed': 1,
  'verification_pending': 2,
  'verification_approved': 3,
  'shipped': 4,
  'ready_for_pickup': 5,
  'delivered': 6
};

export const OrderTimeline = ({ currentStatus, requiresVerification }) => {
  const currentIndex = statusOrder[currentStatus] || 0;
  
  // Filter steps based on whether verification is required
  const relevantSteps = timelineSteps.filter(step => {
    if (!requiresVerification) {
      return !step.id.includes('verification');
    }
    return true;
  });

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="timeline-line" />

      {/* Steps */}
      <div className="space-y-6">
        {relevantSteps.map((step, index) => {
          const stepIndex = statusOrder[step.id];
          const isCompleted = stepIndex <= currentIndex;
          const isCurrent = step.id === currentStatus;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex items-start gap-4 pl-2">
              {/* Dot */}
              <div 
                className={`timeline-dot flex-shrink-0 ${
                  isCompleted ? 'completed' : 'pending'
                } ${isCurrent ? 'pulse-gold' : ''}`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-6">
                <p className={`font-medium ${
                  isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary">Aktualny status</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
