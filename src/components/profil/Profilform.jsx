// src/components/Profile.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Profile = () => {
  const [formData, setFormData] = useState({
    token: "", // Tambahkan token dalam state
    name: "",
    address: "",
    photo: null,
    children: [{ childName: "", childPhoto: null }],
  });

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil token otentikasi dari cookie
    const authToken = Cookies.get("authToken");

    // Pastikan token otentikasi tersedia sebelum melakukan permintaan
    if (!authToken) {
      console.error("Authentication token not available");
      setLoading(false); // Set loading menjadi false untuk menghentikan tampilan loading jika token tidak tersedia
      return;
    }

    // Set token ke dalam state
    setFormData((prevFormData) => ({
      ...prevFormData,
      token: authToken,
    }));

    // Lakukan permintaan ke server dengan token otentikasi
    fetch("http://localhost:3003/profil", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []); // Gunakan array dependensi kosong agar useEffect hanya dijalankan sekali setelah render pertama

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    if (name === "childName" || name === "childPhoto") {
      const newChildren = [...formData.children];
      newChildren[index][name] = value;

      setFormData((prevFormData) => ({
        ...prevFormData,
        children: newChildren,
      }));
    } else if (name === "photo" && files && files[0]) {
      const file = files[0];

      if (isImageFile(file)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            photo: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const isImageFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleAddChild = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      children: [...prevFormData.children, { childName: "", childPhoto: null }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dapatkan token otentikasi dari state
    const authToken = formData.token;

    // Pastikan token otentikasi tersedia sebelum melakukan permintaan
    if (!authToken) {
      console.error("Authentication token not available");
      return;
    }

    // Lakukan permintaan ke server dengan token otentikasi dan data formulir
    fetch("http://localhost:3003/profil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setProfiles([...profiles, data]);
        setFormData({
          token: authToken, // Pertahankan token dalam state
          name: "",
          address: "",
          photo: null,
          children: [{ childName: "", childPhoto: null }],
        });

        // Gunakan SweetAlert2 untuk memberi tahu pengguna bahwa formulir telah berhasil disubmit
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Formulir berhasil dikirim!",
          timer: 2000, // Tutup setelah 2 detik
          showConfirmButton: false,
        }).then(() => {
          // Redirect ke halaman setelah SweetAlert2 ditutup
          window.location.href = "/dataanak";
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 border-2 rounded-lg shadow-lg border-slate-300 bg-secondary">
      <h2 className="mb-6 text-3xl font-semibold">Profil Stunting</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Foto
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            id="photo"
            name="photo"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-600">
            Data Anak
          </label>
          {formData.children.map((child, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                name="childName"
                value={child.childName}
                onChange={(e) => handleChange(e, index)}
                placeholder="Nama Anak"
                className="w-1/2 px-4 py-2 mr-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="file"
                accept="image/jpeg, image/png"
                name="childPhoto"
                onChange={(e) => handleChange(e, index)}
                placeholder="Alamat Foto Anak"
                className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddChild}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Tambah Anak
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Simpan Profil
        </button>
      </form>
    </div>
  );
};

export default Profile;
