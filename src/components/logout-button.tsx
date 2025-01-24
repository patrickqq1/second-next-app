import Logout from "@/actions/signout";
import { Button } from "./ui/button";

export default function ButtonLogout() {
  return (
    <Button className="w-full" variant="destructive" onClick={Logout}>
      Sair
    </Button>
  );
}
