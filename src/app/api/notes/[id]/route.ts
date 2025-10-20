import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import Note from "@/features/notes/types/Note";

const filePath = path.join(process.cwd(), "data", "notes.json");


async function readNotes() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeNotes(notes: Note[]) {
  await fs.writeFile(filePath, JSON.stringify(notes, null, 2), "utf8");
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const updatednote = await req.json();
  const notes = await readNotes();
  const idx = notes.findIndex((n: Note) => n.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  notes[idx] = { ...notes[idx], ...updatednote };
  await writeNotes(notes);

  return NextResponse.json({ note: notes[idx] });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let notes = await readNotes();
  const filtered = notes.filter((n: Note) => n.id !== id);

  if (filtered.length === notes.length) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  await writeNotes(filtered);
  return NextResponse.json({ success: true });
}