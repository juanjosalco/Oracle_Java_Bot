import { TextEncoder } from 'text-encoding';

export const calculateBytes = (text) => {
    const encoder = new TextEncoder();
    return encoder.encode(text).length;
  };