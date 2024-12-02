import { useState, useCallback } from 'react';

interface ValidationOptions<T> {
  initialValues: T;
  validate: (values: T) => Record<string, string>;
}

export function useFormValidation<T extends Record<string, any>>({ 
  initialValues, 
  validate 
}: ValidationOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback((formValues: T) => {
    const validationErrors = validate(formValues);
    const valid = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    setIsValid(valid);
    return valid;
  }, [validate]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    validateForm(newValues);
  }, [values, validateForm]);

  return {
    values,
    errors,
    isValid,
    handleChange,
  };
}