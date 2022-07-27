import engine from 'handlebars';
import { TemplateData, TemplateResult } from '../publisher';

engine.registerHelper('raw', options => {
  return options.fn();
});

export const compile = (contents: string, data: TemplateData): TemplateResult => {
  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data)
      },
    };
  } catch (err: any) {
    return {
      error: true,
      message: err,
    }
  }
};

export default {
  compile,
};