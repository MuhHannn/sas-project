import { connectMongoDB } from "@/db/mongoDB";
import NotesModel from "@/models/notes"; // Import model Notes

connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: true, message: "Method not allowed" });
    }

    const { title, Note, user_id } = req.body;

    // Buat catatan baru
    const newNote = new NotesModel({
      title,
      Note,
      user_id, // Pastikan ini adalah ID pengguna yang valid
    });

    // Simpan catatan baru ke dalam database
    await newNote.save();

    // Kirim respons sukses
    return res
      .status(200)
      .json({ success: true, message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    return res
      .status(500)
      .json({ error: true, message: "Failed to create note" });
  }
}
