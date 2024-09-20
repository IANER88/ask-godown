type SetFn<S> = (state: S) => ({}) | S;
type GetFn<S> = () => S;
type OnSetFn<S> = <R extends SetFn<S>>(callback: R) => void;
type IdentifierFn<S> = (set: OnSetFn<S>, get: GetFn<S>) => S;
export default function createGodown<V, S extends IdentifierFn<V> = IdentifierFn<V>>(identifier: S): () => ReturnType<S>;
export {};
