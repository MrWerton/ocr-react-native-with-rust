import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { OcrLibViewProps } from './OcrLib.types';

const NativeView: React.ComponentType<OcrLibViewProps> =
  requireNativeViewManager('OcrLib');

export default function OcrLibView(props: OcrLibViewProps) {
  return <NativeView {...props} />;
}
