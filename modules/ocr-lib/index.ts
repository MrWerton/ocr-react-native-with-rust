import {
  EventEmitter,
  NativeModulesProxy,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to OcrLib.web.ts
// and on native platforms to OcrLib.ts
import { ChangeEventPayload, OcrLibViewProps } from "./src/OcrLib.types";
import OcrLibModule from "./src/OcrLibModule";
import OcrLibView from "./src/OcrLibView";

// Get the native constant value.
export const PI = OcrLibModule.PI;

export function hello(): string {
  return OcrLibModule.hello();
}
export async function rustImageSize(
  imageData: Uint8Array
): Promise<{ width: number; height: number }> {
  return await OcrLibModule.rustImageSize(Array.from(imageData));
}
export async function setValueAsync(value: string) {
  return await OcrLibModule.setValueAsync(value);
}

const emitter = new EventEmitter(OcrLibModule ?? NativeModulesProxy.OcrLib);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ChangeEventPayload, OcrLibView, OcrLibViewProps };
