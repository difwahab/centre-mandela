import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const DoctorPortal = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const handleDemoSubmit = (values: LoginFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = '/espace-medecins/login';
    }, 1500);
  };

  return (
    <section id="espace-medecins" className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('doctorPortal.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('doctorPortal.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{t('doctorPortal.collaboration.title')}</h3>
            <p className="text-text-medium mb-6">
              {t('doctorPortal.collaboration.description')}
            </p>

            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start">
                  <Check className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">{t(`doctorPortal.features.feature${i}.title`)}</h4>
                    <p className="text-text-medium">{t(`doctorPortal.features.feature${i}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-text-medium mb-6">{t('doctorPortal.access')}</p>

            <Link href="#contact">
              <Button className="transition-all hover:-translate-y-0.5 hover:shadow-md">
                {t('doctorPortal.requestAccess')}
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-center">{t('doctorPortal.login.title')}</h3>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleDemoSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('doctorPortal.login.email')}</FormLabel>
                      <FormControl>
                        <Input placeholder="docteur@example.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('doctorPortal.login.password')}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            {t('doctorPortal.login.remember')}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <Link href="#" className="text-sm text-primary hover:underline">
                    {t('doctorPortal.login.forgot')}
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all hover:-translate-y-0.5 hover:shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('doctorPortal.login.loggingIn') : t('doctorPortal.login.submit')}
                </Button>
              </form>
            </Form>

            <div className="mt-6 pt-6 border-t border-neutral-200">
              <h4 className="font-medium mb-4 text-center">{t('doctorPortal.preview.title')}</h4>
              <div className="bg-neutral-100 rounded-md p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{t('doctorPortal.preview.system')}</div>
                  <span className="bg-success/20 text-success text-xs px-2 py-1 rounded-full">
                    {t('doctorPortal.preview.online')}
                  </span>
                </div>
                <p className="text-text-medium text-sm">
                  {t('doctorPortal.preview.description')}
                </p>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/espace-medecins/login"
                  className="text-primary hover:underline text-sm group"
                >
                  {t('doctorPortal.preview.demo')}
                  <Check className="inline-block h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorPortal;
