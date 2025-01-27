// UI
import { Button } from "../ui/button";

// ICONS
import { FcInfo } from "react-icons/fc";


export default function Info() {
  return (
    <a href="/discover" target="_blank">
      <Button variant="outline"><FcInfo className="!size-5" /></Button>
    </a>
  )
}
