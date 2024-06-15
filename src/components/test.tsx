import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg dark:shadow-none">
      <img
        src="/placeholder.svg"
        alt="Product Image"
        width={400}
        height={400}
        className="w-full h-[300px] object-cover"
      />
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            Cozy Knit Sweater
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            A soft and warm knit sweater perfect for the autumn chill.
          </CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$49.99</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  );
}
