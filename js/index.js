var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextScramble = function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = '!@#$%^&*qwertyuiopsdfghjklxcvzbnm_';
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [{
    key: 'setText',
    value: function setText(newText) {
      var _this = this;

      var oldText = this.el.innerText;
      var length = Math.max(oldText.length, newText.length);
      var promise = new Promise(function (resolve) {
        return _this.resolve = resolve;
      });
      this.queue = [];
      for (var i = 0; i < length; i++) {
        var from = oldText[i] || '';
        var to = newText[i] || '';
        var start = Math.floor(Math.random() * 40);
        var end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from: from, to: to, start: start, end: end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
  }, {
    key: 'update',
    value: function update() {
      var output = '';
      var complete = 0;
      for (var i = 0, n = this.queue.length; i < n; i++) {
        var _queue$i = this.queue[i],
            from = _queue$i.from,
            to = _queue$i.to,
            start = _queue$i.start,
            end = _queue$i.end,
            char = _queue$i.char;

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += '<span class="dud">' + char + '</span>';
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }, {
    key: 'randomChar',
    value: function randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }]);

  return TextScramble;
}();

var phrases = ['I drink champagne when I win, to celebrate, and I drink champagne when I lose, to console myself.<br />- Napoleon Bonaparte','Label Drinkers', 'A Global Series Extraordinaire','Starring','One senior Creative Head Sommelier and Decanter World Wine Awards Judge.','One up and coming Drink Wizard with a Wine and Spirit Education Trust Level 4 Diploma.','One is tattooed, one is not.','Together they travel the world to reveal myths, facts and legends of the most admired beverages in the world.','Coming 2018','When drinking is not a game.<br />But bloody serious.<br />- The Authors'];


var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
  fx.setText(phrases[counter]).then(function () {
    setTimeout(next, 7200);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// *** TO BE CUSTOMISED ***

var style_cookie_name = "style" ;
var style_cookie_duration = 30 ;
var style_domain = "labeldrinkers.com" ;

// *** END OF CUSTOMISABLE SECTION ***
// You do not need to customise anything below this line

function switch_style ( css_title )
{
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
    i < link_tag.length ; i++ ) {
    if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
      link_tag[i].title) {
      link_tag[i].disabled = true ;
      if (link_tag[i].title == css_title) {
        link_tag[i].disabled = false ;
      }
    }
    set_cookie( style_cookie_name, css_title,
      style_cookie_duration, style_domain );
  }
}
function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  if (css_title.length) {
    switch_style( css_title );
  }
}
function set_cookie ( cookie_name, cookie_value,
    lifespan_in_days, valid_domain )
{
    var domain_string = valid_domain ?
                       ("; domain=" + valid_domain) : '' ;
    document.cookie = cookie_name +
                       "=" + encodeURIComponent( cookie_value ) +
                       "; max-age=" + 60 * 60 *
                       24 * lifespan_in_days +
                       "; path=/" + domain_string ;
}
function get_cookie ( cookie_name )
{
    var cookie_string = document.cookie ;
    if (cookie_string.length != 0) {
        var cookie_value = cookie_string.match (
                        '(^|;)[\s]*' +
                        cookie_name +
                        '=([^;]*)' );
        return decodeURIComponent ( cookie_value[2] ) ;
    }
    return '' ;
}


