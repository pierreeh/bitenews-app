import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, TriangleAlert } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import fetchRegister from '@/api/auth';

const registerSchema = z.object({
  firstname: z.string().min(1, { message: 'Firstname is required.' }),
  lastname: z.string().min(1, { message: 'Lastname is required.' }),
  email: z
    .string()
    .email({ message: 'Invalid email.' })
    .min(1, { message: 'Email is required.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [apiError, setApiError] = useState<any>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(body: z.infer<typeof registerSchema>) {
    try {
      setSubmitting(true);
      const register = await fetchRegister(body);

      if (register.status === 'error') {
        setErrors(register.message);
      } else if (register.status === 'success') {
        navigate('/', { replace: true });
      }

      form.reset();
      return register;
    } catch (e: unknown) {
      if (e instanceof Error) {
        setApiError(e.message);
      } else {
        setApiError('Something went wrong.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="w-[740px] mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Create your account</CardDescription>
      </CardHeader>

      <CardContent>
        {apiError && (
          <Alert className="bg-red-50 text-red-700 border-red-700 mb-6">
            <AlertDescription className="flex gap-2 items-center">
              <TriangleAlert /> {apiError}
            </AlertDescription>
          </Alert>
        )}
        {errors && (
          <Alert className="bg-red-50 text-red-700 border-red-700 mb-6">
            <AlertDescription className="flex gap-2">
              <TriangleAlert />
              <ul>
                {errors.map((e: any, i: number) => (
                  <li key={i} className="mb-2">
                    {e.message}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="absolute right-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full block"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-neutral-500 mt-4">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="underline text-black">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
