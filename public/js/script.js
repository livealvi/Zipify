const file = document.getElementById("file");

file.addEventListener("change", (event) => {
  fetch("http://localhost/compress", {
    method: "POST",
    body: {
      // file: JSON.stringify(event.target.files[0]),
      name: "Pulkit",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.status === "Success") {
        window.location.href = `/success/${res.file.split(".")[0]}`;
      } else {
        window.location.href = `/error`;
      }
    });
});
