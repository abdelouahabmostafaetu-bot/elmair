import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="auth-wrap">
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" fallbackRedirectUrl="/admin" />
    </div>
  );
}
