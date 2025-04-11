import clsx from "clsx"
import { FilterSlider } from "@/components/filterSlider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface Filters {
  contrast: number;
  brightness: number;
}

export interface FilterPanelProps {
  filters: Filters;
  onChangeFilters: (filters: Filters) => void;
  className?: string;
}

export function FilterPanel ({ filters, onChangeFilters, className }: FilterPanelProps) {
  return (
    <Accordion
      type="multiple"
      defaultValue={["exposure"]}
      className={clsx("", className)}
    >

      {/* Exposure controls */}
      <AccordionItem value="exposure">
        <AccordionTrigger className="font-bold my-1 hover:no-underline">
          Exposure
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4 space-y-8">

            <FilterSlider
              name="Contrast"
              value={filters?.contrast ?? 0}
              min={-100}
              max={100}
              tooltip="Apply a contrast adjustment."
              onChange={contrast => onChangeFilters({ ...filters, contrast })}
              onReset={() => onChangeFilters({ ...filters, contrast: 0 })}
            />

            <FilterSlider
              name="Brightness"
              value={filters?.brightness ?? 0}
              min={-100}
              max={100}
              tag="Try adding this yourself!"
              tooltip="Apply a brightness adjustment."
              onChange={brightness => onChangeFilters({ ...filters, brightness })}
              onReset={() => onChangeFilters({ ...filters, brightness: 0 })}
              disabled
            />

          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}