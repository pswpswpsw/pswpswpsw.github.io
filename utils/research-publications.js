(function () {
  'use strict';
  var browser = document.getElementById('research-topic-browser');
  if (!browser) return;
  var links = Array.prototype.slice.call(browser.querySelectorAll('[data-topic]'));
  var papers = Array.prototype.slice.call(document.querySelectorAll('.publications > ol > li[data-research-topic]'));
  var requested = new URLSearchParams(window.location.search).get('topic');
  var active = links.filter(function (link) { return link.dataset.topic === requested; })[0];
  var topic = active ? active.dataset.topic : 'all';

  // A direct paper anchor must always remain reachable, including after browser history changes.
  function render() {
    var target = document.getElementById(window.location.hash.slice(1));
    var visibleTopic = topic;
    if (target && target.dataset.researchTopic && visibleTopic !== 'all' && target.dataset.researchTopic !== visibleTopic) {
      visibleTopic = 'all';
    }
    var count = 0;
    papers.forEach(function (paper) {
      paper.hidden = visibleTopic !== 'all' && paper.dataset.researchTopic !== visibleTopic;
      if (!paper.hidden) count += 1;
    });
    var selected = links.filter(function (link) { return link.dataset.topic === visibleTopic; })[0];
    links.forEach(function (link) {
      if (link === selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    var heading = selected.textContent.replace(/\s*\(\d+\)$/, '');
    document.getElementById('research-topic-summary').textContent = heading + ': ' + count + (count === 1 ? ' publication' : ' publications');
    var description = document.getElementById('research-topic-description');
    description.textContent = selected.dataset.description || '';
    description.hidden = !description.textContent;
  }
  render();
  window.addEventListener('hashchange', render);
}());
