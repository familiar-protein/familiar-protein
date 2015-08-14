var GameBox = require('./views/gameBox.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <GameBox/>
      </div>
    )
  }
});

React.render(<App/>, document.body);