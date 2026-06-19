import Link from "next/link";
import { getAuthState } from "@/lib/admin";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { user, isAdmin, email } = await getAuthState();

  if (!user) {
    return (
      <div className="auth-wrap">
        <div className="panel" style={ { maxWidth: "440px", textAlign: "center" } }>
          <h3>لوحة التحكم — Admin</h3>
          <p className="help">يرجى تسجيل الدخول للوصول إلى لوحة التحكم.<br/>Please sign in to access the dashboard.</p>
          <Link href="/sign-in" className="btn btn--accent" style={ { marginTop: "14px" } }>تسجيل الدخول / Sign in</Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="auth-wrap">
        <div className="panel" style={ { maxWidth: "480px", textAlign: "center" } }>
          <h3>غير مصرّح — Access denied</h3>
          <p className="help">
            هذا الحساب (<b>{email}</b>) ليس حساب المسؤول.<br/>
            This account is not the admin. Sign in with the email set in <b>ADMIN_EMAIL</b>.
          </p>
        </div>
      </div>
    );
  }

  return <AdminClient />;
}
