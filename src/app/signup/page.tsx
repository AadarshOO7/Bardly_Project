
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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setUser({ name: values.name, email: values.email });
    router.push('/home');
  };

  return (
    <div className="flex min-h-screen items-center justify-center signup-bg">
      <div className="absolute inset-0 bg-black/60"></div>
      <Card className="w-full max-w-sm shadow-2xl z-10 bg-black/40 text-white border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline tracking-wider">Create Account</CardTitle>
          <CardDescription className="text-neutral-300 pt-2">Join our community of writers</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter Your Name" {...field} className="bg-transparent border-0 border-b rounded-none px-1 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-primary" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
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
                SIGN UP
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-xs text-neutral-300">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:underline font-semibold">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
