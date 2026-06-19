import { NextResponse } from "next/server";
import { getDb, serialize } from "@/lib/mongodb";
import { getAuthState } from "@/lib/admin";

export const dynamic = "force-dynamic";

// GET /api/portfolio -> list all projects
export async function GET() {
  try {
    const db = await getDb();
    const docs = await db.collection("projects").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(docs.map(serialize));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/portfolio -> create a project (admin only)
export async function POST(req) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    const now = new Date().toISOString();
    const doc = {
      title: body.title,
      category: body.category || "all",
      description: body.description || "",
      image: body.image || "",
      createdAt: now,
    };
    const db = await getDb();
    const r = await db.collection("projects").insertOne(doc);
    return NextResponse.json(serialize({ _id: r.insertedId, ...doc }));
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
