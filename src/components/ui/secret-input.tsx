"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"

interface SecretInputProps extends React.ComponentProps<typeof Input> {}

export const SecretInput = React.forwardRef<HTMLInputElement, SecretInputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = useState(false)
    return (
      <div className="relative w-full">
        <Input ref={ref} type={show ? "text" : "password"} className={className} {...props} />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
          aria-label={show ? "Esconder conteúdo" : "Mostrar conteúdo"}
          aria-pressed={show}
        >
          {show ? "Esconder" : "Mostrar"}
        </button>
      </div>
    )
  }
)
SecretInput.displayName = "SecretInput"

