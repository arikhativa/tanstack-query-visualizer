import { useQueryListData } from "@/hooks/useQueryListData";
import { QueryCard } from "./QueryCard";
import { ItemList } from "@/components/ItemList";
import { QueryCreateSheet } from "@/components/query/QueryCreateSheet";

export function QueryList() {
  const { list } = useQueryListData();
  return (
    <ItemList>
      {list.map((e) => (
        <QueryCard key={e.id} queryItem={e} />
      ))}
      <QueryCreateSheet />
    </ItemList>
  );
}
