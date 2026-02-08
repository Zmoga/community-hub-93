import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Ban, UserX, AlertTriangle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BanPlayerDialogProps {
  onBan: (data: { playerId: string; reason: string; duration: string }) => Promise<void>;
  disabled?: boolean;
}

export function BanPlayerDialog({ onBan, disabled }: BanPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('permanent');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!playerId || !reason) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await onBan({ playerId, reason, duration });
      toast({ title: 'Success', description: `Player ${playerId} has been banned` });
      setOpen(false);
      setPlayerId('');
      setReason('');
      setDuration('permanent');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to ban player', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start gradient-red hover:opacity-90" size="lg" disabled={disabled}>
          <Ban className="w-4 h-4 mr-2" />
          Ban Player
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-['Orbitron']">
            <Ban className="w-5 h-5 text-destructive" />
            Ban Player
          </DialogTitle>
          <DialogDescription>
            Issue a ban to a player. This action will be logged.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="playerId">Player ID / License</Label>
            <Input
              id="playerId"
              placeholder="steam:xxxxx or license:xxxxx"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Ban Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="6h">6 Hours</SelectItem>
                <SelectItem value="12h">12 Hours</SelectItem>
                <SelectItem value="1d">1 Day</SelectItem>
                <SelectItem value="3d">3 Days</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="14d">14 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Reason for ban..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-background/50 min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} className="gradient-red">
            {loading ? 'Banning...' : 'Confirm Ban'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface KickPlayerDialogProps {
  onKick: (data: { playerId: string; reason: string }) => Promise<void>;
  disabled?: boolean;
}

export function KickPlayerDialog({ onKick, disabled }: KickPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [reason, setReason] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!playerId || !reason) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await onKick({ playerId, reason });
      toast({ title: 'Success', description: `Player ${playerId} has been kicked` });
      setOpen(false);
      setPlayerId('');
      setReason('');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to kick player', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="outline" size="lg" disabled={disabled}>
          <UserX className="w-4 h-4 mr-2" />
          Kick Player
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-['Orbitron']">
            <UserX className="w-5 h-5 text-amber-500" />
            Kick Player
          </DialogTitle>
          <DialogDescription>
            Kick a player from the server. They can rejoin immediately.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="kickPlayerId">Player ID</Label>
            <Input
              id="kickPlayerId"
              placeholder="Server ID or player name"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kickReason">Reason</Label>
            <Textarea
              id="kickReason"
              placeholder="Reason for kick..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-amber-600 hover:bg-amber-700">
            {loading ? 'Kicking...' : 'Confirm Kick'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface WarnPlayerDialogProps {
  onWarn: (data: { playerId: string; reason: string; severity: string }) => Promise<void>;
  disabled?: boolean;
}

export function WarnPlayerDialog({ onWarn, disabled }: WarnPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [reason, setReason] = useState('');
  const [severity, setSeverity] = useState('low');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!playerId || !reason) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await onWarn({ playerId, reason, severity });
      toast({ title: 'Success', description: `Warning issued to ${playerId}` });
      setOpen(false);
      setPlayerId('');
      setReason('');
      setSeverity('low');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to warn player', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="outline" size="lg" disabled={disabled}>
          <AlertTriangle className="w-4 h-4 mr-2" />
          Warn Player
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-['Orbitron']">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Warn Player
          </DialogTitle>
          <DialogDescription>
            Issue a warning to a player. Warnings are tracked and may lead to escalation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="warnPlayerId">Player ID</Label>
            <Input
              id="warnPlayerId"
              placeholder="Server ID or player name"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="severity">Severity</Label>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Friendly Reminder</SelectItem>
                <SelectItem value="medium">Medium - Official Warning</SelectItem>
                <SelectItem value="high">High - Final Warning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="warnReason">Reason</Label>
            <Textarea
              id="warnReason"
              placeholder="Reason for warning..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-yellow-600 hover:bg-yellow-700">
            {loading ? 'Issuing...' : 'Issue Warning'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UnbanPlayerDialogProps {
  onUnban: (data: { playerId: string; reason: string }) => Promise<void>;
  disabled?: boolean;
}

export function UnbanPlayerDialog({ onUnban, disabled }: UnbanPlayerDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playerId, setPlayerId] = useState('');
  const [reason, setReason] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!playerId) {
      toast({ title: 'Error', description: 'Please enter a player ID', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await onUnban({ playerId, reason });
      toast({ title: 'Success', description: `Player ${playerId} has been unbanned` });
      setOpen(false);
      setPlayerId('');
      setReason('');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to unban player', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="outline" size="lg" disabled={disabled}>
          <Check className="w-4 h-4 mr-2" />
          Unban Player
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-['Orbitron']">
            <Check className="w-5 h-5 text-green-500" />
            Unban Player
          </DialogTitle>
          <DialogDescription>
            Remove a ban from a player, allowing them to rejoin the server.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="unbanPlayerId">Player ID / License</Label>
            <Input
              id="unbanPlayerId"
              placeholder="steam:xxxxx or license:xxxxx"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unbanReason">Reason (Optional)</Label>
            <Textarea
              id="unbanReason"
              placeholder="Reason for unban..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-background/50"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700">
            {loading ? 'Unbanning...' : 'Confirm Unban'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
