import { Button } from "@/components/ui/button";
import { queries } from "@/lib/queryKey";
import type { TQueryKeys } from "@/lib/types";
import { toStringTQueryKeys } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SingleMutationProps {
  queryKey: TQueryKeys;
}

interface ManyMutationProps {
  name: string;
  queryKeyList: TQueryKeys[];
}

function SingleMutation({ queryKey }: SingleMutationProps) {
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey,
    });
  }, [queryClient]);

  return <Button onClick={onClick}>{toStringTQueryKeys(queryKey)}</Button>;
}

function ManyMutation({ name, queryKeyList }: ManyMutationProps) {
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    queryKeyList.forEach((queryKey) => {
      queryClient.invalidateQueries({
        queryKey,
      });
    });
  }, [queryClient]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={onClick}>{name}</Button>
      </TooltipTrigger>
      <TooltipContent>
        {queryKeyList.map((e) => toStringTQueryKeys(e))}
      </TooltipContent>
    </Tooltip>
  );
}

export function MutationList() {
  return (
    <>
      <SingleMutation queryKey={queries.house._def} />
      <SingleMutation queryKey={queries.house.detail._def} />
      <SingleMutation queryKey={queries.house.detail("H2").queryKey} />
      <SingleMutation queryKey={queries.house.list._def} />
      <SingleMutation
        queryKey={
          queries.house.list({
            page: 0,
            limit: 4,
          }).queryKey
        }
      />
      <SingleMutation
        queryKey={
          queries.house.list({
            filters: { byResidentIdList: ["R1"] },
          }).queryKey
        }
      />
      <SingleMutation
        queryKey={
          queries.house.list({
            filters: { byResidentIdList: ["R2"] },
          }).queryKey
        }
      />

      <ManyMutation
        name="edit R3 (e.g. not owner of H1 anymore)"
        queryKeyList={[queries.house.detail._def]}
      />
    </>
  );
}
