import { useState } from 'react';
import { Play, Check, X, Clock, User, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const statusConfig = {
  'pending': { label: 'Oczekuje', className: 'status-pending' },
  'submitted': { label: 'Do sprawdzenia', className: 'status-pending' },
  'approved': { label: 'Zatwierdzone', className: 'status-approved' },
  'rejected': { label: 'Odrzucone', className: 'status-rejected' }
};

export const VerificationCard = ({ verification, onApprove, onReject }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [notes, setNotes] = useState('');

  const status = statusConfig[verification.status] || statusConfig.pending;
  const canReview = verification.status === 'submitted';

  const handleApprove = () => {
    onApprove(verification.id, notes);
  };

  const handleReject = () => {
    onReject(verification.id, rejectReason);
    setShowRejectDialog(false);
    setRejectReason('');
  };

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {verification.customerName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Zamówienie: {verification.orderId}
              </p>
            </div>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video preview / placeholder */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {verification.videoUrl ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <Button 
                    size="lg" 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setShowVideo(true)}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Odtwórz nagranie
                  </Button>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Clock className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Oczekuje na nagranie</p>
              </div>
            )}
          </div>

          {/* Submission info */}
          {verification.submittedAt && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Przesłano: {new Date(verification.submittedAt).toLocaleString('pl-PL')}
              </span>
            </div>
          )}

          {/* Previous notes */}
          {verification.notes && (
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Notatki:
              </p>
              <p className="text-sm text-foreground">{verification.notes}</p>
            </div>
          )}

          {/* Review actions */}
          {canReview && (
            <div className="space-y-3 pt-2 border-t border-border">
              <div>
                <Label className="text-sm text-muted-foreground">Notatki (opcjonalne)</Label>
                <Textarea
                  placeholder="Dodaj notatki do weryfikacji..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 bg-input border-border text-foreground"
                  rows={2}
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                  onClick={handleApprove}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Zatwierdź
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Odrzuć
                </Button>
              </div>
            </div>
          )}

          {/* Reviewed info */}
          {verification.reviewedAt && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Sprawdzone przez {verification.reviewedBy} • {new Date(verification.reviewedAt).toLocaleString('pl-PL')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Dialog */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-3xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Nagranie weryfikacyjne - {verification.customerName}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <video 
              src={verification.videoUrl}
              controls
              autoPlay
              className="w-full h-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVideo(false)}>
              Zamknij
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Odrzuć weryfikację</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Podaj powód odrzucenia weryfikacji dla zamówienia {verification.orderId}.
            </p>
            <Textarea
              placeholder="Powód odrzucenia..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-input border-border text-foreground"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Anuluj
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim()}
            >
              Odrzuć weryfikację
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerificationCard;
