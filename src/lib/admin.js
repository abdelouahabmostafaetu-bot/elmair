import { currentUser } from "@clerk/nextjs/server";

// Returns the current Clerk user and whether they are the admin.
// Admin = the email that matches ADMIN_EMAIL in your environment.
export async function getAuthState() {
  let user = null;
  try {
    user = await currentUser();
  } catch (e) {
    user = null;
  }
  if (!user) return { user: null, isAdmin: false, email: null };

  const email = (
    user.primaryEmailAddress?.emailAddress ||
    user.emailAddresses?.[0]?.emailAddress ||
    ""
  ).toLowerCase();

  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const isAdmin = !!email && !!adminEmail && email === adminEmail;

  return { user, isAdmin, email };
}
