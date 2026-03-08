
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/user-context';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const loginSuccess = login(values.email);
    if (loginSuccess) {
      router.push('/home');
    } else {
      toast({
        title: "Login Failed",
        description: "No account found with that email. Please sign up first.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center auth-bg">
      <div className="absolute inset-0 bg-black/60"></div>
      <Card className="w-full max-w-sm shadow-2xl z-10 bg-black/40 text-white border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline tracking-wider">Bardly</CardTitle>
          <CardDescription className="text-neutral-300 pt-2">Login to continue your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your Email" {...field} className="bg-transparent border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-primary" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="password" placeholder="Enter Your Password" {...field} className="bg-transparent border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-primary" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-4">
                LOGIN
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-neutral-300">
            Don't have an account?{' '}
            <Link href="/signup" className="text-white hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
