import http from "node:http";
import app from "./app";
import { initWs } from "./ws";

const httpServer = http.createServer(app);
initWs(httpServer);

const PORT = process.env.PORT || 5000;

httpServer.on("error", (error: Error) => {
  console.log(`❌ Server error: ${error}`);
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
