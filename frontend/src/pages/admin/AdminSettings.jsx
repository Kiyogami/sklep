import { useState } from 'react';
import { Save, Bell, Shield, User, Key, Globe, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: 'Prascy Bandyci',
    storeEmail: 'kontakt@prascy.pl',
    telegramBot: '@PrascyBandyciBot',
    notifyNewOrder: true,
    notifyVerification: true,
    notifyPayment: true,
    require2FA: false,
    verificationRetention: 30,
    stripeKey: '••••••••••••••••',
    przelewy24Key: '••••••••••••••••',
  });

  const handleSave = () => {
    toast.success('Ustawienia zapisane');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Ustawienia</h1>
        <p className="text-muted-foreground mt-1">
          Konfiguracja sklepu i integracji
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted border border-border">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Globe className="w-4 h-4 mr-2" />
            Ogólne
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Powiadomienia
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Bezpieczeństwo
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Key className="w-4 h-4 mr-2" />
            Integracje
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ustawienia ogólne</CardTitle>
              <CardDescription>Podstawowe informacje o sklepie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName" className="text-foreground">Nazwa sklepu</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => setSettings(prev => ({ ...prev, storeName: e.target.value }))}
                    className="mt-1.5 bg-input border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="storeEmail" className="text-foreground">Email kontaktowy</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, storeEmail: e.target.value }))}
                    className="mt-1.5 bg-input border-border text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="telegramBot" className="text-foreground">Telegram Bot</Label>
                <Input
                  id="telegramBot"
                  value={settings.telegramBot}
                  onChange={(e) => setSettings(prev => ({ ...prev, telegramBot: e.target.value }))}
                  className="mt-1.5 bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Bot używany do wysyłania powiadomień
                </p>
              </div>

              <Separator className="bg-border" />

              <div>
                <Label htmlFor="verificationRetention" className="text-foreground">
                  Przechowywanie nagrań weryfikacyjnych (dni)
                </Label>
                <Input
                  id="verificationRetention"
                  type="number"
                  value={settings.verificationRetention}
                  onChange={(e) => setSettings(prev => ({ ...prev, verificationRetention: parseInt(e.target.value) }))}
                  className="mt-1.5 bg-input border-border text-foreground w-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Nagrania są automatycznie usuwane po tym czasie (RODO)
                </p>
              </div>

              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz zmiany
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Powiadomienia Telegram</CardTitle>
              <CardDescription>Konfiguracja powiadomień dla administratorów</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Nowe zamówienia</Label>
                    <p className="text-xs text-muted-foreground">
                      Powiadomienie przy każdym nowym zamówieniu
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyNewOrder}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyNewOrder: checked }))}
                  />
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Weryfikacje</Label>
                    <p className="text-xs text-muted-foreground">
                      Powiadomienie gdy klient prześle nagranie weryfikacyjne
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyVerification}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyVerification: checked }))}
                  />
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Płatności</Label>
                    <p className="text-xs text-muted-foreground">
                      Powiadomienie o potwierdzeniu płatności
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifyPayment}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyPayment: checked }))}
                  />
                </div>
              </div>

              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleSave}
              >
                <Save className="w-4 h-4 mr-2" />
                Zapisz zmiany
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Uwierzytelnianie</CardTitle>
                <CardDescription>Ustawienia bezpieczeństwa konta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Uwierzytelnianie dwuskładnikowe (2FA)</Label>
                    <p className="text-xs text-muted-foreground">
                      Wymagaj kodu 2FA przy logowaniu
                    </p>
                  </div>
                  <Switch
                    checked={settings.require2FA}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, require2FA: checked }))}
                  />
                </div>

                <Separator className="bg-border" />

                <div>
                  <Label className="text-foreground">Zmiana hasła</Label>
                  <div className="grid sm:grid-cols-2 gap-4 mt-2">
                    <Input
                      type="password"
                      placeholder="Aktualne hasło"
                      className="bg-input border-border text-foreground"
                    />
                    <Input
                      type="password"
                      placeholder="Nowe hasło"
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>

                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Zapisz zmiany
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Dziennik aktywności</CardTitle>
                <CardDescription>Ostatnie działania w panelu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Zalogowano', time: '2 min temu', ip: '192.168.1.1' },
                    { action: 'Zatwierdzono weryfikację VER-003', time: '15 min temu', ip: '192.168.1.1' },
                    { action: 'Zaktualizowano produkt BUCH Premium', time: '1 godz. temu', ip: '192.168.1.1' },
                    { action: 'Wysłano zamówienie ORD-002', time: '3 godz. temu', ip: '192.168.1.1' },
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div>
                        <p className="text-sm text-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.time}</p>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{log.ip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Płatności</CardTitle>
                <CardDescription>Konfiguracja bramek płatności</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#635BFF]/20 flex items-center justify-center">
                      <span className="font-bold text-[#635BFF]">S</span>
                    </div>
                    <div>
                      <Label className="text-foreground">Stripe</Label>
                      <p className="text-xs text-muted-foreground">Karty płatnicze</p>
                    </div>
                  </div>
                  <Input
                    type="password"
                    value={settings.stripeKey}
                    onChange={(e) => setSettings(prev => ({ ...prev, stripeKey: e.target.value }))}
                    className="bg-input border-border text-foreground font-mono"
                    placeholder="sk_live_..."
                  />
                </div>

                <Separator className="bg-border" />

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#D1232A]/20 flex items-center justify-center">
                      <span className="font-bold text-[#D1232A]">P24</span>
                    </div>
                    <div>
                      <Label className="text-foreground">Przelewy24</Label>
                      <p className="text-xs text-muted-foreground">Przelewy bankowe, BLIK</p>
                    </div>
                  </div>
                  <Input
                    type="password"
                    value={settings.przelewy24Key}
                    onChange={(e) => setSettings(prev => ({ ...prev, przelewy24Key: e.target.value }))}
                    className="bg-input border-border text-foreground font-mono"
                    placeholder="API key..."
                  />
                </div>

                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Zapisz zmiany
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Telegram Web App</CardTitle>
                <CardDescription>Integracja z Telegram Mini App</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-foreground">Bot Token</Label>
                  <Input
                    type="password"
                    placeholder="123456:ABC-DEF..."
                    className="mt-1.5 bg-input border-border text-foreground font-mono"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Web App URL</Label>
                  <Input
                    placeholder="https://t.me/YourBot/app"
                    className="mt-1.5 bg-input border-border text-foreground"
                  />
                </div>

                <Button 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Zapisz zmiany
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
