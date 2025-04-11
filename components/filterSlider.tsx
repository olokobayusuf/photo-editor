import clsx from "clsx"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface FilterSliderProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  tag?: string;
  tooltip: string;
  onChange?: (value: number) => void;
  onReset?: () => void;
  className?: string;
}

export function FilterSlider ({
  name,
  value,
  min = -100,
  max = 100,
  step = 1,
  disabled,
  tag,
  tooltip,
  onChange,
  onReset,
  className
}: FilterSliderProps) {
  return (
    <div className={clsx("group/parameter space-y-2", className)}>
      {/* Title and number */}
      <div className={clsx(
        "w-full flex flex-row justify-between transition",
        disabled ? "text-gray-500" : "text-gray-400 group-hover/parameter:text-gray-200",
      )}>
        <button
          onClick={onReset}
          className={clsx(
            "flex flex-row items-center space-x-1",
            "text-left w-3/4 group/reset font-light",
            disabled ? "cursor-default" : ""
          )}
        >
          <span className={clsx("visible", disabled ? "" : "group-hover/reset:hidden")}>
            {name}
            {
              tag &&
              <span className="text-xs ml-2 px-1 py-0.5 rounded text-indigo-200 bg-gray-500/30">
                {tag}
              </span>
            }
          </span>
          <span className={clsx("hidden", disabled ? "" : "group-hover/reset:block")}>
            Reset
          </span>
        </button>
        <p>
          {value}
        </p>
      </div>
      
      {/* Tooltip */}
      <TooltipProvider delayDuration={1200}>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* Slider */}
            <Slider
              value={[value]}
              onValueChange={v => onChange?.(v[0])}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              className="dark"
            />
          </TooltipTrigger>
          <TooltipContent sideOffset={20}>
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}