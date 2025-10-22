import { type NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import Note from "@/features/notes/types/Note";

const filePath = path.join(process.cwd(), "data", "notes.json");

async function readNotes() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeNotes(notes: Note[]) {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2), "utf-8");
}

export async function GET() {
  const notes = await readNotes();
  return NextResponse.json({ notes });
}

export async function POST(request: NextRequest) {
  const newNote = await request.json();
  const notes = await readNotes();
  notes.push(newNote);
  await writeNotes(notes);
  return NextResponse.json({ note: newNote }, { status: 201 });
}
