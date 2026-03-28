const http = require("http");
const { URL } = require("url");

const server = http.createServer((req, res) => {
  const method = req.method;

  // Parse da URL para pegar query params
  const url = new URL(req.url, `http://${req.headers.host}`);
  const statusParam = url.searchParams.get("status");

  // Mapeamento simples de status code -> texto
  const statusMap = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    404: "Not Found",
    500: "Internal Server Error",
  };

  // Define status code (default 200)
  const statusCode = statusParam ? parseInt(statusParam) : 200;
  const statusText = statusMap[statusCode] || "Unknown";

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  const response = {
    msg: `Você fez um ${method}`,
  };

  // Se passou ?status=xxx, adiciona no retorno
  if (statusParam) {
    response.status = statusText;
  }

  res.end(JSON.stringify(response));
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});