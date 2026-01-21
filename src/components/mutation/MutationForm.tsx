import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
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
  InputGroupInput,
} from "@/components/ui/input-group";
import { useForm } from "@tanstack/react-form";
import { forwardRef, useImperativeHandle } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import type { TypeEnum } from "@/lib/enums";
import type { QueryItem } from "@/lib/types";
import { queryItemFormSchema } from "@/lib/schemas";

const typeSelect: Array<{ label: TypeEnum; value: TypeEnum }> = [
  { label: "String", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Object", value: "Object" },
  { label: "Null", value: "Null" },
  { label: "Undefined", value: "Undefined" },
] as const;

export type FormValues = z.infer<typeof queryItemFormSchema>;

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
        onSubmit: queryItemFormSchema,
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
                  <FieldLegend variant="label">Query Keys</FieldLegend>
                  <FieldGroup className="gap-4 ">
                    {field.state.value.map((_, index) => (
                      <div key={index} className="flex gap-2">
                        <form.Field
                          name={`queryKey[${index}].type`}
                          listeners={{
                            onChange: ({ value }) => {
                              if (value === "Null") {
                                form.setFieldValue(
                                  `queryKey[${index}].value`,
                                  "null"
                                );
                              }
                              if (value === "Undefined") {
                                form.setFieldValue(
                                  `queryKey[${index}].value`,
                                  "undefined"
                                );
                              }
                            },
                          }}
                          children={(subField) => {
                            const isSubFieldInvalid =
                              subField.state.meta.isTouched &&
                              !subField.state.meta.isValid;
                            return (
                              <Field
                                className="w-30"
                                data-invalid={isSubFieldInvalid}
                              >
                                <Select
                                  name={subField.name}
                                  value={subField.state.value}
                                  onValueChange={(v: string) =>
                                    subField.handleChange(v as TypeEnum)
                                  }
                                >
                                  <SelectTrigger
                                    id={`form-mutation-type-${index}`}
                                    aria-invalid={isInvalid}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent position="item-aligned">
                                    {typeSelect.map((e) => (
                                      <SelectItem key={e.value} value={e.value}>
                                        {e.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                {isSubFieldInvalid && (
                                  <FieldError
                                    errors={subField.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />

                        <form.Field
                          validators={{
                            onChangeListenTo: [`queryKey[${index}].type`],
                            onChange: ({ value }) => {
                              const type = form.getFieldValue(
                                `queryKey[${index}].type`
                              );

                              if (type === "Number") {
                                if (value === "" || isNaN(Number(value))) {
                                  return {
                                    message: "Value must be a valid number",
                                  };
                                }
                              }

                              if (type === "Object") {
                                try {
                                  const parsed = JSON.parse(value as string);
                                  if (
                                    typeof parsed !== "object" ||
                                    parsed === null ||
                                    Array.isArray(parsed)
                                  ) {
                                    return new Error(
                                      "Value must be a valid JSON object"
                                    );
                                  }
                                } catch (e: any) {
                                  return e;
                                }
                              }
                              return undefined;
                            },
                          }}
                          name={`queryKey[${index}].value`}
                          children={(valueField) => {
                            const isValueInvalid =
                              valueField.state.meta.isTouched &&
                              !valueField.state.meta.isValid;
                            const currentType = field.state.value[index]?.type;
                            const isDisabled =
                              currentType === "Null" ||
                              currentType === "Undefined";

                            return (
                              <Field
                                data-invalid={isValueInvalid}
                                className="flex-1"
                              >
                                <InputGroup>
                                  <InputGroupInput
                                    id={`form-mutation-value-${index}`}
                                    name={valueField.name}
                                    value={String(valueField.state.value ?? "")}
                                    onBlur={valueField.handleBlur}
                                    onChange={(e) =>
                                      valueField.handleChange(e.target.value)
                                    }
                                    aria-invalid={isValueInvalid}
                                    placeholder={"Enter value"}
                                    disabled={isDisabled}
                                    autoComplete="off"
                                  />
                                  {field.state.value.length > 1 && (
                                    <InputGroupAddon align="inline-end"></InputGroupAddon>
                                  )}
                                </InputGroup>
                                {isValueInvalid && (
                                  <FieldError
                                    errors={valueField.state.meta.errors}
                                  />
                                )}
                              </Field>
                            );
                          }}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => field.removeValue(index)}
                          aria-label={`Remove key ${index + 1}`}
                        >
                          <XIcon />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        field.pushValue({ type: "String", value: "" })
                      }
                      disabled={field.state.value.length >= 10}
                    >
                      <Plus />
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
