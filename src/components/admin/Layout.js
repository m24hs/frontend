import { useState, useEffect } from "react";

import Menu from "./Menu";
import Sidebar from "./Sidebar";
import Loading from "../Loading";
import Error from "../Error";

import { Wrapper, Container } from "../../styles/components/admin/Layout";
import cookieCutter from 'cookie-cutter';

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const cookie = cookieCutter.get('sidebarOpen') === "true";
    setSidebarOpen(cookie);
  },[props]);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    cookieCutter.set('sidebarOpen', !sidebarOpen);
  };

  return (
    <Container>
      <Menu handleToggleSidebar={handleToggleSidebar} />
      <Sidebar open={sidebarOpen} />
      <Wrapper {...props} sidebarOpen={sidebarOpen}>
        {props.children}
      </Wrapper>
      <Loading show={props.loading} />
      <Error text={props.error} />
    </Container>
  );
};

export default Layout;
