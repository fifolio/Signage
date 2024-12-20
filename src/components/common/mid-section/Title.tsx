// STORES
import { useFileName } from "@/stores"

export default function Title() {

  // Get the file name from the store
  const { currentFileName } = useFileName()

  return (
    <div className="font-semibold">{currentFileName}</div>
  )
}
