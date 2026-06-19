import { NextResponse } from "next/server";
import { getDb, serialize } from "@/lib/mongodb";
import { getAuthState } from "@/lib/admin";

export const dynamic = "force-dynamic";

function slugify(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || String(Date.now());
}

// GET /api/blog            -> list all posts
// GET /api/blog?slug=xxx   -> single post by slug
export async function GET(req) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const db = await getDb();
    const query = slug ? { slug } : {};
    const docs = await db.collection("posts").find(query).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(docs.map(serialize));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}

// POST /api/blog  -> create a post (admin only)
export async function POST(req) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    const now = new Date().toISOString();
    const doc = {
      title: body.title,
      slug: body.slug ? slugify(body.slug) : slugify(body.title),
      excerpt: body.excerpt || "",
      content: body.content || "",
      cover: body.cover || "",
      video: body.video || "",
      createdAt: now,
      updatedAt: now,
    };
    const db = await getDb();
    const r = await db.collection("posts").insertOne(doc);
    return NextResponse.json(serialize({ _id: r.insertedId, ...doc }));
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
