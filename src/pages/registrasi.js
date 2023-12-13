import styles from "@/styles/registrasi.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Daftar() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={`${styles.container}`}>
      <div className={styles.card}>
        <h1>Daftar</h1>
        <div className={styles.summary}>Masukkan data secara lengkap</div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            Name<span className={styles.star}>*</span>
          </div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={styles.input}
            placeholder="your full name"
          />
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            username<span className={styles.star}>*</span>
          </div>
          <input
            value={username}
            className={styles.input}
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            Password<span className={styles.star}>*</span>
          </div>
          <input
            value={password}
            className={styles.input}
            placeholder="******"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={async () => {
            const data = { name, username, password };
            console.log("click daftar by: ", data);

            try {
              const res = await fetch("/api/registrasi", {
                method: "POST", // Corrected the typo in 'method'
                body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                headers: {
                  "Content-Type": "application/json", // Specifying the content type as JSON
                },
              });

              const responseData = await res.json(); // Mendapatkan data JSON dari respons
              console.log(responseData);
              alert("Data sudah sukses didaftarkan");

              if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                router.push("/login");
              } else {
                console.error("Gagal melakukan permintaan:", res.data);
                alert("Data gagal didaftarkan");
              }
            } catch (error) {
              console.log("error: ", error);
              alert("Terjadi Kesalahan, harap hubungi team support");
            }
          }}
        >
          Daftar
        </button>
      </div>
    </div>
  );
}
