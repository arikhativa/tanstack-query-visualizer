import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";

interface Props {
  keys: string[];
  label: string;
  children: React.ReactNode;
}

export function DataCard({ keys, label, children }: Props) {
  return (
    <Card>
      <CardHeader>keys: [{keys.join(", ")}]</CardHeader>
      <CardContent>
        <Label>{label}</Label>
        {children}
      </CardContent>
    </Card>
  );
}
