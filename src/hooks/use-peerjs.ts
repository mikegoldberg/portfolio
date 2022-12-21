import { useEffect, useState } from "react";
import Peer from "peerjs";
import { DataConnection } from "peerjs/dist/types";

export enum CONNECTION_STATES {
  Disconnected,
  Connecting,
  Connected,
  Sending,
  Recieving,
}

interface UsePeerJSProps {
  onOpen: (id: string) => void;
  onData: (data: any) => void;
  isHost: boolean;
  hostId: string | null;
}

const usePeerJS = ({ onOpen, isHost, hostId, onData }: UsePeerJSProps) => {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [connectionState, setConnectionState] = useState(
    CONNECTION_STATES.Disconnected
  );
  const [hostConnection, setHostConnection] = useState<DataConnection | null>(
    null
  );
  const [clients, setClients] = useState<Array<DataConnection>>([]);

  useEffect(() => {
    if (peerInstance === null) {
      const peer = new Peer({ debug: 2 });
      peer.on("open", (id) => {
        if (hostId !== null) {
          setConnectionState(CONNECTION_STATES.Connecting);
          const host = peer.connect(hostId, {
            serialization: "json",
          });
          host.on("open", () => {
            setClients([host]);
            setConnectionState(CONNECTION_STATES.Connected);
            setHostConnection(host);
          });
          host.on("data", onData);
        } else {
          setConnectionState(CONNECTION_STATES.Connected);
        }
        onOpen(id);
      });
      peer.on("connection", function (connection) {
        clients.push(connection);
        setClients(clients);
        connection.on("data", async (data: any) => {
          clients.forEach((connection) => connection.send(data));
          onData(data);
        });
      });

      setPeerInstance(peer);
    }
  }, [onData, isHost, hostId, clients, onOpen, peerInstance]);

  const sendData = (event: string, params?: object): void => {
    if (hostId) {
      hostConnection?.send({ event, params });
    } else {
      clients.forEach((connection) => connection.send({ event, params }));
    }
  };

  return { sendData, connectionState };
};

export default usePeerJS;
