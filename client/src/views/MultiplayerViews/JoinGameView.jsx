var React = require('react');

var Router = require('react-router');
var Navigation = Router.Navigation;
var Link = Router.Link;

var JoinGameView = React.createClass({
  
  mixins: [Navigation, Router.State],

  joinGame: function(){
    console.log(this.refs.code.getDOMNode().value);
    // check to see if game exists in mongodb
    // should submit an ajax request for get to see if game exists
    var code = this.refs.code.getDOMNode().value;

    // we want to be able to get teh game id for the code
    // then return that game so we can update it with players
    // then repost it so that the data of the game is updated

    $.ajax({
      url: window.location.origin + "/gameExists/" + code,
      method: "GET",
      dataType: "json",
      success: function(game){
        // should get the game and then insert the user into the game
        console.log("SUCCESS!", game);
      },
      error: function(xhr, status, err){
        console.log("err", err);
        console.error(xhr, status, err.message);
      }
    });
  },

  render: function(){
    return (
      <div>
        <h1>This is the join Game view</h1>
        <p>Code: <input type="text" ref="code"/></p>
        <button type="button" onClick={this.joinGame}>Join Game</button>
      </div>
    );
  }

});

module.exports = JoinGameView;