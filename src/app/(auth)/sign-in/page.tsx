"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInFormSchema } from "@/utils/authSchema";
import { authClient } from "@/utils/auth-client";
import { toast } from "@/hooks/use-toast";


const Signin = () => {

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
          email:"",
          password:""
        },
      })
    
      async function onSubmit(values: z.infer<typeof signInFormSchema>) {
        const {email, password} = values;
        const {} = await authClient.signIn.email(
          {
            email,
            password,
            // callbackURL: "/dashboard",
          }, {
            onRequest: () => {
              toast({
                title: "Please wait...",
              })
            },
            onSuccess: () => {
              toast({
                title: "Successfully Signed up",
              })
              form.reset()
            },
            onError: (ctx) => {
              toast({ title: ctx.error.message, variant: 'destructive' });
              form.setError('email', {
                type: 'manual',
                message: ctx.error.message
              })
            },
          }
        );
      }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome Back</CardDescription>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{' '}
          <Link href='/sign-up' className="W text-black">Sign up</Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Signin;
