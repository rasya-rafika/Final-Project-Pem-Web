document.addEventListener("DOMContentLoaded", function () {
    loadDoctors();

    document.getElementById("doctorForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addDoctor();
    });

    // Validasi input nomor telepon agar hanya angka
    document.getElementById("phoneNumber").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, ""); // Hanya izinkan angka
    });
});

// Simpan data di localStorage
let doctors = JSON.parse(localStorage.getItem("doctors")) || [];

// Tambah Dokter
function addDoctor() {
    let name = document.getElementById("doctorName").value.trim();
    let specialization = document.getElementById("specialization").value.trim();
    let phone = document.getElementById("phoneNumber").value.trim();

    if (name === "" || specialization === "" || phone === "") {
        alert("Semua kolom harus diisi!");
        return;
    }

    doctors.push({ name, specialization, phone });
    saveDoctors();
    loadDoctors();
    document.getElementById("doctorForm").reset();
}

// Tampilkan Dokter
function loadDoctors() {
    let doctorTableBody = document.querySelector("#doctorTable tbody");
    doctorTableBody.innerHTML = ""; // Hapus isi tabel sebelum update

    doctors.forEach((doctor, index) => {
        let row = `<tr>
            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.phone}</td>
            <td>
                <button class="edit" onclick="editDoctor(${index})">Edit</button>
                <button class="delete" onclick="deleteDoctor(${index})">Hapus</button>
            </td>
        </tr>`;
        doctorTableBody.innerHTML += row;
    });
}

// Edit Dokter
function editDoctor(index) {
    let doctor = doctors[index];

    document.getElementById("doctorName").value = doctor.name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("phoneNumber").value = doctor.phone;

    doctors.splice(index, 1); // Hapus data lama agar diperbarui
    saveDoctors();
    loadDoctors();
}

// Hapus Dokter
function deleteDoctor(index) {
    if (confirm("Yakin ingin menghapus dokter ini?")) {
        doctors.splice(index, 1);
        saveDoctors();
        loadDoctors();
    }
}

// Simpan ke LocalStorage
function saveDoctors() {
    localStorage.setItem("doctors", JSON.stringify(doctors));
}
