"use client";

import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateContext";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const BuildingSelector = () => {
  const {
    selectedBuilding,
    setSelectedBuilding,
    buildings,
    fetchBuildings,
    resetSelections,
  } = useStateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleSelectBuilding = (building) => {
    setSelectedBuilding(building);
    resetSelections();
    setValue(building.buildingName);
    setOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Chọn tòa nhà</h2>
      <div className="flex flex-col md:flex-row space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value || "Chọn tòa nhà..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm tòa nhà..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy tòa nhà.</CommandEmpty>
                <CommandGroup>
                  {buildings.map((building) => (
                    <CommandItem
                      key={building.buildingId}
                      value={building.buildingName}
                      onSelect={() => handleSelectBuilding(building)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedBuilding?.buildingId === building.buildingId
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {building.buildingName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="hidden md:flex space-x-2">
          {buildings.map((building) => (
            <Button
              key={building.buildingId}
              onClick={() => handleSelectBuilding(building)}
              variant={
                selectedBuilding?.buildingId === building.buildingId
                  ? "default"
                  : "outline"
              }
            >
              {building.buildingName}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingSelector;
