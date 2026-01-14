import { useQueryListData } from "@/hooks/useQueryListData";
import { QuerySheet } from "./QuerySheet";
import { QueryCard } from "../QueryCard";

export function QueryList() {
  const queryList = useQueryListData();
  return (
    <>
      <p>QueryList</p>
      {queryList.map((e) => (
        <QueryCard
          key={e.label}
          // this should use a formArray id
          queryItem={e}
        />
      ))}
      <QuerySheet />
    </>
  );
}
