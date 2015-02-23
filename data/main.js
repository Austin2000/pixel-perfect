/* See license.txt for terms of usage */

define(function(require, exports, module) {

// Dependencies
const React = require("react");
const { PopupPanel } = require("popup-panel");
const { OverlayStore } = require("overlay-store");

// Get overlay data from persistent store.
var state = {
  overlays: [],
  selection: null
}

// Render panel content
var panel = React.render(PopupPanel(state), document.body);

// Handle refresh events sent from the chrome scope and refresh
// the panel content (panel component).
window.addEventListener("refresh", onRefresh);
function onRefresh(event) {
  var data = JSON.parse(event.data);
  // xxxHonza: properly pick the default selection
  panel.setState({overlays: data, selection: data[0]});
}

// Display the page content when it's ready to avoid flashing
// during the page load.
document.addEventListener("load", event => {
  document.body.removeAttribute("collapsed");
}, true);

// Panel is loaded, let the chrome content send the first
// 'refresh' message.
postChromeMessage("panel-ready");

// End of main.js
});