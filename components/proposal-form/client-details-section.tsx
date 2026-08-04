import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FieldError } from './field-error'
import type { ProposalFormErrors } from './proposal-form.utils'

export type ClientDetailsField =
  | 'clientName'
  | 'manager'
  | 'phone'
  | 'email'
  | 'comment'

export type ClientDetailsValues = Record<ClientDetailsField, string>

type ClientDetailsSectionProps = {
  values: ClientDetailsValues
  errors: ProposalFormErrors
  onChange: (field: ClientDetailsField, value: string) => void
}

/** Captures client contact details, manager information, and internal notes. */
export function ClientDetailsSection({
  values,
  errors,
  onChange,
}: ClientDetailsSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
        Client &amp; manager details
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="clientName">Client name</Label>
          <Input
            id="clientName"
            value={values.clientName}
            required
            aria-invalid={Boolean(errors.clientName)}
            aria-describedby={errors.clientName ? 'client-name-error' : undefined}
            onChange={(event) => onChange('clientName', event.target.value)}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            placeholder="e.g. Oliver Bennett"
          />
          <FieldError id="client-name-error">{errors.clientName}</FieldError>
        </div>

        <div>
          <Label htmlFor="manager">Manager name</Label>
          <Input
            id="manager"
            value={values.manager}
            required
            aria-invalid={Boolean(errors.manager)}
            aria-describedby={errors.manager ? 'manager-error' : undefined}
            onChange={(event) => onChange('manager', event.target.value)}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            placeholder="e.g. Anna Petrova"
          />
          <FieldError id="manager-error">{errors.manager}</FieldError>
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : 'contact-requirement'}
            onChange={(event) => onChange('phone', event.target.value)}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            placeholder="+66 ..."
          />
          <FieldError id="phone-error">{errors.phone}</FieldError>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : 'contact-requirement'}
            onChange={(event) => onChange('email', event.target.value)}
            className="aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            placeholder="client@example.com"
          />
          <FieldError id="email-error">{errors.email}</FieldError>
        </div>

        <p
          id="contact-requirement"
          className="text-xs text-muted-foreground sm:col-span-2"
        >
          Provide at least one contact method: phone or email.
        </p>

        <div className="sm:col-span-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            value={values.comment}
            onChange={(event) => onChange('comment', event.target.value)}
            placeholder="Notes, special requests or payment preferences…"
          />
        </div>
      </div>
    </section>
  )
}
