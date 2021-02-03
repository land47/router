export let isObjectEmpty = (o: Record<string, unknown>) =>
  Object.keys(o).length === 0
