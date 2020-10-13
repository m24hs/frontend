const Logout = () => {
  if (typeof window !== "undefined") {
    window.location.href = "";
  }

  return <></>;
};

export default Logout;
