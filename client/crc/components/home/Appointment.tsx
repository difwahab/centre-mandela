import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const appointmentFormSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  phone: z.string().min(8, { message: "Le numéro de téléphone doit être valide" }),
  email: z.string().email({ message: "L'email doit être valide" }).optional().or(z.literal('')),
  examType: z.string({ required_error: "Veuillez sélectionner un type d'examen" }),
  preferredDate: z.string({ required_error: "Veuillez sélectionner une date" }),
  hasPrescription: z.enum(["true", "false"], {
    required_error: "Veuillez indiquer si vous avez une prescription médicale",
  }),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const Appointment = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      examType: "",
      preferredDate: "",
      hasPrescription: "false",
      message: "",
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: (data: AppointmentFormValues) => {
      // Convert hasPrescription from string to boolean
      const formattedData = {
        ...data,
        hasPrescription: data.hasPrescription === "true",
      };
      return apiRequest('POST', '/api/appointments', formattedData);
    },
    onSuccess: async () => {
      toast({
        title: t('appointment.success.title'),
        description: t('appointment.success.message'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('appointment.error.title'),
        description: t('appointment.error.message'),
        variant: "destructive",
      });
      console.error('Appointment submission error:', error);
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    appointmentMutation.mutate(data);
  };

  return (
    <section id="rendez-vous" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('appointment.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('appointment.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6">{t('appointment.form.title')}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('appointment.form.firstName')} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('appointment.form.lastName')} *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointment.form.phone')} *</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointment.form.email')}</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointment.form.examType')} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('appointment.form.examSelect')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="irm">IRM</SelectItem>
                          <SelectItem value="scanner">{t('services.items.scanner.title')}</SelectItem>
                          <SelectItem value="echographie">{t('services.items.ultrasound.title')}</SelectItem>
                          <SelectItem value="radiographie">{t('services.items.radiography.title')}</SelectItem>
                          <SelectItem value="mammographie">{t('services.items.mammography.title')}</SelectItem>
                          <SelectItem value="biopsie">{t('services.items.biopsy.title')}</SelectItem>
                          <SelectItem value="autre">{t('appointment.form.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointment.form.date')} *</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasPrescription"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>{t('appointment.form.prescription')} *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="prescription-yes" />
                            <FormLabel htmlFor="prescription-yes" className="font-normal cursor-pointer">
                              {t('appointment.form.yes')}
                            </FormLabel>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="prescription-no" />
                            <FormLabel htmlFor="prescription-no" className="font-normal cursor-pointer">
                              {t('appointment.form.no')}
                            </FormLabel>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointment.form.message')}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full transition-all hover:-translate-y-0.5 hover:shadow-md"
                  disabled={appointmentMutation.isPending}
                >
                  {appointmentMutation.isPending 
                    ? t('appointment.form.submitting') 
                    : t('appointment.form.submit')}
                </Button>
                
                <p className="text-xs text-text-medium mt-2">
                  * {t('appointment.form.required')}
                </p>
              </form>
            </Form>
          </div>
          
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">{t('appointment.practical.title')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('appointment.practical.address.title')}</h4>
                    <p className="text-text-medium">{t('appointment.practical.address.content')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('appointment.practical.phone.title')}</h4>
                    <p className="text-text-medium">{t('appointment.practical.phone.content')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('appointment.practical.email.title')}</h4>
                    <p className="text-text-medium">{t('appointment.practical.email.content')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('appointment.practical.hours.title')}</h4>
                    <p className="text-text-medium">{t('appointment.practical.hours.weekdays')}</p>
                    <p className="text-text-medium">{t('appointment.practical.hours.saturday')}</p>
                    <p className="text-text-medium">{t('appointment.practical.hours.sunday')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">{t('appointment.location.title')}</h3>
              <div className="aspect-video bg-neutral-200 rounded-md mb-4 relative overflow-hidden">
                {/* Map placeholder - in production, replace with an actual map component */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-text-medium">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-primary mb-2 mx-auto" />
                    <p>{t('appointment.location.mapText')}</p>
                    <p className="text-sm">{t('appointment.location.mapNote')}</p>
                  </div>
                </div>
              </div>
              <p className="text-text-medium text-sm">
                {t('appointment.location.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
