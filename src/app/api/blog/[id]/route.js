import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb, serialize } from "@/lib/mongodb";
import { getAuthState } from "@/lib/admin";

export const dynamic = "force-dynamic";

function oid(id) {
  try { return new ObjectId(id); } catch (e) { return null; }
}

// PUT /api/blog/:id  -> update a post (admin only)
export async function PUT(req, { params }) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = oid(params.id);
  if (!_id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  try {
    const body = await req.json();
    const update = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.slug !== undefined && { slug: body.slug }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.cover !== undefined && { cover: body.cover }),
      ...(body.video !== undefined && { video: body.video }),
      updatedAt: new Date().toISOString(),
    };
    const db = await getDb();
    await db.collection("posts").updateOne({ _id }, { $set: update });
    const doc = await db.collection("posts").findOne({ _id });
    return NextResponse.json(serialize(doc));
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE /api/blog/:id  -> delete a post (admin only)
export async function DELETE(req, { params }) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = oid(params.id);
  if (!_id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  try {
    const db = await getDb();
    await db.collection("posts").deleteOne({ _id });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
