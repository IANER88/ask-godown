import { useSyncExternalStore } from "react";

type SetFn<S> = (state: S) => ({}) | S;

type GetFn<S> = () => S;

type OnSetFn<S> = <R extends SetFn<S>>(callback: R) => void;

type IdentifierFn<S> = (set: OnSetFn<S>, get: GetFn<S>) => S;

type Listeners = (() => void)[]

export default function createGodown<V, S extends IdentifierFn<V> = IdentifierFn<V>>(identifier: S) {

  const map = new Map();

  let listeners: Listeners = [];

  const set: OnSetFn<ReturnType<S>> = (callback) => {
    const store = callback(map.get('godown'))
    map.set('godown', {
      ...(store ?? {}),
      ...map.get('godown')
    })
    for (const fn of listeners) {
      fn();
    }
  }

  const get = () => map.get('godown')

  if (!map.has('godown')) map.set('godown', identifier(set, get));
  const subscribe = (listener: { (): void; (): void; }) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  const useGodown = () => {
    const godown = useSyncExternalStore<ReturnType<S>>(subscribe, get);
    return godown;
  }

  return useGodown;
}