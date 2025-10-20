import { NextResponse } from "next/server";
// import data from "@/../public/assets/data/data.json";
import fs from "fs/promises";
import path from "path";
import Note from "@/features/notes/types/Note";

// export async function GET() {
//   return NextResponse.json(data);
// }

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

export async function POST(request: Request) {
  const newNote = await request.json();
  const notes = await readNotes();
  notes.push(newNote);
  await writeNotes(notes);
  return NextResponse.json({ notes: newNote }, { status: 201 });
}
