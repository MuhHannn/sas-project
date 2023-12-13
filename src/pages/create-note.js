import { useState } from "react";
import { useRouter } from "next/router";
import { postDataApi } from "@/utils/api";

export default function CreateNote() {
  const [formData, setFormData] = useState({
    title: "",
    Note: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simpan data ke API
      const response = await postDataApi("/api/createNote", formData);

      // Jika sukses, arahkan pengguna ke halaman lain
      if (response.success) {
        router.push("/dashboard"); // Ganti dengan halaman tujuan setelah berhasil membuat catatan
      }
    } catch (error) {
      console.error("Error creating note:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika terjadi kesalahan saat membuat catatan
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Note">Note:</label>
          <textarea
            id="Note"
            name="Note"
            value={formData.Note}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
