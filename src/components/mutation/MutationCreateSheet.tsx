import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export function MutationCreateSheet() {
  return (
    <Sheet>
      <SheetTrigger>New Mutation</SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>New Mutation</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
