import * as Yup from 'yup';

export const progressValidationSchema = Yup.object().shape({
  studentId: Yup.string()
    .required('Student selection is required'),
  chapter: Yup.string()
    .required('Surah selection is required'),
  ayahRangeFrom: Yup.number()
    .required('Starting ayah is required')
    .min(1, 'Ayah number must be at least 1').typeError('Starting ayah is required')
    .test('valid-range', 'Starting ayah must be less than ending ayah', 
      function(value) {
        return !value || !this.parent.ayahRangeTo || value <= this.parent.ayahRangeTo;
      }),
  ayahRangeTo: Yup.number()
    .required('Ending ayah is required')
    .min(1, 'Ayah number must be at least 1').typeError('Ending ayah is required')
    .test('valid-range', 'Ending ayah must be greater than starting ayah',
      function(value) {
        return !value || !this.parent.ayahRangeFrom || value >= this.parent.ayahRangeFrom;
      }),
  mark: Yup.string()
    .required('Mark is required')
    .oneOf(['0', '1', '2'], 'Invalid mark selected'),
  notes: Yup.string()
    .max(500, 'Notes must not exceed 500 characters')
}); 