import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { QueryKeys } from "@/components/QueryKeys";

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
      <Item variant={"outline"} className={"p-0 m-0"}>
        <MutationEditSheet current={queryItem}>
          <ItemContent className="flex gap-2 min-h-10 flex-row cursor-pointer p-2">
            <ItemTitle>{label}</ItemTitle>
            <Separator orientation={"vertical"} />
            <QueryKeys className="flex-1" list={queryKey} />
          </ItemContent>
        </MutationEditSheet>
        <Separator orientation={"vertical"} />
        <ItemActions className="pe-2 py-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="size-12"
                variant="outline"
                aria-label="Invalidate"
                onClick={() => mutation.mutate()}
              >
                <Radiation className="size-8" />
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
