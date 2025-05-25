import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useMutation } from '@tanstack/react-query';
import { queryClient, sendAppointmentRequest } from '@/lib/queryClient';
import Map from './Map'; // Nouveau composant Leaflet

const appointmentSchema = z
  .object({
    name: z.string().min(1, 'Le nom est requis'),
    phone: z.string().min(1, 'Le numéro de téléphone est requis'),
    email: z.string().email('Email invalide').optional().or(z.literal('')),
    examinationType: z.string().min(1, 'Veuillez sélectionner un examen'),
    preferredDate: z.string().refine(
      (val) => {
        const today = new Date().toISOString().split('T')[0];
        return val >= today;
      },
      { message: 'La date doit être aujourd’hui ou plus tard' }
    ),
    hasPrescription: z.enum(['true', 'false']),
    message: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasPrescription === 'true' && !data.email) {
      ctx.addIssue({
        path: ['email'],
        code: z.ZodIssueCode.custom,
        message: 'L’email est requis si vous avez une ordonnance',
      });
    }
  });

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function Appointment() {
  const { t } = useTranslation();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      examinationType: '',
      preferredDate: '',
      hasPrescription: 'false',
      message: '',
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: sendAppointmentRequest,
    onSuccess: () => {
      toast.success(t('appointment.form.success'));
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: () => {
      toast.error(t('appointment.form.error'));
    },
  });

  const watchPrescription = form.watch('hasPrescription');

  return (
    <section className="container py-12 text-[var(--text-medium)]">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
        <div>
          <h2
            className="text-2xl font-bold mb-6 text-[var(--text-title)]"
            dangerouslySetInnerHTML={{ __html: t('appointment.title') }}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => appointmentMutation.mutate(data))}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointment.form.name')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('appointment.form.namePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointment.form.phone')} *</FormLabel>
                    <FormControl>
                      <Input placeholder={t('appointment.form.phonePlaceholder')} {...field} />
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
                    <FormLabel>
                      {t('appointment.form.email')}
                      {watchPrescription === 'true' && ' *'}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="examinationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointment.form.examinationType')} *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('appointment.form.select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="radio">{t('appointment.form.radio')}</SelectItem>
                        <SelectItem value="scanner">{t('appointment.form.scanner')}</SelectItem>
                        <SelectItem value="irm">{t('appointment.form.irm')}</SelectItem>
                        <SelectItem value="mammographie">{t('appointment.form.mammo')}</SelectItem>
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
                    <FormLabel>{t('appointment.form.preferredDate')} *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasPrescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('appointment.form.hasPrescription')} *</FormLabel>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel>{t('appointment.form.yes')}</FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel>{t('appointment.form.no')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                      <Textarea placeholder={t('appointment.form.messagePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={appointmentMutation.isPending}>
                {appointmentMutation.isPending && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                {appointmentMutation.isPending
                  ? t('appointment.form.submitting')
                  : t('appointment.form.submit')}
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--text-title)]">{t('appointment.info.title')}</h3>
            <p>{t('appointment.info.description')}</p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-[var(--background-light)] border border-[var(--border)] shadow">
            <Map />
          </div>
        </div>
      </div>
    </section>
  );
}
