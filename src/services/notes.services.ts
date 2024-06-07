import mssql from "mssql";
import dotenv from "dotenv";
import { NotesService } from "../interfaces/NotesService";
import { sqlConfig } from "../config/sqlConfig";
import { Note } from "../interfaces/Note";

dotenv.config();

export class Notes implements NotesService {
  public async getNotes() {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (await (await pool).request().execute("get_notes"))
        .recordset;
      if (result.length < 1) {
        return {
          message: "No notes found",
        };
      } else {
        return {
          notes: result,
        };
      }
    } catch {
      return {
        error: "Error retrieving notes",
      };
    }
  }

  public async getNote(id: string) {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool).request().input("id", id).execute("get_note")
      ).recordset;

      if (result.length < 1) {
        return {
          error: "Note not found",
        };
      } else {
        return {
          note: result,
        };
      }
    } catch {
      return {
        error: "Error retrieving note",
      };
    }
  }

  public async createNote(note: Note) {
    try {
      const pool = mssql.connect(sqlConfig);
      const results = (
        await (await pool)
          .request()
          .input("id", note.id)
          .input("title", note.title)
          .input("content", note.content)
          .input("created_at", note.created_at)
          .execute("create_note")
      ).rowsAffected;
      if (results[0] > 0) {
        return {
          error: "Project created successfully",
        };
      } else {
        return {
          error: "Error while creating project",
        };
      }
    } catch {
      return {
        error: "Error creating note",
      };
    }
  }

  public async updateNote(id: string, note: Note) {
    try {
      const pool = mssql.connect(sqlConfig);
      const results = (
        await (await pool)
          .request()
          .input("id", id)
          .input("title", note.title)
          .input("content", note.content)
          .execute("update_note")
      ).rowsAffected;
      if (results[0] < 1) {
        return {
          error: "Error while updating",
        };
      } else {
        return {
          message: "Project Updated successfully",
        };
      }
    } catch {
      return {
        error: "Error updating note",
      };
    }
  }

  public async deleteNote(id: string) {
    try {
      const pool = mssql.connect(sqlConfig);
      const result = (
        await (await pool).request().input("id", id).execute("delete_note")
      ).rowsAffected;
      if (result[0] < 1) {
        return {
          error: "Error deleting note",
        };
      } else {
        return {
          message: "Note deleted successfully",
        };
      }
    } catch {
      return {
        error: "Error deleting note",
      };
    }
  }
}
