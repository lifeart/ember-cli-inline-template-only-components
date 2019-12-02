/* global module */
"use strict";

function isElementName(focusPath) {
  return focusPath.node.type === "ElementNode";
}

function isElementAttributeName(focusPath) {
  if (
    focusPath.node.type === "TextNode" &&
    focusPath.parent &&
    focusPath.parent.type === "AttrNode"
  ) {
    if (
      focusPath.node.chars === "" &&
      focusPath.parentPath &&
      focusPath.parentPath.parent &&
      focusPath.parentPath.parent.type === "ElementNode"
    ) {
      if (focusPath.parentPath.parent.tag === "InlineComponentTemplate") {
        return true;
      }
    }
  }

  if (focusPath.node.type === "AttrNode") {
    if (focusPath.parent.type === "ElementNode") {
      if (focusPath.parent.tag === "InlineComponentTemplate") {
        return true;
      }
    }
  }
}

module.exports.onComplete = function(_, { focusPath, results, type, server }) {
 
  if (type !== "template") {
    return results;
  }

  server.connection.console.log(
    "els-addon:ember-cli-inline-template-only-components:onComplete"
  );

  try {
    if (isElementName(focusPath)) {
      results.push({
        label: "InlineComponentTemplate",
        kind: 7,
        detail:
          "Inline Component Template Tag (from ember-cli-inline-template-only-components)"
      });
    } else if (isElementAttributeName(focusPath)) {
      results.push({
        label: "name",
        kind: 5,
        detail:
          'Inline Component NAME (used in `{{component (from-inline-template "NAME")}}`)'
      });
    }
  } catch (e) {
    server.connection.console.error(
      "els-addon:ember-cli-inline-template-only-components:onComplete",
      e.toString(),
      e.stack
    );
  }

  return results;
};
