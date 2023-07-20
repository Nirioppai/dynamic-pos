interface ValidateCsvRowParams {
  /**
   * Index of the content.
   * This will be added by 2 due to the header row.
   */
  index: number;
  /**
   * Field value
   */
  value: any;
  /**
   * Text to display in error message
   */
  errorText: string;
  /**
   * Function to validate field value
   * @param value Field value
   * @returns True if field value is valid
   * @returns False if field value is invalid
   */
  validationFn?: (value: any) => boolean;
}

/**
 * Validate a CSV row value
 */
export const validateCsvRow = ({
  index,
  value,
  errorText,
  validationFn = (value: any) => !!value,
}: ValidateCsvRowParams) => {
  if (!validationFn(value)) {
    throw new Error(`Row ${index + 2}: ${errorText}`);
  }
};
