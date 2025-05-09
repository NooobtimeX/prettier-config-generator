import options from "./options";

// Type-safe keys from options
type OptionKey = (typeof options)[number]["key"];
type SelectedOptions = {
  [key in OptionKey]: string | number | boolean | null;
};

export const generateConfig = (selected: SelectedOptions): string => {
  const result: Partial<Record<OptionKey, string | number | boolean>> = {};

  for (const [key, value] of Object.entries(selected) as [
    OptionKey,
    string | number | boolean | null,
  ][]) {
    const meta = options.find((o) => o.key === key);
    if (value !== null && meta) {
      result[key] =
        meta.validate === "integer" ? parseInt(value as string) : value;
    }
  }

  return JSON.stringify(result, null, 2);
};
