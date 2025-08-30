import { ValidationError } from '@nestjs/common';

export const filterError = (errors: ValidationError[]) => {
  const errorMap = errors.map((e: ValidationError) => {
    if (!e || !e.property || e.property === '') {
      return null;
    }

    const data: any = {
      [`${e.property}`]: {
        constraints: e.constraints,
        contexts: e.contexts,
      },
    };

    if (e.children && !!e.children && e.children.length > 0) {
      data[`${e.property}`].children = filterError(e.children);
    }

    return data;
  });

  return errorMap.filter((e) => e);
};

export const errFormat = (message: string, data: any = null) => {
  return {
    message,
    data,
  };
};
