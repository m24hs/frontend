import { Wrapper } from "../styles/components/Maintence";
import LogoSvg from "../assets/logo.svg";

const Maintence = (props) => {
  return (
    <Wrapper>       
       <img src={LogoSvg} />
       <div>Em manutenção</div>
    </Wrapper>
  );
};

export default Maintence;
