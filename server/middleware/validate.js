import ApiError from '../utils/ApiError.js';

// validate(zodSchema) checks req.body; unknown keys are stripped, errors are returned per field.
const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const errors = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || 'form';
      if (!errors[key]) errors[key] = issue.message;
    }
    return next(ApiError.badRequest('Please check the highlighted fields', errors));
  }
  req[source === 'body' ? 'body' : 'validatedQuery'] = result.data;
  next();
};

export default validate;
