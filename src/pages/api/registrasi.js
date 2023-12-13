import { v4 as uuid } from "uuid";
import Users from "@/models/users";
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
  try {
    // pengecekan method
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: true, message: "mehtod tidak diijinkan" });
    }

    const { name, username, password } = req.body;
    // validasi dari client (ada atau tidak)
    if (!name) {
      return res.status(400).json({ error: true, message: "tidak ada Nama" });
    }

    if (!username) {
      return res
        .status(400)
        .json({ error: true, message: "tidak ada username" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "tidak ada Password" });
    }

    // validasi sesuai kreteria atau tidak
    if (name.length < 3 || name.length >= 20) {
      return res.status(400).json({
        error: true,
        message: "name harus diantar 3 sampai 20 karakter",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        error: true,
        message: "username harus lebih dari 3 karakter",
      });
    }

    if (password.length < 6 || password.length >= 10) {
      return res.status(400).json({
        error: true,
        message: "password harus diantar 6 sampai 10 karakter",
      });
    }
    // cek apakah id atau username sudah digunakan
    const user = await Users.findOne({ username });
    console.log("user: ", user);

    if (user && user.username) {
      return res.status(400).json({
        error: true,
        message: "username sudah pernah didaftarkan",
      });
    }

    // lengkapi data yg kurang
    const id = uuid();

    const data = { id, name, username, password };

    // jika sudah sesuai simpan
    const users = new Users(data);
    await users.save();

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(201).json({ id: users.id, username: users.username });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ error: true, message: "ada masalah harap hubungi developer" });
  }
}
