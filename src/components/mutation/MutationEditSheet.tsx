import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMutationListData } from "@/hooks/useMutationListData";
import type { QueryItem } from "@/lib/types";
import { toast } from "sonner";
import { useState, useRef } from "react";
import {
  MutationForm,
  type MutationFormHandle,
} from "@/components/mutation/MutationForm";

interface Props {
  current: QueryItem;
  children: React.ReactNode;
}

export function MutationEditSheet({ children, current }: Props) {
  const formRef = useRef<MutationFormHandle>(null);

  const { replaceItem } = useMutationListData();
  const [open, setOpen] = useState(false);

  const onSubmit = (value: QueryItem) => {
    replaceItem(value);
    toast.success("Mutation Saved");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Edit Mutation</SheetTitle>
        </SheetHeader>
        <MutationForm
          ref={formRef}
          defaultValues={current}
          onSubmit={onSubmit}
        />
        <SheetFooter>
          <Button asChild variant={"outline"}>
            <SheetClose>Cancel</SheetClose>
          </Button>
          <Button type="button" onClick={() => formRef.current?.submit()}>
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
