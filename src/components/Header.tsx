import { useStorage } from "@/components/providers/StorageProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header({ className }: React.ComponentProps<"header">) {
  const { reset, clear } = useStorage();

  return (
    <header className={cn(" border-b flex items-center p-4 ", className)}>
      <div className="flex-1 flex gap-4">
        <Button variant={"secondary"} onClick={clear}>
          Clear
        </Button>
        <Button variant={"secondary"} onClick={reset}>
          Reset to default
        </Button>
      </div>
      <h1 className="flex-1 text-center">Tanstack Query Visualizer</h1>
      <div className="flex-1"></div>
    </header>
  );
}
