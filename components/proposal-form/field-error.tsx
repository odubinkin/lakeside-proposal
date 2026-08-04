type FieldErrorProps = {
  id: string
  children?: string
}

/** Renders an accessible inline validation error when a message is present. */
export function FieldError({ id, children }: FieldErrorProps) {
  if (!children) return null

  return (
    <p id={id} className="mt-1.5 text-sm text-destructive" role="alert">
      {children}
    </p>
  )
}
