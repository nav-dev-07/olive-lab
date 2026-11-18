import type { ReactNode } from "react";

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20 lg:py-28">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <header className="mb-12 grid gap-x-8 gap-y-4 lg:mb-16 lg:grid-cols-12">
          <p className="font-mono text-label text-accent uppercase lg:col-span-3 lg:pt-3">
            {index} / {eyebrow}
          </p>
          <div className="lg:col-span-9">
            <h2 id={`${id}-title`} className="text-h2">
              {title}
            </h2>
            {lede ? <p className="mt-4 max-w-2xl text-body-lg text-muted">{lede}</p> : null}
          </div>
        </header>
        <div className="space-y-16 lg:space-y-20">{children}</div>
      </div>
    </section>
  );
}

/** A named group of specimens. `source` says where in the brief the spec comes from. */
export function Group({
  title,
  source,
  note,
  children,
}: {
  title: string;
  source?: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 border-b border-line pb-3">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-h4">{title}</h3>
          {source ? <p className="font-mono text-label text-muted">{source}</p> : null}
        </div>
        {note ? <p className="mt-2 max-w-3xl text-small text-muted">{note}</p> : null}
      </div>
      {children}
    </div>
  );
}
