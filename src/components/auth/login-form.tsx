"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schemas/auth";
import { PasswordInput } from "./password-input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

interface LoginFormProps {
  callbackUrl?: string;
}

export const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    login(values);
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
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
                  <FormLabel className="flex w-full">Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message="" />
          <FormSuccess message="" />
          <Button type="submit" className="w-full">
            <>
              <LogIn className="mr-2 h-4 w-4" /> Login
            </>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
