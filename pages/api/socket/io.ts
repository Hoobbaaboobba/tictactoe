import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIo } from "@/types";
import { ticTacToeRepository } from "@/components/Play/TicTacToeRepository/TicTacToeRepository";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", async (socket) => {
      socket.on("enter", (data) => {
        socket.join(data.playGroundId);
        io.emit("enter", ticTacToeRepository.getPlayers(data.playGroundId));
      });
      socket.on("message", (data) => {
        io.emit("message", data);
      });
      socket.on("step", (data) => {
        io.emit("step", data);
      });
    });
  }

  res.end();
};

export default ioHandler;
