const http = require("http");
const port = 5000;
const host = "localhost";

const request = (req, res) => {
  const { url, method } = req;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  let body;
  if (url === "/") {
    if (method === "GET") {
      res.end("<h1>Ini adalah homepage</h1>");
    } else {
      res.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.end("Halo! Ini adalah halaman about");
    } else if (method === "POST") {
      req.on("data", (data) => {
        body = JSON.parse(data);
      });
      req.on("end", () => {
        res.end(`Halo, ${body.name} Ini adalah halaman about`);
      });
    } else {
      res.end(`Halaman tidak dapat diakses dengan ${method} request`);
    }
  } else {
    res.end(JSON.stringify({ page: `Halaman tidak Ditemukan` }));
  }
};

const server = http.createServer(request);

server.listen(port, host, () => {
  console.log(`Server berjalan Pada http://${host}:${port}`);
});
