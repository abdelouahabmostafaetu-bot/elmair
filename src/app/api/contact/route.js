import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// POST /api/contact -> save a lead (public).
// Leads are stored in MongoDB and can be reviewed by the admin.
export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }
    const doc = {
      identity: body.identity || "",
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      service: body.service || "",
      orgSize: body.orgSize || "",
      message: body.message || "",
      createdAt: new Date().toISOString(),
      handled: false,
    };
    const db = await getDb();
    await db.collection("leads").insertOne(doc);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
