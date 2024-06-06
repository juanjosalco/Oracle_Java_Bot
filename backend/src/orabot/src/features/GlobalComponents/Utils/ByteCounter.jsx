import { TextEncoder } from 'util';

export const calculateByteCount = (text) => {
    const encoder = new TextEncoder();
    return encoder.encode(text).length;
  };