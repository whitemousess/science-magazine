import Pusher from "pusher-js";

export const subscribe = ({ channelName, eventName, handleEvent }) => {
  const pusher = new Pusher(process.env.REACT_APP_KEY_PUSHER, {
    cluster: process.env.REACT_APP_CLUSTER_PUSHER,
  });
  const channel = pusher.subscribe(channelName);

  channel.bind(eventName, () => {
    handleEvent();
  });
};

export const unsubscribe = () => {
};
