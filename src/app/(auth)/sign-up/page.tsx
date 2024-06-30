import { SignUpForm } from "~/app/_components/auth/sign-up-form";
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
  );
}
