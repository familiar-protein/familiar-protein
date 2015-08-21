var React = require('react');
var TestView = React.createClass({
  render: function() {
    return (
        <div className="panel">
          <div className="panel-body row">
            <div className="col-xs-12 col-sm-6">
              <h1>RegEx Challenge</h1>
              <p>This project was created during the Hackreactor <i>Legacy</i> Phase.</p>
              <h3>Authors:</h3>
              <ul>
                <li><a href="https://github.com/">John Andersen</a></li>
                <li><a href="https://github.com/IanConery">Ian Conery</a></li>
                <li><a href="https://github.com/Gattermeier">Matthias Gattermeier</a></li>
                <li><a href="https://github.com/whamsicore">Payton Lee</a></li>
              </ul>  
            </div>
          </div>
        </div>);
  }
});
module.exports = TestView;

 
