import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryItem } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Radiation } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MutationEditSheet } from "@/components/mutation/MutationEditSheet";
import { MutationRemove } from "@/components/mutation/MutationRemove";
import { InteractiveItem } from "@/components/InteractiveItem";

interface Props {
  queryItem: QueryItem;
}

export function MutationCard({ queryItem }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryItem.queryKey,
      });
    },
  });

  return (
    <InteractiveItem
      queryItem={queryItem}
      Sheet={MutationEditSheet}
      remove={<MutationRemove id={queryItem.id} />}
      actions={
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="size-10 border-primary!"
              variant={"outline"}
              aria-label="Invalidate"
              onClick={() => mutation.mutate()}
            >
              <Radiation className="size-6 text-primary " />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Invalidate</p>
          </TooltipContent>
        </Tooltip>
      }
    />
  );
}
