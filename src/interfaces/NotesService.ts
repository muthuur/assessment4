import { Note } from "./Note";

export interface NotesService {
  getNotes(): Promise<{}>;
  getNote(id: string): Promise<{}>;
  createNote(note: Note): Promise<{}>;
  updateNote(id: string, note: Note): Promise<{}>;
  deleteNote(id: string): Promise<{}>;
}
