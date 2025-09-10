"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type SearchableSelectItem = {
  label: string
  value: string
  disabled?: boolean
}

type Props = {
  items: SearchableSelectItem[]
  value: string | null
  onChange: (value: string | null) => void
  placeholder?: string
  inputPlaceholder?: string
  emptyText?: string
  allLabel?: string
  disabled?: boolean
  className?: string
}

export function SearchableSelect({
  items,
  value,
  onChange,
  placeholder = "Select...",
  inputPlaceholder = "Search...",
  emptyText = "No results found.",
  allLabel,
  disabled,
  className,
}: Props) {
  const [open, setOpen] = React.useState(false)

  const selected = React.useMemo(() => items.find((i) => i.value === value) ?? null, [items, value])

  const handleSelect = (val: string | null) => {
    onChange(val)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
       >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandInput placeholder={inputPlaceholder} disabled={disabled} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {typeof allLabel === "string" && (
                <CommandItem onSelect={() => handleSelect(null)} disabled={disabled}>
                  <Check className={cn("mr-2 h-4 w-4", value === null ? "opacity-100" : "opacity-0")} />
                  {allLabel}
                </CommandItem>
              )}
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  disabled={disabled || item.disabled}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === item.value ? "opacity-100" : "opacity-0")} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

