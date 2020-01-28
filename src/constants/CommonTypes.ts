import { RefObject } from 'react';

export interface Async<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export type Dictionary<T> = Record<string, T>;

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface ObjectPosition {
  invertX?: boolean;
  invertY?: boolean;
  x: number;
  y: number;
}

export interface ObjectRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ObjectSize {
  width: number;
  height: number;
}

export interface Paginated<T> {
  list: T[];
  totalCount: number;
}

export type ReactRefProp<T> =
  | RefObject<T>
  | ((instance: T | null) => void)
  | null;
