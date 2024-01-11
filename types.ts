import Stripe from "stripe";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type UserRole = "PLAYER" | "ADMIN" | "GOD";

export type User = {
  id: string;
  name?: string;
  email?: string;
  emailVerified: Date;
  image?: string;
  password: string;
  points: number;
  role: UserRole;
  wins: number;
  defeats: number;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  updatedAtL: Date;
  accounts: Account[];
  players: Player[];
  playgrounds: TicTacToePlayGround[];
  twoFactorConfirmation?: TwoFactorConfirmation;
};

export type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: User;
};

export type Player = {
  symbol: string;
  name?: string;
  image?: string;
  points?: number;
  role: UserRole;
  userId: string;
  playGroundId: string;
  createdAt: Date;
  updatedAt: Date;
  playgrounds: TicTacToePlayGround;
  user: User;
};

export type TicTacToePlayGround = {
  id: string;
  inviteCode: string;
  status: string;
  userId: string;
  board: string;
  prise: number;
  minus: number;
  currentSymbol: string;
  created: Date;
  updatedAt: Date;
  players: Player[];
  user: User;
};

export type TwoFactorConfirmation = {
  id: string;
  userId: string;
  user: User;
};
