const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const os = require('os')

const server = http.createServer(async (req, res) => {
  // Logic akan ditambahkan disini
  server.on("request", async (req, res) => {
    // Jalankan logging tanpa menunggu
    logRequest(req);

    // Handle response
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Home Page");
    } else if (req.url === "/health") {
      const memory = {
        total: formatBytes(os.totalmem()),
        used: formatBytes(os.totalmem() - os.freemem()),
        free: formatBytes(os.freemem()),
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(memory));
    } else {
      res.writeHead(404);
      res.end("Page Not Found");
    }
  });
});

async function logRequest(req) {
  const timestamp = new Date().toISOString();
  const logData = `[${timestamp}] ${req.method} ${req.url} FROM ${req.socket.remoteAddress}\n`;

  const logPath = path.join(__dirname, "requests.log");

  try {
    await fs.appendFile(logPath, logData);
  } catch (error) {
    console.error("Logging error:", error);
  }
}

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
