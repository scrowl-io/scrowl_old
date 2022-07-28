import engine from 'handlebars';
import { TemplateData, TemplateResult } from '../publisher';

engine.registerHelper('raw', options => {
  return options.fn();
});

export const compile = (
  contents: string,
  data: TemplateData
): TemplateResult => {
  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data),
      },
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      error: true,
      message: err,
    };
  }
};

export default {
  compile,
};
