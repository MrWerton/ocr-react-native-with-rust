import * as React from 'react';

import { OcrLibViewProps } from './OcrLib.types';

export default function OcrLibView(props: OcrLibViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
