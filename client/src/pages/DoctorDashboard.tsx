import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  CircleX, 
  MessageCircle,
  Users,
  Calendar,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    document.title = t('dashboard.title');
  }, [t]);

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['/api/appointments'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/appointments');
      return res.json();
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PATCH', `/api/appointments/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      toast({
        title: t('dashboard.appointments.statusUpdated'),
        description: t('dashboard.appointments.statusUpdatedDescription'),
      });
    },
    onError: (error) => {
      toast({
        title: t('dashboard.error'),
        description: t('dashboard.errorDescription'),
        variant: 'destructive',
      });
      console.error('Error updating appointment status:', error);
    },
  });

  const handleStatusChange = (appointmentId: number, newStatus: string) => {
    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return <Badge variant="outline" className={variants[status] || ''}>{t(`dashboard.appointments.status.${status}`)}</Badge>;
  };

  return (
    <div className="p-8">
      <h1>{t('dashboard.title')}</h1>
      {!user ? (
        <p>{t('dashboard.notAuthenticated')}</p>
      ) : appointmentsLoading ? (
        <p>{t('dashboard.loading')}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.appointments.patientName')}</TableHead>
              <TableHead>{t('dashboard.appointments.status')}</TableHead>
              <TableHead>{t('dashboard.appointments.date')}</TableHead>
              <TableHead>{t('dashboard.appointments.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((a: Appointment) => (
              <TableRow key={a.id}>
                <TableCell>{a.firstName} {a.lastName}</TableCell>
                <TableCell><StatusBadge status={a.status} /></TableCell>
                <TableCell>{formatDate(a.preferredDate)}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={a.status}
                    onValueChange={(value: string) => handleStatusChange(a.id, value)}
                    disabled={updateAppointmentMutation.isPending}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder={t('dashboard.appointments.changeStatus')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t('dashboard.appointments.status.pending')}</SelectItem>
                      <SelectItem value="confirmed">{t('dashboard.appointments.status.confirmed')}</SelectItem>
                      <SelectItem value="completed">{t('dashboard.appointments.status.completed')}</SelectItem>
                      <SelectItem value="cancelled">{t('dashboard.appointments.status.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DoctorDashboard;
