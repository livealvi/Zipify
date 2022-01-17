const file = document.getElementById("file");

file.addEventListener("change", (event) => {
  File = event.target.files[0];
  const data = new FormData();
  data.append("FileName", File.name);
  data.append("file", File);
  fetch("http://localhost/Upload", {
    method: "POST",
    body: data,
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .then(() => {
      fetch("http://localhost/compress", {
        method: "POST",
        body: JSON.stringify({
          file: {},
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
            window.location.href = `/success/${res.file.split(".")[0]}`;
          } else {
            window.location.href = `/error`;
          }
        });
    });
});
