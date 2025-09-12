import { Sun } from "lucide-react"; // Importing sun icon from lucide-react 
import { Button } from "@/components/ui/button"; // Importing Button component from UI library 
export default function ModeToggle() {
  return (
    <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle Light Mode</span> 
        {/* Screen reader only text for accessibility */}
    </Button>
  )
}

