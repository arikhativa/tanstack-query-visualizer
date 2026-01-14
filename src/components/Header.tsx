import {
  DEFAULT_VALUE,
  useStorage,
} from "@/components/providers/StorageProvider";
import { Button } from "@/components/ui/button";

export function Header({ className }: React.ComponentProps<"header">) {
  const { setStorage } = useStorage();

  return (
    <header className={className}>
      <Button onClick={() => setStorage(DEFAULT_VALUE)}>Reset</Button>
    </header>
  );
}
