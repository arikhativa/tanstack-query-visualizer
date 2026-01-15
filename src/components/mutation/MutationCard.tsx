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
import { Radiation } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MutationEditSheet } from "@/components/mutation/MutationEditSheet";
import { MutationRemove } from "@/components/mutation/MutationRemove";

interface Props {
  queryItem: QueryItem;
}

export function MutationCard({ queryItem }: Props) {
  const { queryKey, label } = queryItem;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return (
    <div className="flex items-center gap-4">
      <MutationRemove id={queryItem.id} />
      <Item variant={"outline"} className={""}>
        <MutationEditSheet current={queryItem}>
          <ItemContent className="flex gap-2 flex-row cursor-pointer">
            <ItemTitle>{label}</ItemTitle>
            <Separator orientation={"vertical"} />
            <div className="flex-1">{toStringTQueryKeys(queryKey)}</div>
          </ItemContent>
        </MutationEditSheet>
        <Separator orientation={"vertical"} />
        <ItemActions>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Invalidate"
                onClick={() => mutation.mutate()}
              >
                <Radiation />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Invalidate</p>
            </TooltipContent>
          </Tooltip>
        </ItemActions>
      </Item>
    </div>
  );
}
