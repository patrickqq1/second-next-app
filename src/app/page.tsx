"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [isPending, setIsPending] = useState(false);
  const loginSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsPending(true);
      const data = await login(values.username, values.password);
      if (data?.error) {
        toast({
          variant: "destructive",
          description:
            data?.error === "Invalid credentials!"
              ? "Credenciais inválidas"
              : data?.error,
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-96 bg-zinc-800 rounded-sm p-6 text-white"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario:</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription>This is your username.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha:</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
