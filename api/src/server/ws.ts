import http from "node:http";
import { Server } from "socket.io";

const webUrl = process.env.WEB_URL;

export const initWs = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: webUrl,
      methods: ["*"],
    },
  });

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id as string;
    socket.join(id);

    socket.on("item", (msg) => {
      socket.broadcast.to(id).emit("item", msg);
    });

    socket.on("item-update", (msg) => {
      socket.broadcast.to(id).emit("item-update", msg);
    });

    socket.on("item-delete", (msg) => {
      socket.broadcast.to(id).emit("item-delete", msg);
    });

    socket.on("list-update", (msg) => {
      socket.broadcast.to(id).emit("list-update", msg);
    });
  });
};
