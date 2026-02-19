import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center">
      <SignUp appearance={{
        elements: {
          rootBox: "w-full",
          card: "shadow-none border border-slate-200 bg-white w-full",
          headerTitle: "text-2xl font-bold text-slate-900",
          headerSubtitle: "text-slate-500",
          socialButtonsBlockButton: "border-slate-200 hover:bg-slate-50 text-slate-700",
          formButtonPrimary: "bg-slate-900 hover:bg-slate-800 text-white",
          footerActionLink: "text-blue-600 hover:text-blue-700"
        }
      }} />
    </div>
  );
}