import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    token: "",
    name: "",
    address: "",
    photo: null,
    children: [{ childName: "", childPhoto: null }],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      console.error("Authentication token not available");
      setLoading(false);
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      token: authToken,
    }));

    fetch("http://localhost:3003/profil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setFormData(data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files[0]) {
      if (isImageFile(files[0])) {
        processFile(files[0], (result) => {
          setFormData((prevFormData) => ({ ...prevFormData, photo: files[0] }));
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "File Tidak Valid",
          text: "Pilih file gambar dengan format JPEG atau PNG.",
        });
      }
    } else if (name.startsWith("child")) {
      const updatedChildren = formData.children.map((child, childIndex) => {
        if (index === childIndex) {
          return {
            ...child,
            [name]:
              name === "childPhoto" && files && files[0] ? files[0] : value,
          };
        }
        return child;
      });

      setFormData((prevFormData) => ({
        ...prevFormData,
        children: updatedChildren,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const processFile = (file, callback) => {
    if (isImageFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = formData.token;

    if (!authToken) {
      console.error("Authentication token not available");
      return;
    }

    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);

    // Append photo if it's a File object
    if (formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }

    // Handle children data
    formData.children.forEach((child, index) => {
      formDataToSend.append(`children[${index}][childName]`, child.childName);

      if (child.childPhoto instanceof File) {
        formDataToSend.append(
          `children[${index}][childPhoto]`,
          child.childPhoto
        );
      }
    });

    try {
      const response = await axios.put(
        "http://localhost:3003/profil",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data after submission:", response.data);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Perubahan berhasil disimpan!",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/dataanak";
      });
    } catch (error) {
      console.error(
        "Axios error:",
        error.response ? error.response.data : error
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl p-8 mx-auto mt-8 border-2 rounded-lg shadow-lg border-slate-300 bg-secondary">
      <h2 className="mb-6 text-3xl font-semibold">Edit Profil</h2>
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
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
