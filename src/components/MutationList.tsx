import { Button } from "@/components/ui/button";
import { queries } from "@/lib/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function MutationList() {
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: queries.house.detail._def,
    });
  }, [queryClient]);

  return <Button onClick={onClick}>Create Book</Button>;
}
