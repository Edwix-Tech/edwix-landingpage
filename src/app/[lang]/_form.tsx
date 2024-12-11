import React from 'react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '@/lib/api/mutations';
import type { RegisterPayload } from '@/lib/api/mutations';
import { Check, X, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

const formSchema = (t: (key: string) => string) =>
  z.object({
    firstname: z.string().min(1, t('validation.firstname.required')),
    lastname: z.string().min(1, t('validation.lastname.required')),
    email: z.string().email(t('validation.email.invalid')),
    password: z.string(),
    confirmPassword: z
      .string()
      .min(6, t('validation.password.minLength'))
      .regex(/[0-9]/, t('validation.password.requireNumber'))
      .regex(/[a-zA-Z]/, t('validation.password.requireLetter')),
    promoCode: z.string().min(1, t('validation.promoCode.required')),
  });

type FormValues = z.infer<ReturnType<typeof formSchema>>;

function PasswordRequirements({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  const t = useTranslations('landing');
  const hasMinLength = password.length >= 6;
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const requirementStyle = (met: boolean) =>
    cn('flex items-center gap-2 text-xs', met ? 'text-primary' : 'text-red-600');

  const iconCheck = <Check className="w-4 h-4" />;
  const iconX = <X className="w-4 h-4" />;

  return (
    <div className="flex w-full justify-center gap-4 px-2 mt-1 font-medium flex-wrap">
      <div className={requirementStyle(hasMinLength)}>
        {hasMinLength ? iconCheck : iconX} {t('validation.passwordRequirements.minLength')}
      </div>
      <div className={requirementStyle(hasNumber)}>
        {hasNumber ? iconCheck : iconX} {t('validation.passwordRequirements.number')}
      </div>
      <div className={requirementStyle(hasLetter)}>
        {hasLetter ? iconCheck : iconX} {t('validation.passwordRequirements.letter')}
      </div>
      <div className={requirementStyle(passwordsMatch)}>
        {passwordsMatch ? iconCheck : iconX} {t('validation.passwordRequirements.match')}
      </div>
    </div>
  );
}

export function HomePageForm() {
  const { toast } = useToast();
  const t = useTranslations('landing');
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      promoCode: '',
    },
  });

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) => register(data),
    onSuccess: () => {
      setShowConfirmation(true);
      form.reset();
    },
    onError: error => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Error',
        description: t('validation.password.mismatch'),
        variant: 'destructive',
      });
      return;
    }

    registerMutation.mutate(data);
  };

  const renderFieldText = (opts: {
    name: keyof FormValues;
    hideLabel?: boolean;
    hideMessage?: boolean;
  }) => (
    <FormField
      control={form.control}
      name={opts.name}
      render={({ field }) => (
        <FormItem>
          {!opts.hideLabel && (
            <FormLabel className="font-bold">{t(`form.fields.${opts.name}.label`)}</FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Input
                placeholder={t(`form.fields.${opts.name}.placeholder`)}
                {...field}
                className="bg-white border-2 border-black rounded-full h-10 text-sm"
                type={
                  opts.name === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : opts.name === 'confirmPassword'
                    ? showConfirmPassword
                      ? 'text'
                      : 'password'
                    : 'text'
                }
              />
              {(opts.name === 'password' || opts.name === 'confirmPassword') && (
                <button
                  type="button"
                  onClick={() =>
                    opts.name === 'password'
                      ? setShowPassword(!showPassword)
                      : setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {(opts.name === 'password' && showPassword) ||
                  (opts.name === 'confirmPassword' && showConfirmPassword) ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {opts.name === 'confirmPassword' && (
            <PasswordRequirements
              password={form.watch('password')}
              confirmPassword={form.watch('confirmPassword')}
            />
          )}
          {!opts.hideMessage && <FormMessage className="font-medium text-center text-red-600" />}
        </FormItem>
      )}
    />
  );

  const confirmationDialog = (
    <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>{t('confirmation.title')}</DialogTitle>
          <DialogDescription>{t('confirmation.description')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" type="submit" onClick={() => setShowConfirmation(false)}>
            {t('confirmation.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card className="p-6 bg-foreground border-2 border-black shadow-plain-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderFieldText({
            name: 'firstname',
          })}

          {renderFieldText({
            name: 'lastname',
          })}

          {renderFieldText({
            name: 'email',
          })}

          {renderFieldText({
            name: 'password',
            hideMessage: true,
          })}

          {renderFieldText({
            name: 'confirmPassword',
            hideLabel: true,
            hideMessage: true,
          })}

          {renderFieldText({
            name: 'promoCode',
          })}

          <div className="h-2" />

          <Button
            size="lg"
            type="submit"
            className="w-full uppercase rounded-full border-2 border-black text-inverse font-bold shadow-plain hover:shadow-none transition-all font-dm-sans"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? t('form.submit.loading') : t('form.submit.default')}
          </Button>
        </form>
      </Form>
      {confirmationDialog}
    </Card>
  );
}
