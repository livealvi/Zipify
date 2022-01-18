const submit = document.getElementById("submit");
const file = document.getElementById("file");
const cancel = document.getElementById("cancel");
const BtnBox = document.getElementById("btnBox");
const FormLabel = document.getElementById("label");
const FileInfo = document.getElementById("FileInfo");
const Container = document.getElementById("form");

// UPLOADED FILES
let AllFiles = JSON.parse(localStorage.getItem("Files")) || [];
console.log(AllFiles);
// UPDATE UI
const updateUI = (is) => {
  if (is) {
    BtnBox.style.display = "flex";
    FormLabel.innerHTML = `<i class="fas fa-plus"></i> Upload More`;
    FileInfo.textContent = `Total ${
      JSON.parse(localStorage.getItem("Files")).length
    } files uploaded`;
  } else {
    BtnBox.style.display = "none";
    FormLabel.style.innerHTML = `<i class="fas fa-plus"></i> Upload files to Compress`;
    FileInfo.textContent = `Total 0 files uploaded`;
  }
};

// Clear Files
const ClearFiles = () => {
  localStorage.clear();
  updateUI(false);
};

// UPLOAD FILES TO THE SERVER
const uploadFiles = async (file) => {
  if (file) {
    const data = new FormData();
    data.append("FileName", file.name);
    data.append("file", file);
    await fetch("http://localhost/Upload", {
      method: "POST",
      body: data,
    });
  }
};

// UPLOAD FILE ON THE USER INPUT
file.addEventListener("change", (event) => {
  const Files = event.target.files;
  const len = Object.keys(Files).length;
  for (let i = 0; i < len; i++) {
    AllFiles.push(Files[i].name);
    uploadFiles(Files[i]);
  }
  localStorage.setItem("Files", JSON.stringify(AllFiles));
  updateUI(true);
});

submit.addEventListener("click", () => {
  fetch("http://localhost/compress/zipper", {
    method: "POST",
    body: JSON.stringify({
      file: JSON.parse(localStorage.getItem("Files")),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.status === "Success") {
        Container.style.backgroundColor = "var(--success)";
        window.location.href = `/success/${res.file}`;
      } else {
        window.location.href = `/error`;
      }
    });
  ClearFiles();
  updateUI(false);
});

cancel.addEventListener("click", ClearFiles);

localStorage.getItem("Files") === null ? updateUI(false) : updateUI(true);
