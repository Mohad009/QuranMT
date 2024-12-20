import * as Yup from 'yup';

export const studentValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  teacherId: Yup.string()
    .required('Teacher is required'),
    parentNumber: Yup.string()
    .required('Phone number is required').matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits'),

}); 