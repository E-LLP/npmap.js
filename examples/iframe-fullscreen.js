var NPMap = {
  div: 'map',
  fullscreenControl: true
};

(function () {
  var s = document.createElement('script');
  s.src = '{{ path }}/npmap-bootstrap.js';
  document.body.appendChild(s);
})();
