import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useQueryListData } from "@/hooks/useQueryListData";

export function QueryRemove({ id }: { id: string }) {
  const { removeItem } = useQueryListData();

  const mutation = useMutation({
    mutationFn: async () => removeItem(id),
    onSuccess: () => {
      toast("Removed Mutation");
    },
  });

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Remove"
      onClick={() => mutation.mutate()}
    >
      <Minus />
    </Button>
  );
}
