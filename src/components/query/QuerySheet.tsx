import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function QuerySheet() {
  return (
    <Sheet>
      <SheetTrigger>Open QuerySheet</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>QuerySheet</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
