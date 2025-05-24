import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from './lib/queryClient';
import { useToast } from './hooks/use-toast';
import { useAuth } from './context/AuthContext';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Checkbox } from './components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Alert, AlertDescription } from './components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Lock } from 'lucide-react';

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Le nom d'utilisateur est requis" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
  remember: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const DoctorLogin = () => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, user } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/espace-medecins/dashboard');
    }
  }, [user, navigate]);
  
  // Update page title
  useEffect(() => {
    document.title = t('meta.loginTitle');
  }, [t]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      setAuthError(null);
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json();
    },
    onSuccess: (data) => {
      login(data);
      toast({
        title: t('login.success.title'),
        description: t('login.success.message'),
      });
      navigate('/espace-medecins/dashboard');
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      setAuthError(t('login.error.invalidCredentials'));
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // We don't send the remember field to the API
    const { username, password } = data;
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="py-16 bg-neutral-100 min-h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
              <CardDescription className="text-center">
                {t('login.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {authError && (
                <Alert variant="destructive" className="mb-4">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertDescription>
                    {authError}
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.form.username')}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('login.form.usernamePlaceholder')}
                            {...field}
                            disabled={loginMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.form.password')}</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder={t('login.form.passwordPlaceholder')}
                            {...field}
                            disabled={loginMutation.isPending}
                          />
                        </FormControl>
                        <FormMessage />
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
                              disabled={loginMutation.isPending}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm cursor-pointer">
                              {t('login.form.remember')}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <a href="#" className="text-sm text-primary hover:underline">
                      {t('login.form.forgot')}
                    </a>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full transition-all hover:-translate-y-0.5 hover:shadow-md"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? t('login.form.loggingIn') : t('login.form.submit')}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-center w-full text-text-medium">
                {t('login.help')} <a href="#contact" className="text-primary hover:underline">{t('login.contact')}</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
