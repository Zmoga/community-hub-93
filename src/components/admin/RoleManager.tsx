import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Plus, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROLE_DISPLAY, ROLES_ORDER, type AppRole } from '@/config/server.config';

interface RoleAssignment {
  id: string;
  user_id: string;
  discord_username: string;
  discord_avatar?: string;
  role: AppRole;
  assigned_at: string;
}

interface RoleManagerProps {
  currentRoles: RoleAssignment[];
  onAssignRole: (userId: string, role: AppRole) => Promise<void>;
  onRemoveRole: (userId: string, role: AppRole) => Promise<void>;
  disabled?: boolean;
}

export function RoleManager({ currentRoles, onAssignRole, onRemoveRole, disabled }: RoleManagerProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<AppRole>('moderator');
  const { toast } = useToast();

  const handleAssign = async () => {
    if (!userId || !selectedRole) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      await onAssignRole(userId, selectedRole);
      toast({ title: 'Success', description: `Role ${selectedRole} assigned successfully` });
      setUserId('');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to assign role', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (uid: string, role: AppRole) => {
    setLoading(true);
    try {
      await onRemoveRole(uid, role);
      toast({ title: 'Success', description: `Role ${role} removed successfully` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to remove role', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeClasses = (role: AppRole) => {
    const display = ROLE_DISPLAY[role];
    return `${display.bgColor} ${display.color} ${display.borderColor}`;
  };

  // Group roles by user
  const userRolesMap = currentRoles.reduce((acc, assignment) => {
    if (!acc[assignment.user_id]) {
      acc[assignment.user_id] = {
        user_id: assignment.user_id,
        discord_username: assignment.discord_username,
        discord_avatar: assignment.discord_avatar,
        roles: [],
      };
    }
    acc[assignment.user_id].roles.push(assignment.role);
    return acc;
  }, {} as Record<string, { user_id: string; discord_username: string; discord_avatar?: string; roles: AppRole[] }>);

  const users = Object.values(userRolesMap);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full justify-start" variant="outline" size="lg" disabled={disabled}>
          <Shield className="w-4 h-4 mr-2" />
          Manage Roles
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-border/50 max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-['Orbitron']">
            <Shield className="w-5 h-5 text-primary" />
            Role Management
          </DialogTitle>
          <DialogDescription>
            Assign and manage staff roles for your team.
          </DialogDescription>
        </DialogHeader>

        {/* Assign New Role */}
        <div className="border border-border/50 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Assign New Role
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Discord User ID</Label>
              <Input
                placeholder="User ID from Discord"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES_ORDER.filter(r => r !== 'member').map((role) => (
                    <SelectItem key={role} value={role}>
                      {ROLE_DISPLAY[role].icon} {ROLE_DISPLAY[role].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAssign} disabled={loading} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Assign
              </Button>
            </div>
          </div>
        </div>

        {/* Current Roles */}
        <div className="border border-border/50 rounded-lg p-4 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Users className="w-4 h-4" />
            Current Staff ({users.length})
          </h3>
          
          {users.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No staff members assigned yet. Use the form above to add staff roles.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.discord_avatar} />
                          <AvatarFallback className="bg-primary/20 text-primary text-xs">
                            {user.discord_username?.slice(0, 2).toUpperCase() || '??'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.discord_username || 'Unknown'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {ROLES_ORDER.filter(r => user.roles.includes(r)).map((role) => (
                          <Badge 
                            key={role} 
                            variant="outline"
                            className={`text-xs ${getRoleBadgeClasses(role)}`}
                          >
                            {ROLE_DISPLAY[role].icon} {ROLE_DISPLAY[role].label}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {user.roles.map((role) => (
                          <Button
                            key={role}
                            size="sm"
                            variant="ghost"
                            className="h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemove(user.user_id, role)}
                            disabled={loading}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
