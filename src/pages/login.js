import styles from "@/styles/login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isKeepLogin, setKeepLogin] = useState(false);

  return (
    <div className={`${styles.container}`}>
      <div className={styles.card}>
        <h1>Sign</h1>
        <div className={styles.summary}>
          Enter your email and password to sign in!
        </div>
        <div className={styles.fieldInput}>
          <div className={styles.label}>
            username<span className={styles.star}>*</span>
          </div>
          <input
            className={styles.input}
            placeholder="12345"
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
            className={styles.input}
            placeholder="******"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  console.log(e.target.checked);
                  let isChecked = e.target.checked;
                  localStorage.setItem("keepLogin", isChecked);
                  setKeepLogin(isChecked);
                }}
              ></input>
              <span> Keep Me Logged In</span>
            </div>
            <div>
              <Link href="/registrasi">Belum punya akun? Ke registration</Link>
            </div>
          </div>
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={async (e) => {
            const data = { username, password, isKeepLogin };
            console.log("click daftar by: ", data);

            try {
              const res = await fetch("/api/login", {
                method: "POST", // Corrected the typo in 'method'
                body: JSON.stringify(data), // Assuming 'data' is an object that you want to send as JSON
                headers: {
                  "Content-Type": "application/json", // Specifying the content type as JSON
                },
              });
              const responseData = await res.json();
              if (res.ok) {
                // Periksa apakah respons memiliki status code 200 (OK)
                // Mendapatkan data JSON dari respons
                console.log("responseData: ", responseData); //ex: {token: 'Id2Qs257T0', isKeepLogin: true}
                localStorage.setItem("keepLogin", responseData.isKeepLogin);

                if (!responseData.isKeepLogin) {
                  sessionStorage.setItem("token", responseData.token);
                }

                alert("sukses login");
                router.push("/list-notes");
              } else {
                console.error("Gagal melakukan permintaan:", res.status);
                console.log(responseData);
                alert(responseData.message);
              }
            } catch (error) {
              console.log("error: ", error);
              alert("Terjadi Kesalahan, harap hubungi team support");
            }
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
