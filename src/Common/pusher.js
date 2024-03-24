import Pusher from "pusher-js";

export const subscribe = ({ channelName, eventName, handleEvent }) => {
  const pusher = new Pusher(import.meta.env.VITE_KEY_PUSHER, {
    cluster: import.meta.env.VITE_CLUSTER_PUSHER,
  });
  const channel = pusher.subscribe(channelName);

  channel.bind(eventName, () => {
    handleEvent();
  });
};

export const unsubscribe = () => {
};
