import * as Yup from 'yup';

export const profileValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Name is required')
    .min(4, 'Name must be at least 4 characters')
    .max(50, 'Name must not exceed 50 characters'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .min(8, 'Phone number must be exactly 8 digits')
    .max(8, 'Phone number must be exactly 8 digits')
});

export const passwordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(4, 'Password must be at least 4 characters'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});