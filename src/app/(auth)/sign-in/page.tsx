"use server";

import { SignInForm } from "~/app/_components/auth/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/_components/ui/card";
import { TabsContent } from "~/app/_components/ui/tabs";

export default async function SignInPage() {
  return (
    <TabsContent value="sign-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <SignInForm />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
