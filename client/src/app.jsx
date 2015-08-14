var GameBox = require('./views/gameBox.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <GameBox/>
      </div>
    )
  }
});

React.render(<App/>, document.body);