export const typeEnum = {
  String: "String",
  Number: "Number",
  Object: "Object",
  Null: "Null",
  Undefined: "Undefined",
} as const;

export type TypeEnum = (typeof typeEnum)[keyof typeof typeEnum];
