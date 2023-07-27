type Props = {
  message: string;
  variant: string;
};

const Notification = ({ message, variant }: Props) => {
  const msgStyle = variant === "error" ? { color: "red" } : { color: "green" };
  return <div style={msgStyle}>{message}</div>;
};

export default Notification;
