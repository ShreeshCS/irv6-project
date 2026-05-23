import { NextResponse } from "next/server";
import { AsyncDatabase } from "promised-sqlite3";

export async function GET() {
  const db = await AsyncDatabase.open("./notes.db");
  const users = await db.all("SELECT * FROM users");
  return NextResponse.json(users);
}