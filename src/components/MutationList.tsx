import { Button } from "@/components/ui/button";
import { queries } from "@/lib/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface SingleMutationProps {
  queryKey: readonly string[];
}

function SingleMutation({ queryKey }: SingleMutationProps) {
  const queryClient = useQueryClient();

  const onClick = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey,
    });
  }, [queryClient]);

  return <Button onClick={onClick}>[{queryKey.join(", ")}]</Button>;
}

export function MutationList() {
  // const queryClient = useQueryClient();

  return (
    <>
      <SingleMutation queryKey={queries.house._def} />
      <SingleMutation queryKey={queries.house.detail._def} />
      <SingleMutation queryKey={queries.house.detail("H2").queryKey} />
      <SingleMutation queryKey={queries.house.list().queryKey} />
      {/* <Button onClick={houseDetailClick}>[{houseDetail.join(", ")}]</Button> */}
    </>
  );
}
