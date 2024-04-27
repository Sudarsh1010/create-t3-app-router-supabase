import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { SignInForm } from "./_components/sign-in-form";
import { SignUpForm } from "./_components/sign-up-form";

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  return (
    <div className="m-auto flex w-full items-center justify-center p-4 md:my-auto md:min-h-screen">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sign in</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
