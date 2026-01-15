import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { QueryItem } from "@/lib/types";
import { useForm } from "@tanstack/react-form";
import { forwardRef, useImperativeHandle } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const typeEnum = {
  String: "String",
  Number: "Number",
  Object: "Object",
  Null: "Null",
  Undefined: "Undefined",
} as const;

const typeSelect: Array<{ label: TypeEnum; value: TypeEnum }> = [
  { label: "String", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Object", value: "Object" },
  { label: "Null", value: "Null" },
  { label: "Undefined", value: "Undefined" },
] as const;

export type TypeEnum = (typeof typeEnum)[keyof typeof typeEnum];

const unionSchema = z.union([
  z.string(),
  z.number(),
  z.object(),
  z.null(),
  z.undefined(),
]);

const pairSchema = z.object({
  type: z.enum(typeEnum),
  value: unionSchema,
});

// const outputSchema = z.object({
//   id: z.uuid(),
//   label: z.string().min(1),
//   queryKey: z.array(unionSchema).min(1),
// });

const formSchema = z.object({
  id: z.uuid(),
  label: z.string(),
  queryKey: z.array(pairSchema),
});

export type FormValues = z.infer<typeof formSchema>;

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
      defaultValues: queryItemToForm(defaultValues),
      validators: {
        onSubmit: formSchema,
        // TODO onBlur
      },
      onSubmit: async ({ value }) => {
        const v = formToQueryItem(value);
        onSubmit(v);
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

          <form.Field name="queryKey" mode="array">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FieldSet className="gap-4">
                  <FieldLegend variant="label">Email Addresses</FieldLegend>
                  <FieldGroup className="gap-4">
                    {field.state.value.map((_, index) => (
                      <form.Field
                        key={index}
                        name={`queryKey[${index}].type`}
                        children={(subField) => {
                          const isSubFieldInvalid =
                            subField.state.meta.isTouched &&
                            !subField.state.meta.isValid;
                          return (
                            <Field
                              orientation="horizontal"
                              data-invalid={isSubFieldInvalid}
                            >
                              <FieldContent>
                                <InputGroup>
                                  <Select
                                    name={subField.name}
                                    value={subField.state.value}
                                    onValueChange={(v: string) =>
                                      subField.handleChange(v as TypeEnum)
                                    }
                                  >
                                    <SelectTrigger
                                      id="form-tanstack-select-language"
                                      aria-invalid={isInvalid}
                                      className="min-w-30"
                                    >
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent position="item-aligned">
                                      <SelectItem value="auto">Auto</SelectItem>
                                      <SelectSeparator />
                                      {typeSelect.map((e) => (
                                        <SelectItem
                                          key={e.value}
                                          value={e.value}
                                        >
                                          {e.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  {/* <InputGroupInput
                                    id={`form-array-queryKey-${index}`}
                                    name={subField}
                                    value={subField.state.value}
                                    onBlur={subField.handleBlur}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    aria-invalid={isSubFieldInvalid}
                                    placeholder="name@example.com"
                                    type="email"
                                    autoComplete="email"
                                  /> */}
                                  {field.state.value.length > 1 && (
                                    <InputGroupAddon align="inline-end">
                                      <InputGroupButton
                                        type="button"
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => field.removeValue(index)}
                                        aria-label={`Remove email ${index + 1}`}
                                      >
                                        <XIcon />
                                      </InputGroupButton>
                                    </InputGroupAddon>
                                  )}
                                </InputGroup>
                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </FieldContent>
                            </Field>
                          );
                        }}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        field.pushValue({ type: "String", value: "" })
                      }
                      disabled={field.state.value.length >= 5}
                    >
                      Add Key
                    </Button>
                  </FieldGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </FieldSet>
              );
            }}
          </form.Field>
        </FieldGroup>
      </form>
    );
  }
);

function queryItemToForm(item: QueryItem): FormValues {
  return {
    id: item.id,
    label: item.label,
    queryKey: item.queryKey.map((value) => {
      if (value === null) return { type: "Null" as const, value: "" };
      if (value === undefined) return { type: "Undefined" as const, value: "" };
      if (typeof value === "number")
        return { type: "Number" as const, value: String(value) };
      if (typeof value === "object")
        return { type: "Object" as const, value: JSON.stringify(value) };
      return { type: "String" as const, value: value };
    }),
  };
}

function formToQueryItem(form: FormValues) {
  return {
    id: form.id,
    label: form.label,
    queryKey: form.queryKey.map((pair) => {
      switch (pair.type) {
        case "Number":
          return Number(pair.value);
        case "Null":
          return null;
        case "Undefined":
          return undefined;
        case "Object":
          return JSON.parse(pair.value as string);
        case "String":
        default:
          return pair.value;
      }
    }),
  };
}

MutationForm.displayName = "MutationForm";
