import type Note from "../types/Note";

const API_URL = "/api/notes";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Request failed (${res.status}): ${errorText}`);
  }
  return res.json();
}

export const notesService = {
  async getAll(): Promise<Note[]> {
    const res = await fetch(API_URL);
    return handleResponse<{ notes: Note[] }>(res).then(data => data.notes);
  },

  async getOne(id: string): Promise<Note> {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    return handleResponse<{ note: Note }>(res).then(data => data.note);
  },

  async create(note: Note): Promise<Note> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    return handleResponse<{ note: Note }>(res).then(data => data.note);
  },

  async update(id: string, updates: Partial<Note>): Promise<Note> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return handleResponse<{ note: Note }>(res).then((data) => data.note);
  },

  async delete(id: string): Promise<boolean> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete note");
    return true;
  },
};
