import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonAdd from "./Buttonadd";
import Cookies from "js-cookie";

const apiUrl = "http://localhost:3003/profil";

const ProfilCard = () => {
  const [profilData, setProfilData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(
    localStorage.getItem("isDeleted") === "true"
  );

  useEffect(() => {
    fetchProfilData();
  }, []);

  const fetchProfilData = async () => {
    try {
      const response = await axios.get(apiUrl);
      if (response.data && response.data.length > 0) {
        const userToken = Cookies.get("authToken");
        const matchingProfil = response.data.find(
          (profil) => profil.token === userToken
        );

        if (matchingProfil) {
          localStorage.removeItem("isDeleted");
          setProfilData(matchingProfil);
        } else {
          setIsDeleted(true);
        }
      } else {
        setIsDeleted(true);
      }
    } catch (error) {
      console.error("Error fetching profil data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      try {
        // Find and delete the associated child data based on the shared token
        const token = profilData.token;
        const childResponse = await axios.get("http://localhost:3001/anak");
        const childToDelete = childResponse.data.find(
          (child) => child.token === token
        );

        if (childToDelete) {
          await axios.delete(`http://localhost:3001/anak/${childToDelete.id}`);
          console.log("Child data deleted successfully:", childToDelete);
        } else {
          console.log("No matching child data found for deletion");
        }

        // Delete the profile data
        await axios.delete(`${apiUrl}/${profilData.id}`);

        Swal.fire({
          title: "Terhapus!",
          text: "Data telah berhasil dihapus.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.setItem("isDeleted", "true");
          setIsDeleted(true);

          // Refresh the page
          window.location.reload();
        });
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire("Gagal!", "Gagal menghapus data.", "error");
      }
    }
  };

  return (
    <>
      {isDeleted || !profilData ? (
        <ButtonAdd onSaveSuccess={fetchProfilData} />
      ) : (
        <div className="p-5 mx-auto mb-10 overflow-hidden bg-white rounded-lg shadow-lg">
          {/* Konten profil lainnya */}
          <h2 className="mb-2 text-xl font-bold">{profilData.name}</h2>
          <p className="text-base text-gray-700">{profilData.address}</p>
          <h3 className="mt-4 mb-2 text-lg font-bold">Anak:</h3>
          <ul className="list-disc list-inside">
            {profilData.children.map((child, index) => (
              <li key={index} className="text-gray-700">
                {child.childName}
              </li>
            ))}
          </ul>
          <div className="flex mt-4 space-x-4">
            <Link
              to={{
                pathname: "/editprofil",
                state: { profileData: profilData },
              }}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Edit data
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilCard;
