import Joi from 'joi';

export const registerSchema = (data) => {
    const registerSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // ".com", ".uz" shart emas
            .required()
            .messages({
            'string.email': 'Email noto‘g‘ri kiritildi',
            'string.empty': 'Email bo‘sh bo‘lmasligi kerak',
            }),

        password: Joi.string()
            .min(6)
            .max(32)
            .pattern(new RegExp('^[a-zA-Z0-9@#%&!]+$')) // faqat shartli belgilar
            .required()
            .messages({
            'string.min': 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak',
            'string.pattern.base': 'Parolda faqat harf, raqam yoki belgilar (@, #, %) bo‘lishi mumkin',
            'string.empty': 'Parol bo‘sh bo‘lmasligi kerak',
            }),
    });

    const error = registerSchema.validate(data);
    return error.error ? error.error.details[0].message : null;

} 