import { Card, CardContent } from "@/components/ui/card";
import type { IconType } from "react-icons";

interface MetricCardProps {
  title: string;
  value: string | number;
  Icon?: IconType;
  description: string;
  trend?: number | null;
}

export function MetricCard({
  title,
  value,
  Icon,
  description,
  trend,
}: MetricCardProps) {
  return (
    <Card className="max-w-full">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-1">
            {Icon && <Icon size={20} />} {value}
          </p>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
