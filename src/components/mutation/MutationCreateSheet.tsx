import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { queryItemSchema } from "@/lib/schemas";
import type { QueryItem } from "@/lib/types";
import { useForm } from "@tanstack/react-form";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const defaultValues: QueryItem = {
  label: "",
  queryKey: [],
} as const;

export function MutationCreateSheet() {
  const { pushItem } = useMutationListData();
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: queryItemSchema,
    },
    onSubmit: async ({ value }) => {
      pushItem(value);
      toast.success("New Mutation Created");
      setOpen(false);
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Plus />
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>New Mutation</SheetTitle>
        </SheetHeader>
        <form>
          <FieldGroup>
            <form.Field
              name="label"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Mutation Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Create Lead"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
        <SheetFooter>
          <Button asChild variant={"outline"}>
            <SheetClose>Cancel</SheetClose>
          </Button>
          <Button type="button" onClick={form.handleSubmit}>
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
