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

module.exports.onComplete = function(_, { focusPath, results, type }) {
  if (type !== "template") {
    return results;
  }

  try {
	if (isElementName(focusPath)) {
		results.push({
		  label: "InlineComponentTemplate",
		  description:
			"Inline Component Template Tag (from ember-cli-inline-template-only-components)"
		});
	} else if (isElementAttributeName(focus)) {
		results.push({
			label: "name",
			description:
			'Inline Component NAME (used in `{{component (from-inline-template "NAME")}}`)'
		});
	}
  } catch(e) {
	 // 
  }

  return results;
};
