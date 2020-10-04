import { useRouter } from "next/router";

const Logout = () => {
   const router = useRouter();
   router.push("/");

   return(<></>)
}

export default Logout;