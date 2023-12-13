import { generateRandomToken } from "@/utils/RandomToken";
import Users from "@/models/users";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { connectMongoDB } from "@/db/mongoDB";

connectMongoDB();

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ error: true, message: "mehtod tidak diijinkan" });
    }

    const { username, password, isKeepLogin } = req.body;
    // validasi kosong atau tidak

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
    // cek apakah user ada
    const user = await Users.findOne({ username, password });

    console.log("user: ", user);

    if (!user || !user.username) {
      return res.status(400).json({
        error: true,
        message: "user tidak ditemukan",
      });
    }

    // lengkapi data yg kurang
    const token = generateRandomToken(10);

    if (isKeepLogin) {
      setCookie("token", token, { req, res, maxAge: 60 * 60 * 24 * 30 }); // 1 bulan
    }

    // jika sudah sesuai simpan
    const users = await Users.findOneAndUpdate(
      { username, password },
      { token },
      { new: true }
    );
    console.log("users after update: ", users);

    // kasih tahu client (hanya data yg diperbolehkan)
    return res.status(200).json({ token, isKeepLogin: !!isKeepLogin });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ error: true, message: "ada masalah harap hubungi developer" });
  }
}
