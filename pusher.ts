import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1734493",
  key: "331ab3640a81dc80322b",
  secret: "d144b3ccb9dbe6b6ae71",
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherClient("331ab3640a81dc80322b", {
  cluster: "eu",
  authEndpoint: "/api/pusher-auth",
  authTransport: "ajax",
  auth: {
    headers: {
      "Content-Type": "application/json",
    },
  },
});
