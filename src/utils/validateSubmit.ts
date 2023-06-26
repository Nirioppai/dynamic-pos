// validateSubmit.js or validateSubmit.ts if you're using TypeScript

const validateValues = (
  obj: Record<string, any>,
  enqueueSnackbar: (message: string, options: { variant: string }) => void
): Record<string, any> | null => {
  const result = { ...obj };
  for (const key in result) {
    if (typeof result[key] === 'string') {
      const trimmedValue = result[key].trim();
      if (trimmedValue === '') {
        enqueueSnackbar(
          `Something went wrong. The value for "${key}" should not be empty.`,
          { variant: 'error' }
        );
        return null;
      }
      result[key] = trimmedValue;
    }
  }
  return result;
};

export const validateSubmit = async (
  values: Record<string, any>,
  mutateAsync: (arg0: Record<string, any>) => void,
  enqueueSnackbar: (message: string, options: { variant: string }) => void
) => {
  const validatedValues = validateValues(values, enqueueSnackbar);
  if (validatedValues !== null) {
    console.log('values', validatedValues);
    // @ts-ignore
    await mutateAsync(validatedValues);
  }
};
