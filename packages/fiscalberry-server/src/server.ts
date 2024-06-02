import express from "express";
import * as http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: Socket) => {
	console.log("A user connected");

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});

server.listen(12000, () => {
	console.log("Server listening on port 12000");
});
