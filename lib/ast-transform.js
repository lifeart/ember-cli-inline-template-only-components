/* globals require, module */
"use strict";
const path = require("path");

const cPath = path.join(
  path.dirname(path.dirname(require.resolve("ember-source"))),
  "dist",
  "ember-template-compiler"
);
const compiler = require(cPath);
const precompile = compiler.precompile;

function templateCompileFunction(txt) {
  return precompile(txt);
}

function fullName(name) {
  return (
    "inline-template-component-" +
    Math.random()
      .toString(36)
      .slice(3) +
    name
  );
}

class InlineTemplateTransform {
  constructor(options) {
    this.syntax = null;
    const app = (options.meta.moduleName || "").split("/");
    this.options = options;
    this.appName = app[0];
    if (this.appName.startsWith("@") && app.length > 1) {
      this.appName = `${app[0]}/${app[1]}`;
    }
  }

  transform(ast) {
    let b = this.syntax.builders;
    let p = this.syntax.print;
    let appName = this.appName;
    let names = {};

    if (appName === "") {
      return ast;
    }

    // **** copy from here ****

    function detectTemplates(elNode) {
      if (elNode.tag === "InlineComponentTemplate") {
        let name = elNode.attributes.find(({ name }) => name === "name");
        if (name) {
          return createTemplateDefinition(elNode, name.value.chars);
        }
      }
    }

    function createTemplateDefinition(tpl, name) {
      names[name] = fullName(name);
      const template = b.program(tpl.children);
      const compiledTemplate = templateCompileFunction(p(template));
      return b.mustache(b.path("register-inline-template"), [
        b.string(appName),
        b.string(names[name]),
        b.string(compiledTemplate)
      ]);
    }

    let visitor = {
      ElementNode: detectTemplates,
      SubExpression(node) {
        if (
          node.path.type === "PathExpression" &&
          node.path.original === "from-inline-template"
        ) {
          if (node.params.length && node.params[0].type === "StringLiteral") {
            node.params[0].original = names[node.params[0].original];
            node.params[0].value = names[node.params[0].value];
          }
        }
      }
    };

    // **** copy to here ****

    this.syntax.traverse(ast, visitor);

    return ast;
  }
}

module.exports = InlineTemplateTransform;
