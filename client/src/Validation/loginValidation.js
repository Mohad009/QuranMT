import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  pNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters')
}); 