import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toStringTQueryKeys } from "@/lib/utils";
import type { QueryItem } from "@/lib/types";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
  queryItem: QueryItem;
}

export function MutationCard({ queryItem: { queryKey, label } }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return (
    <Item variant={"outline"} className={""}>
      <ItemContent className="flex gap-2 flex-row">
        <ItemTitle>{label}</ItemTitle>
        <Separator orientation={"vertical"} />
        <div className="flex-1">{toStringTQueryKeys(queryKey)}</div>
      </ItemContent>
      <ItemActions>
        <Button onClick={() => mutation.mutate()}>Invalidation</Button>
      </ItemActions>
    </Item>
  );
}
