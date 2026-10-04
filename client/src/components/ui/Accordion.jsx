import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Accessible accordion: buttons with aria-expanded / aria-controls.
export default function Accordion({ items, defaultOpen = 0, renderAnswer }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${baseId}-${i}`;
        return (
          <div className="accordion__item" data-open={isOpen} key={item._id || i}>
            <h3 style={{ margin: 0 }}>
              <button type="button" className="accordion__trigger" aria-expanded={isOpen} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            {isOpen && (
              <div className="accordion__panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`}>
                {renderAnswer ? renderAnswer(item) : <p>{item.answer}</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
