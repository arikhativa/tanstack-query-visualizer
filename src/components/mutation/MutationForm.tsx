import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { queryItemSchema } from "@/lib/schemas";
import type { QueryItem } from "@/lib/types";
import { useForm } from "@tanstack/react-form";
import { forwardRef, useImperativeHandle } from "react";

export interface MutationFormHandle {
  submit: () => void;
}

interface Props {
  defaultValues: QueryItem;
  onSubmit: (v: QueryItem) => void;
}

export const MutationForm = forwardRef<MutationFormHandle, Props>(
  ({ defaultValues, onSubmit }, ref) => {
    const form = useForm({
      defaultValues,
      validators: {
        onSubmit: queryItemSchema,
      },
      onSubmit: async ({ value }) => {
        onSubmit(value);
      },
    });

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(),
    }));

    return (
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
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    );
  }
);

MutationForm.displayName = "MutationForm";
