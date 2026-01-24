import type { QueryItem } from "@/lib/types";

import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { QueryKeys } from "@/components/QueryKeys";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  queryItem: QueryItem;
  remove: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  Sheet: React.ComponentType<{ current: QueryItem; children: React.ReactNode }>;
}

export function InteractiveItem({
  Sheet,
  className,
  queryItem,
  remove,
  actions,
}: Props) {
  const { queryKey, label } = queryItem;

  return (
    <div className="flex items-center gap-4 w-full">
      {remove}
      <Sheet current={queryItem}>
        <Button
          variant={"outline"}
          className={cn("flex-1 h-fit flex py-2 px-0", className)}
        >
          <Item>
            <ItemContent className={"flex gap-4 flex-row flex-wrap"}>
              <ItemTitle>{label}</ItemTitle>
              <Separator orientation={"vertical"} />
              <QueryKeys className="flex-1" list={queryKey} />
            </ItemContent>
          </Item>
        </Button>
      </Sheet>
      {actions}
    </div>
  );
}
