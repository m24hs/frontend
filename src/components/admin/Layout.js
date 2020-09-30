import { useState } from "react";

import Menu from "./Menu";
import Sidebar from "./Sidebar";

import { Wrapper, Container } from "../../styles/components/admin/Layout";
import { Whatsapp as WhatsappIcon } from "@styled-icons/icomoon";

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
    </Container>
  );
};

export default Layout;
