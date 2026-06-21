'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from './motion';

type Props = {
  children: ReactNode;
  as?: ElementType;
  stagger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
};

/** Scroll-reveal wrapper. `stagger` cascades direct children. */
export default function Reveal({ children, as, stagger, className = '', style, id }: Props) {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`${stagger ? 'cx-stagger' : 'cx-reveal'} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
