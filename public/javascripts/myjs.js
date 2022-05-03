
////////////// Typing Effect ///////////

var TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  var that = this;
  var delta = 300 - Math.random() * 100;
  if (this.isDeleting) { delta /= 2; }
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};


////////////////////////////login and signup////////////////////////////////////////////
$(document).ready(function () {
  $(".panel-1").hide();
  $(".panel-2").hide();
  $(".student-signup").hide();
  $(".teacher-signup").hide();

  $(".student").click(function () {
    $(".choose").hide(1000);
    $(".panel-1").show(1000);
  });
  $(".teacher").click(function () {
    $(".choose").hide(1000);
    $(".panel-2").show(1000);
  });
  $("#panel-reset").click(function () {
    $(".panel-1").hide(1000);
    $(".panel-2").hide(1000);
    $(".choose").show(1000);
  });
  $("#panel-reset-1").click(function () {
    $(".panel-1").hide(1000);
    $(".panel-2").hide(1000);
    $(".choose").show(1000);
  });


  $("#form-reset").click(function () {
    $(".student-login").hide(1000);
    $(".student-signup").show(1000);
  });
  $("#form-reset-1").click(function () {
    $(".student-signup").hide(1000);
    $(".student-login").show(1000);
  });
  $("#form-reset-2").click(function () {
    $(".teacher-login").hide(1000);
    $(".teacher-signup").show(1000);
  });
  $("#form-reset-3").click(function () {
    $(".teacher-signup").hide(1000);
    $(".teacher-login").show(1000);
  });
  $("#form-reset-3").click(function () {
    $(".teacher-signup").hide(1000);
    $(".teacher-login").show(1000);
  });
  $("#form-reset-3").click(function () {
    $(".teacher-signup").hide(1000);
    $(".teacher-login").show(1000);
  });
});