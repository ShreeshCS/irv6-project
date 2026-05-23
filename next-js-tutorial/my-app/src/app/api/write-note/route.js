import { NextResponse } from "next/server";
import { AsyncDatabase } from "promised-sqlite3";

export async function POST(req) {
  const formData = await req.formData();
  const from = formData.get("from_user");
  const to = formData.get("to_user");
  const note = formData.get("note");
  if (!from || !to || !note) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  const db = await AsyncDatabase.open("./notes.db");
  await db.run(
    "INSERT INTO notes (from_user, to_user, note) VALUES (?, ?, ?)",
    [from, to, note]
  );
  return NextResponse.json({ ok: true });
}