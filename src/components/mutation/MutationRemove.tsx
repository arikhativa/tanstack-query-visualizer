import { Button } from "@/components/ui/button";
import { useMutationListData } from "@/hooks/useMutationListData";
import { Minus } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function MutationRemove({ id }: { id: string }) {
  const { removeItem } = useMutationListData();

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
