"use client";

import { useId, useState } from "react";

type Faq = { question: string; answer: string };

/** An accordion. Each answer opens and closes independently of the others. */
export function FaqList({ items }: { items: Faq[] }) {
  const id = useId();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggle = (index: number) =>
    setOpenItems((open) => (open.includes(index) ? open.filter((item) => item !== index) : [...open, index]));

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openItems.includes(index);
        const panelId = `${id}-${index}`;
        return (
          <div key={item.question} className="border-b border-line-strong">
            <h3 className="font-sans font-semibold">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-body-lg font-semibold"
              >
                {item.question}
                <span className="lg-faq-tile flex size-[2.375rem] shrink-0 items-center justify-center rounded-sm bg-night text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    className={`size-5 transition-transform duration-400 ease-in-out ${isOpen ? "rotate-45" : ""}`}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows,visibility] duration-400 ease-in-out ${
                isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[40rem] pb-6 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
