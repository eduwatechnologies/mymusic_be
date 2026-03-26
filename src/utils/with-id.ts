export function withId<T extends Record<string, unknown>>(doc: { _id: unknown; toObject: () => T }) {
  const obj = doc.toObject();
  const { _id: _ignore, ...rest } = obj as T & { _id?: unknown };
  return { id: String(doc._id), ...rest };
}

