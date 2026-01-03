import { Button } from "@/components/ui/button";
import { queries } from "@/lib/queryKey";
import type { TQueryKeys } from "@/lib/types";
import { toStringTQueryKeys } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface SingleMutationProps {
  queryKey: TQueryKeys;
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
            filters: { byResidentIdList: ["R1"] },
          }).queryKey
        }
      />
      <SingleMutation
        queryKey={
          queries.house.list({
            page: 0,
            limit: 4,
          }).queryKey
        }
      />
    </>
  );
}
