import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useState, useRef, type ReactNode, useEffect } from "react";

interface FormProps<T> {
  ref?: React.Ref<any>;
  defaultValues: T;
  onSubmit: (value: T) => void;
}

interface FormSheetProps<T> {
  current: T;
  children: ReactNode;
  FormComponent: React.ComponentType<FormProps<T>>;
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

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        (formRef.current as any)?.submit?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-background/60" side={side}>
        {/* This is to remove warning */}
        <SheetDescription className="hidden" />

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
