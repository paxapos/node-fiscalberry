"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});
server.listen(12000, () => {
    console.log("Server listening on port 12000");
});
//# sourceMappingURL=server.js.map