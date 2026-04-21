"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "@/components/dev-portfolio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendContactMessage } from "@/app/actions/contact";
import { AlertTriangle, CheckCircle, Loader, Send } from "lucide-react";
import Typewriter from "@/components/ui/typewriter";


const initialState = {
  success: false,
  error: null,
  issues: null,
};

function SubmitButton() {
  const { t } = useTranslation();
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          {t('contactForm.status.loading')}
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          {t('aboutPage.form.submit')}
        </>
      )}
    </Button>
  );
}

function FormContent({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      onSuccess();
      formRef.current?.reset();
    }
  }, [state.success, onSuccess]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('aboutPage.form.name')}</Label>
        <Input id="name" name="name" placeholder={t('aboutPage.form.namePlaceholder')} />
        {state.issues?.name && (
          <p className="text-destructive text-xs mt-1">{state.issues.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{t('aboutPage.form.email')}</Label>
        <Input id="email" type="email" name="email" placeholder={t('aboutPage.form.emailPlaceholder')} />
         {state.issues?.email && (
          <p className="text-destructive text-xs mt-1">{state.issues.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t('aboutPage.form.message')}</Label>
        <Textarea id="message" name="message" placeholder={t('aboutPage.form.messagePlaceholder')} />
         {state.issues?.message && (
          <p className="text-destructive text-xs mt-1">{state.issues.message[0]}</p>
        )}
      </div>
       {state.error && (
        <div className="text-destructive text-sm flex items-center gap-2 p-2 bg-destructive/10 rounded-md">
          <AlertTriangle className="h-4 w-4" />
          <p>{state.error}</p>
        </div>
      )}
      <DialogFooter>
        <SubmitButton />
      </DialogFooter>
    </form>
  );
}

export function ContactForm() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'success'>('idle');

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setTimeout(() => {
         setFormState('idle');
      }, 300);
    }
  };

  const handleSuccess = () => {
    setFormState('success');
    setTimeout(() => {
      handleOpenChange(false);
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full sm:w-auto dark:border dark:border-primary dark:text-primary dark:hover:bg-accent">
          <Send className="mr-2 h-4 w-4" />
          {t('aboutPage.messageButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Typewriter text={t('aboutPage.form.contactTitle')} />
          </DialogTitle>
          <DialogDescription>
            {t('aboutPage.form.contactNote')}
          </DialogDescription>
        </DialogHeader>
        {formState === 'success' ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
             <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
             <h3 className="text-xl font-semibold">{t('contactForm.status.successTitle')}</h3>
             <p className="text-muted-foreground mt-2">{t('contactForm.status.successMessage')}</p>
          </div>
        ) : (
          <FormContent onSuccess={handleSuccess} />
        )}
      </DialogContent>
    </Dialog>
  );
}