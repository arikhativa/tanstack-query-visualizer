import { useStorage } from "@/components/providers/StorageProvider";
import { Button } from "@/components/ui/button";

export function Header({ className }: React.ComponentProps<"header">) {
  const { reset, clear } = useStorage();

  return (
    <header className={className}>
      <Button onClick={clear}>Clear</Button>
      <Button onClick={reset}>Reset To Default</Button>
    </header>
  );
}
