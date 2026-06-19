import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LangProvider } from "@/components/LangProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "مركز المعيار للبحوث والدراسات | Al-Meiyar Center",
  description:
    "مركز المعيار للبحوث والدراسات — البحث العلمي، النشر الدولي في Scopus، براءات الاختراع، والاستشارات المؤسسية.",
  keywords:
    "براءات الاختراع الجزائر, مجلات Scopus, التدريب المؤسسي, استشارات ISO, النشر العلمي",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="ar" dir="rtl">
        <body>
          <LangProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LangProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
