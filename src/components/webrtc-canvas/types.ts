type HostId = null | string;
type IsHost = boolean;

type OnOpen = {
  (id: string): void;
};

export type DrawPosition = {
  x: number;
  y: number;
};

export interface WebRtcCanvasProps {
  onOpen?: OnOpen;
  hostId?: HostId;
  isHost?: IsHost;
}

export interface OnDataProps {
  event: string;
  params: any;
}

export type Vector2 = {
  x: number;
  y: number;
};
