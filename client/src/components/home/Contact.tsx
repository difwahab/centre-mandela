import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form';
import {
  MapPin, Phone, Printer, Mail, Facebook, Linkedin, Instagram,
} from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: "L'email doit être valide" }),
  subject: z.string().min(2, { message: 'Le sujet doit contenir au moins 2 caractères' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormValues) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.message'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.message'),
        variant: 'destructive',
      });
      console.error('Contact form submission error:', error);
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulaire */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-card p-8 rounded-xl shadow-md"
              >
                {['name', 'email', 'subject', 'message'].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof ContactFormValues}
                    render={({ field: f }) => (
                      <FormItem className="mb-4">
                        <FormLabel htmlFor={field}>
                          {t(`contact.form.${field}`)} *
                        </FormLabel>
                        <FormControl>
                          {field === 'message' ? (
                            <Textarea id={field} rows={5} {...f} autoComplete="on" />
                          ) : (
                            <Input
                              id={field}
                              type={field === 'email' ? 'email' : 'text'}
                              autoComplete={field}
                              {...f}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <Button
                  type="submit"
                  className="w-full transition-all hover:-translate-y-0.5 hover:shadow-md"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending
                    ? t('contact.form.sending')
                    : t('contact.form.send')}
                </Button>
              </form>
            </Form>
          </div>

          {/* Informations de contact */}
          <div>
            <div className="bg-muted p-8 rounded-xl h-full text-foreground">
              <h3 className="text-xl font-semibold mb-6">{t('contact.info.title')}</h3>

              <div className="space-y-6 mb-8">
                <ContactInfo icon={<MapPin />} title={t('contact.info.address.title')} content={t('contact.info.address.content')} />
                <ContactInfo icon={<Phone />} title={t('contact.info.phone.title')} content={t('contact.info.phone.content')} />
                <ContactInfo icon={<Printer />} title={t('contact.info.fax.title')} content={t('contact.info.fax.content')} />
                <ContactInfo icon={<Mail />} title={t('contact.info.email.title')} content={t('contact.info.email.content')} />
              </div>

              <h4 className="font-medium mb-3">{t('contact.info.followUs')}</h4>
              <div className="flex space-x-4">
                <SocialIcon icon={<Facebook />} />
                <SocialIcon icon={<Linkedin />} />
                <SocialIcon icon={<Instagram />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => (
  <div className="flex items-start">
    <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-muted-foreground">{content}</p>
    </div>
  </div>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all"
  >
    {icon}
  </a>
);

export default Contact;
