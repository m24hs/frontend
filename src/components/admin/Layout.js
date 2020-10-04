import { useState } from "react";

import Menu from "./Menu";
import Sidebar from "./Sidebar";
import Loading from "../Loading";
import Error from "../Error";

import { Wrapper, Container } from "../../styles/components/admin/Layout";

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
