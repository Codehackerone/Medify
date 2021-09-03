import BaseJoi from "joi";
import sanitizeHtml from "sanitize-html";

const extension = (joi: any) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value: any, helpers: any) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

export const userRegistrationschema = Joi.object({
  first_name: Joi.string().required().escapeHTML(),
  last_name: Joi.string().required().escapeHTML(),
  email: Joi.string().required().escapeHTML(),
  phone: Joi.string().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
  user: Joi.object(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().required().escapeHTML(),
  password: Joi.string().required().escapeHTML(),
});

export const moreDetailsSchema = Joi.object({
  sex: Joi.string().required().escapeHTML(),
  dateofBirth: Joi.number().required(),
  diseases: Joi.array(),
});

export const createRoutineSchema = Joi.object({
  medicineName: Joi.string().required().escapeHTML(),
  medicineType: Joi.string().required().escapeHTML(),
  medicineDosage: Joi.string().required().escapeHTML(),
  medicineDosageUnit: Joi.string().required().escapeHTML(),
  medicineFrequency: Joi.string().required().escapeHTML(),
  medicineFrequencyUnit: Joi.string().required().escapeHTML(),
  medicineStartTime: Joi.number().required(),
  medicineEndTime: Joi.number().required(),
});
