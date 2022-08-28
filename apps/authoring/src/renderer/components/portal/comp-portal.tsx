import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const portalRoot = document.querySelector('#app-portal') as HTMLElement;

export const Portal = ({ children }: { children?: React.ReactNode }) => {
  const el = useRef(document.createElement('div'));
  el.current.classList.add('position-absolute', 'h-100', 'w-100');

  useEffect(() => {
    const current = el.current;

    portalRoot?.appendChild(current);
    return () => void portalRoot?.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default Portal;
