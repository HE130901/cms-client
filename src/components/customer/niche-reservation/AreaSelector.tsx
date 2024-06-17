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

const AreaSelector = () => {
  const {
    selectedBuilding,
    selectedFloor,
    selectedArea,
    setSelectedArea,
    areas,
    fetchAreas,
    resetNiche,
  } = useStateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedBuilding && selectedFloor) {
      fetchAreas(selectedBuilding.buildingId, selectedFloor.floorId);
    }
  }, [selectedBuilding, selectedFloor]);

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    resetNiche();
    setValue(area.areaName);
    setOpen(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Chọn khu</h2>
      <div className="flex items-center space-x-2 mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value || "Chọn khu..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Tìm kiếm khu..." />
              <CommandList>
                <CommandEmpty>Không tìm thấy khu.</CommandEmpty>
                <CommandGroup>
                  {areas.map((area) => (
                    <CommandItem
                      key={area.areaId}
                      value={area.areaName}
                      onSelect={() => handleSelectArea(area)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedArea?.areaId === area.areaId
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {area.areaName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {areas.map((area) => (
          <Button
            key={area.areaId}
            onClick={() => handleSelectArea(area)}
            variant={
              selectedArea?.areaId === area.areaId ? "default" : "outline"
            }
          >
            {area.areaName}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AreaSelector;
