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
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  FilePenLine, 
  CircleX, 
  FileText, 
  MessageCircle,
  Users,
  Calendar,
  LayoutDashboard,
  LogOut
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Appointment } from '@shared/schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const DoctorDashboard = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Update page title
  useEffect(() => {
    document.title = t('dashboard.title');
  }, [t]);

  // Get appointments
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['/api/appointments'],
  });

  // Get contact messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['/api/contact-messages'],
    enabled: false, // This endpoint not implemented yet, we can enable it when ready
  });

  // Update appointment status mutation
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

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      logout();
      toast({
        title: t('dashboard.logout.success'),
        description: t('dashboard.logout.successDescription'),
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: t('dashboard.logout.error'),
        description: t('dashboard.logout.errorDescription'),
        variant: 'destructive',
      });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">{t('dashboard.appointments.status.pending')}</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">{t('dashboard.appointments.status.confirmed')}</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">{t('dashboard.appointments.status.completed')}</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">{t('dashboard.appointments.status.cancelled')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="py-16 min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>{t('dashboard.notAuthenticated')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 bg-neutral-100 min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.welcome')}</CardTitle>
                <CardDescription>{user.fullName}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <button
                    className={`flex items-center gap-2 p-3 text-left transition-colors hover:bg-neutral-100 ${activeTab === 'dashboard' ? 'bg-neutral-100 text-primary font-medium' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <LayoutDashboard size={18} />
                    <span>{t('dashboard.nav.overview')}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 p-3 text-left transition-colors hover:bg-neutral-100 ${activeTab === 'appointments' ? 'bg-neutral-100 text-primary font-medium' : ''}`}
                    onClick={() => setActiveTab('appointments')}
                  >
                    <Calendar size={18} />
                    <span>{t('dashboard.nav.appointments')}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 p-3 text-left transition-colors hover:bg-neutral-100 ${activeTab === 'patients' ? 'bg-neutral-100 text-primary font-medium' : ''}`}
                    onClick={() => setActiveTab('patients')}
                  >
                    <Users size={18} />
                    <span>{t('dashboard.nav.patients')}</span>
                  </button>
                  <button
                    className={`flex items-center gap-2 p-3 text-left transition-colors hover:bg-neutral-100 ${activeTab === 'messages' ? 'bg-neutral-100 text-primary font-medium' : ''}`}
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageCircle size={18} />
                    <span>{t('dashboard.nav.messages')}</span>
                  </button>
                  <button
                    className="flex items-center gap-2 p-3 text-left text-red-500 hover:bg-red-50 transition-colors mt-auto border-t"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} />
                    <span>{t('dashboard.nav.logout')}</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.overview.title')}</CardTitle>
                  <CardDescription>{t('dashboard.overview.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.overview.pendingAppointments')}</p>
                            <p className="text-2xl font-bold">
                              {appointmentsLoading ? '...' : 
                                appointments?.filter((a: Appointment) => a.status === 'pending').length || 0}
                            </p>
                          </div>
                          <Clock className="h-8 w-8 text-amber-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.overview.upcomingAppointments')}</p>
                            <p className="text-2xl font-bold">
                              {appointmentsLoading ? '...' : 
                                appointments?.filter((a: Appointment) => a.status === 'confirmed').length || 0}
                            </p>
                          </div>
                          <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">{t('dashboard.overview.totalMessages')}</p>
                            <p className="text-2xl font-bold">
                              {messagesLoading ? '...' : messages?.length || 0}
                            </p>
                          </div>
                          <MessageCircle className="h-8 w-8 text-green-500 opacity-80" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <h3 className="text-lg font-medium mb-4">{t('dashboard.overview.recentAppointments')}</h3>
                  
                  {appointmentsLoading ? (
                    <div className="text-center py-8">
                      <p>{t('dashboard.loading')}</p>
                    </div>
                  ) : appointments && appointments.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t('dashboard.appointments.patientName')}</TableHead>
                            <TableHead>{t('dashboard.appointments.examType')}</TableHead>
                            <TableHead>{t('dashboard.appointments.date')}</TableHead>
                            <TableHead>{t('dashboard.appointments.status')}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {appointments.slice(0, 5).map((appointment: Appointment) => (
                            <TableRow key={appointment.id}>
                              <TableCell className="font-medium">
                                {appointment.firstName} {appointment.lastName}
                              </TableCell>
                              <TableCell>{t(`services.items.${appointment.examType}.title`)}</TableCell>
                              <TableCell>{formatDate(appointment.preferredDate)}</TableCell>
                              <TableCell>
                                <StatusBadge status={appointment.status} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-center py-4">{t('dashboard.appointments.noAppointments')}</p>
                  )}
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'appointments' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.appointments.title')}</CardTitle>
                  <CardDescription>{t('dashboard.appointments.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">{t('dashboard.appointments.tabs.all')}</TabsTrigger>
                      <TabsTrigger value="pending">{t('dashboard.appointments.tabs.pending')}</TabsTrigger>
                      <TabsTrigger value="confirmed">{t('dashboard.appointments.tabs.confirmed')}</TabsTrigger>
                      <TabsTrigger value="completed">{t('dashboard.appointments.tabs.completed')}</TabsTrigger>
                      <TabsTrigger value="cancelled">{t('dashboard.appointments.tabs.cancelled')}</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all">
                      {renderAppointmentsTable(appointments, appointmentsLoading, 'all')}
                    </TabsContent>
                    
                    <TabsContent value="pending">
                      {renderAppointmentsTable(
                        appointments?.filter((a: Appointment) => a.status === 'pending'),
                        appointmentsLoading,
                        'pending'
                      )}
                    </TabsContent>
                    
                    <TabsContent value="confirmed">
                      {renderAppointmentsTable(
                        appointments?.filter((a: Appointment) => a.status === 'confirmed'),
                        appointmentsLoading,
                        'confirmed'
                      )}
                    </TabsContent>
                    
                    <TabsContent value="completed">
                      {renderAppointmentsTable(
                        appointments?.filter((a: Appointment) => a.status === 'completed'),
                        appointmentsLoading,
                        'completed'
                      )}
                    </TabsContent>
                    
                    <TabsContent value="cancelled">
                      {renderAppointmentsTable(
                        appointments?.filter((a: Appointment) => a.status === 'cancelled'),
                        appointmentsLoading,
                        'cancelled'
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'patients' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.patients.title')}</CardTitle>
                  <CardDescription>{t('dashboard.patients.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8">{t('dashboard.patients.comingSoon')}</p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === 'messages' && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.messages.title')}</CardTitle>
                  <CardDescription>{t('dashboard.messages.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-8">{t('dashboard.messages.comingSoon')}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  function renderAppointmentsTable(appointments: Appointment[] | undefined, isLoading: boolean, tabType: string) {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <p>{t('dashboard.loading')}</p>
        </div>
      );
    }
    
    if (!appointments || appointments.length === 0) {
      return (
        <div className="text-center py-8">
          <p>{t('dashboard.appointments.noAppointments')}</p>
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('dashboard.appointments.patientName')}</TableHead>
              <TableHead>{t('dashboard.appointments.phone')}</TableHead>
              <TableHead>{t('dashboard.appointments.examType')}</TableHead>
              <TableHead>{t('dashboard.appointments.date')}</TableHead>
              <TableHead>{t('dashboard.appointments.prescription')}</TableHead>
              <TableHead>{t('dashboard.appointments.status')}</TableHead>
              <TableHead>{t('dashboard.appointments.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment: Appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.firstName} {appointment.lastName}
                </TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>{t(`services.items.${appointment.examType}.title`, appointment.examType)}</TableCell>
                <TableCell>{formatDate(appointment.preferredDate)}</TableCell>
                <TableCell>
                  {appointment.hasPrescription ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <CircleX className="h-5 w-5 text-red-500" />}
                </TableCell>
                <TableCell>
                  <StatusBadge status={appointment.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={appointment.status}
                      onValueChange={(value) => handleStatusChange(appointment.id, value)}
                      disabled={updateAppointmentMutation.isPending}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder={t('dashboard.appointments.changeStatus')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t('dashboard.appointments.status.pending')}</SelectItem>
                        <SelectItem value="confirmed">{t('dashboard.appointments.status.confirmed')}</SelectItem>
                        <SelectItem value="completed">{t('dashboard.appointments.status.completed')}</SelectItem>
                        <SelectItem value="cancelled">{t('dashboard.appointments.status.cancelled')}</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      size="icon" 
                      variant="outline"
                      title={t('dashboard.appointments.viewDetails')}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
};

export default DoctorDashboard;
