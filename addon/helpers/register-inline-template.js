/* globals define, requirejs */
import { helper } from '@ember/component/helper';
import { createTemplateFactory } from "@ember/template-factory";
function registerAbsoluteImport(template, componentName, appName) {
  const moduleName = `${appName}/templates/components/${componentName}`;
  if (requirejs.has(moduleName)) {
    return;
  }
  define(moduleName, ["exports"], function (_exports) {
    "use strict";
    Object.defineProperty(_exports, "__esModule", {
      value: true
    });
    const tpl = JSON.parse(template);
    _exports.default = createTemplateFactory(tpl);
    return _exports;
  });
}


export default helper(function registerInlineTemplate([appName, name, template]) {
  return registerAbsoluteImport(template, name, appName);
});