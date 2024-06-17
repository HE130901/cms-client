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

const FloorSelector = () => {
  const {
    selectedBuilding,
    selectedFloor,
    setSelectedFloor,
    floors,
    fetchFloors,
    resetSectionAndNiche,
  } = useStateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedBuilding) {
      fetchFloors(selectedBuilding.buildingId);
    }
  }, [selectedBuilding]);

  const handleSelectFloor = (floor) => {
    setSelectedFloor(floor);
    resetSectionAndNiche();
    setValue(floor.floorName);
    setOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Chọn tầng</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value || "Chọn tầng..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm tầng..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy tầng.</CommandEmpty>
                <CommandGroup>
                  {floors.map((floor) => (
                    <CommandItem
                      key={floor.floorId}
                      value={floor.floorName}
                      onSelect={() => handleSelectFloor(floor)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedFloor?.floorId === floor.floorId
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {floor.floorName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {floors.map((floor) => (
          <Button
            key={floor.floorId}
            onClick={() => handleSelectFloor(floor)}
            variant={
              selectedFloor?.floorId === floor.floorId ? "default" : "outline"
            }
          >
            {floor.floorName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorSelector;
