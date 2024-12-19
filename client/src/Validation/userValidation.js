import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  pNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),
  password: Yup.string()
  .required('Password is required')
  .min(4, 'Password must be at least 4 characters'),
  utype: Yup.string()
    .required('User type is required')
    .oneOf(['teacher', 'admin', 'parent'], 'Invalid user type selected'),
  isActive: Yup.boolean()
    .required('Status is required')
}); 