import { Eye, MoreHorizontal, Truck, Shield, Package } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig = {
  'created': { label: 'Utworzone', variant: 'secondary' },
  'payment_confirmed': { label: 'Opłacone', variant: 'default' },
  'verification_pending': { label: 'Weryfikacja', variant: 'warning' },
  'verification_approved': { label: 'Zweryfikowane', variant: 'success' },
  'verification_rejected': { label: 'Odrzucone', variant: 'destructive' },
  'shipped': { label: 'Wysłane', variant: 'default' },
  'ready_for_pickup': { label: 'Do odbioru', variant: 'success' },
  'delivered': { label: 'Dostarczone', variant: 'success' }
};

const getStatusBadge = (status) => {
  const config = statusConfig[status] || { label: status, variant: 'secondary' };
  
  const variantClasses = {
    'default': 'bg-primary/15 text-primary border-primary/30',
    'secondary': 'bg-muted text-muted-foreground border-border',
    'success': 'status-approved',
    'warning': 'status-pending',
    'destructive': 'status-rejected'
  };

  return (
    <Badge className={`${variantClasses[config.variant]} text-xs`}>
      {config.label}
    </Badge>
  );
};

export const OrdersTable = ({ orders, onViewOrder, onUpdateStatus }) => {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="text-muted-foreground font-medium">ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Klient</TableHead>
            <TableHead className="text-muted-foreground font-medium">Produkty</TableHead>
            <TableHead className="text-muted-foreground font-medium">Kwota</TableHead>
            <TableHead className="text-muted-foreground font-medium">Dostawa</TableHead>
            <TableHead className="text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/30">
              <TableCell className="font-mono text-sm text-foreground">
                {order.id}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.telegramId}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <p key={idx} className="text-sm text-foreground">
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{order.items.length - 2} więcej
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-primary">
                  {order.total.toFixed(2)} zł
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {order.deliveryMethod === 'inpost' ? (
                    <>
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">InPost</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">H2H</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(order.status)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover border-border">
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => onViewOrder(order.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Szczegóły
                    </DropdownMenuItem>
                    {order.deliveryMethod === 'inpost' && order.status === 'payment_confirmed' && (
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => onUpdateStatus(order.id, 'shipped')}
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Oznacz jako wysłane
                      </DropdownMenuItem>
                    )}
                    {order.requiresVerification && order.verificationStatus === 'submitted' && (
                      <DropdownMenuItem 
                        className="cursor-pointer text-primary"
                        onClick={() => onViewOrder(order.id)}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Sprawdź weryfikację
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
