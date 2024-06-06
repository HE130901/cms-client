"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const ThreeLevelTabs = () => {
  const buildings = ["Tòa A", "Tòa B"];
  const floors = [
    "Tầng 1",
    "Tầng 2",
    "Tầng 3",
    "Tầng 4",
    "Tầng 5",
    "Tầng 6",
    "Tầng 7",
  ];
  const areas = [
    "Khu 1",
    "Khu 2",
    "Khu 3",
    "Khu 4",
    "Khu 5",
    "Khu 6",
    "Khu 7",
    "Khu 8",
  ];

  const [selectedBuilding, setSelectedBuilding] = React.useState<string | null>(
    null
  );
  const [selectedFloor, setSelectedFloor] = React.useState<string | null>(null);
  const [selectedArea, setSelectedArea] = React.useState<string | null>(null);

  return (
    <div>
      <Tabs defaultValue="building">
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-medium">Chọn tòa nhà</h2>
          <TabsList>
            {buildings.map((building) => (
              <TabsTrigger
                key={building}
                value={building}
                onClick={() => {
                  setSelectedBuilding(building);
                  setSelectedFloor(null); // Reset floor and area when building changes
                  setSelectedArea(null);
                }}
              >
                {building}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {selectedBuilding && (
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-medium">Chọn tầng</h2>
            <TabsList>
              {floors.map((floor) => (
                <TabsTrigger
                  key={floor}
                  value={floor}
                  onClick={() => {
                    setSelectedFloor(floor);
                    setSelectedArea(null); // Reset area when floor changes
                  }}
                >
                  {floor}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        )}

        {selectedFloor && (
          <div className="mb-4">
            <h2 className="mb-2 text-lg font-medium">Chọn khu</h2>
            <TabsList>
              {areas.map((area) => (
                <TabsTrigger
                  key={area}
                  value={area}
                  onClick={() => setSelectedArea(area)}
                >
                  {area}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        )}

        {selectedBuilding && (
          <TabsContent value={selectedBuilding}></TabsContent>
        )}
        {selectedFloor && <TabsContent value={selectedFloor}></TabsContent>}
        {selectedArea && <TabsContent value={selectedArea}></TabsContent>}
      </Tabs>
    </div>
  );
};

export { ThreeLevelTabs, Tabs, TabsList, TabsTrigger, TabsContent };
