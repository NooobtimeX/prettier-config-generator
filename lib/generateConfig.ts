import options from "./options";

export const generateConfig = (selected: Record<string, any>) => {
  const result: Record<string, any> = {};
  for (const [k, v] of Object.entries(selected)) {
    const meta = options.find((o) => o.key === k);
    if (v !== null && meta) {
      result[k] = meta.validate === "integer" ? parseInt(v) : v;
    }
  }
  return JSON.stringify(result, null, 2);
};
