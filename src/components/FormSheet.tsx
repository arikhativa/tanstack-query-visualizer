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
import { toast } from "sonner";
import { useState, useRef, type ReactNode, type ElementType } from "react";

interface FormSheetProps<T> {
  current?: T;
  children: ReactNode;
  FormComponent: ElementType;
  onSave: (value: T) => void;
  title: string;
  side: React.ComponentProps<typeof SheetContent>["side"];
  toastString: string;
}

export function FormSheet<T, H>({
  children,
  current,
  toastString,
  FormComponent,
  onSave,
  title,
  side,
}: FormSheetProps<T>) {
  const formRef = useRef<H>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (value: T) => {
    onSave(value);
    toast.success(toastString);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-background/60" side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <FormComponent
            ref={formRef}
            defaultValues={current}
            onSubmit={handleSubmit}
          />
        </div>
        <SheetFooter>
          <Button asChild variant="outline">
            <SheetClose>Cancel</SheetClose>
          </Button>
          <Button
            type="button"
            onClick={() => (formRef.current as any)?.submit()}
          >
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
