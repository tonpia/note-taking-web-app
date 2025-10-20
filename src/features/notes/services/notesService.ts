import type Note from "../types/Note";

const API_URL = "/api/notes";

export const notesService = {
  async getAll(): Promise<Note[]> {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.notes;
  },

  async create(note: Note): Promise<Note> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    return data.note;
  },

  async update(id: string, updates: Partial<Note>): Promise<Note> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    return data.note;
  },

  async delete(id: string): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  },
};
