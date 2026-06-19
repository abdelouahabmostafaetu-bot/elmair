import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb, serialize } from "@/lib/mongodb";
import { getAuthState } from "@/lib/admin";

export const dynamic = "force-dynamic";

function oid(id) {
  try { return new ObjectId(id); } catch (e) { return null; }
}

export async function PUT(req, { params }) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = oid(params.id);
  if (!_id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  try {
    const body = await req.json();
    const update = {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.image !== undefined && { image: body.image }),
    };
    const db = await getDb();
    await db.collection("projects").updateOne({ _id }, { $set: update });
    const doc = await db.collection("projects").findOne({ _id });
    return NextResponse.json(serialize(doc));
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { isAdmin } = await getAuthState();
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const _id = oid(params.id);
  if (!_id) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  try {
    const db = await getDb();
    await db.collection("projects").deleteOne({ _id });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
