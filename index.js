'use strict';

var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');

// https://developer.zendesk.com/blog/rendering-to-iframes-in-react
function adjustHeightWhenComplete(myFrame, myDoc) {
  if(myDoc.readyState === 'complete') {
    var content_height = myFrame.contentWindow.document.documentElement.scrollHeight;
    myFrame.style.height = content_height + 'px';
  } else {
    // This will be continiously called until the iFrame is ready
    setTimeout(function(){adjustHeightWhenComplete(myFrame, myDoc)});
  }
};

// https://gist.github.com/jeremiahlee/1748966
var GistEmbed = React.createClass({
  displayName: 'GistEmbed',
  propTypes: {
    gistId: PropTypes.string.isRequired
  },
  componentDidMount: function() {

    // Create an iframe, append it to this document where specified
    var gistFrame = document.createElement("iframe");
    gistFrame.setAttribute("width", "100%");
    gistFrame.id = "gistFrame" + this.props.gistId;

    var zone = document.getElementById("gistZone" + this.props.gistId);
    zone.innerHTML = "";
    zone.appendChild(gistFrame);

    // Create the iframe's document

    var url = "https://gist.github.com/" + this.props.gistId + ".js";
    var gistFrameHTML = '<html><body><script type="text/javascript" src=' + url + '></script></body></html>';

    // Set iframe's document with a trigger for this document to adjust the height
    var gistFrameDoc = gistFrame.document;

    if (gistFrame.contentDocument) {
      gistFrameDoc = gistFrame.contentDocument;
    } else if (gistFrame.contentWindow) {
      gistFrameDoc = gistFrame.contentWindow.document;
    }

    gistFrameDoc.open();
    gistFrameDoc.writeln(gistFrameHTML);
    gistFrameDoc.close();

    adjustHeightWhenComplete(gistFrame, gistFrameDoc);
  },
  render: function() {
    return React.DOM.div({id: 'gistZone' + this.props.gistId});
  }
});

module.exports = GistEmbed;
