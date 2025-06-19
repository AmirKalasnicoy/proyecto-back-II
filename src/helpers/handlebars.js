
import Handlebars from 'handlebars';

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('multiply', function (a, b) {
  return a * b;
});






