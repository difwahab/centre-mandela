import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

import {
  Button,
  Input,
  Checkbox,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Alert,
  AlertDescription,
} from "@/components/ui";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Lock } from "lucide-react";

// === Validation Schema ===
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Le nom d'utilisateur est requis" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
  remember: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// === Component ===
const DoctorLogin = () => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { login, user } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  // === Redirect if logged in ===
  useEffect(() => {
    if (user) navigate("/espace-medecins/dashboard");
  }, [user, navigate]);

  // === Update document title ===
  useEffect(() => {
    document.title = t("meta.loginTitle");
  }, [t]);

  // === Mutation ===
  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: Omit<LoginFormValues, "remember">) => {
      setAuthError(null);
      const res = await apiRequest("POST", "/api/auth/login", { username, password });
      return res.json();
    },
    onSuccess: (data) => {
      login(data);
      toast({
        title: t("login.success.title"),
        description: t("login.success.message"),
      });
      navigate("/espace-medecins/dashboard");
    },
    onError: () => {
      setAuthError(t("login.error.invalidCredentials"));
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({ username: data.username, password: data.password });
  };

  return (
    <div className="py-16 bg-neutral-100 min-h-[calc(100vh-8rem)]">
      <div className="container max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Lock className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl">{t("login.title")}</CardTitle>
            <CardDescription>{t("login.subtitle")}</CardDescription>
          </CardHeader>

          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login.form.username")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("login.form.usernamePlaceholder")}
                          disabled={loginMutation.isPending}
                          {...field}
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
                      <FormLabel>{t("login.form.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("login.form.passwordPlaceholder")}
                          disabled={loginMutation.isPending}
                          {...field}
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
                      <FormItem className="flex flex-row items-start space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={loginMutation.isPending}
                          />
                        </FormControl>
                        <FormLabel className="text-sm">{t("login.form.remember")}</FormLabel>
                      </FormItem>
                    )}
                  />

                  <a href="#" className="text-sm text-primary hover:underline">
                    {t("login.form.forgot")}
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all hover:-translate-y-0.5 hover:shadow-md"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending
                    ? t("login.form.loggingIn")
                    : t("login.form.submit")}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter>
            <p className="text-sm text-center w-full text-text-medium">
              {t("login.help")}{" "}
              <a href="#contact" className="text-primary hover:underline">
                {t("login.contact")}
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DoctorLogin;
