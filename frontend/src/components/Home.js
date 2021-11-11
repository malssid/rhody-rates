import Auth from "../utils/Auth";
import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { setIsAuthenticated, setUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const data = await Auth.signOut();
    if (data.success) {
      setUser(data.user);
      setIsAuthenticated(false);
      toast({
        title: "Successfully Logged Out",
        status: "success",
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
  };
  return (
    <>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
}
