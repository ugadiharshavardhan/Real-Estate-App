import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignIn
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#1B4332] hover:bg-[#133024] text-sm",
            card: "shadow-xl border border-gray-100 rounded-[32px] p-4",
            headerTitle: "font-playfair text-2xl font-bold",
          },
        }}
      />
    </div>
  );
}
