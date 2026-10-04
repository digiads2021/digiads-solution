import { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import ConsultationForm from './ConsultationForm.jsx';

// Lets any component open the "Talk to an Expert" form in a modal: openConsultation(service?)
const Ctx = createContext({ openConsultation: () => {} });

export function ConsultationProvider({ children }) {
  const [state, setState] = useState({ open: false, service: null });
  const openConsultation = useCallback((service = null) => setState({ open: true, service }), []);
  const close = useCallback(() => setState({ open: false, service: null }), []);

  return (
    <Ctx.Provider value={{ openConsultation }}>
      {children}
      <Modal open={state.open} onClose={close} title="Talk to an Expert">
        <p className="small muted" style={{ marginTop: -8 }}>Tell us what you’re trying to achieve. We’ll help you find the right service.</p>
        <ConsultationForm service={state.service} onDone={close} />
      </Modal>
    </Ctx.Provider>
  );
}

export const useConsultation = () => useContext(Ctx);
