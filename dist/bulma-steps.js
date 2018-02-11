var bulmaSteps = (function () {
'use strict';

const MOUSE_EVENTS = ['click', 'touchstart'];

class StepsWizard {
  constructor(element = null, options = {}) {
    this.options = Object.assign({}, {
      'selector': '.step-item',
      'selector_content': '.step-content',
      'previous_selector': '[data-nav="previous"]',
      'next_selector': '[data-nav="next"]',
      'active_class': 'is-active',
      'completed_class': 'is-completed',
      'beforeNext': null,
      'onShow': null,
      'onFinish': null,
      'onError': null
    }, options);

    this.element = element;
    this.steps = element.querySelectorAll(this.options.selector);
    this.contents = element.querySelectorAll(this.options.selector_content);
    this.previous_btn = element.querySelector(this.options.previous_selector);
    this.next_btn = element.querySelector(this.options.next_selector);

    this.init();
  }

  init() {
    for (var i = 0; i < this.steps.length; i++) {
      var step = this.steps[i];

      step.setAttribute('data-step-id', i);
    }

    this.bind();

    this.start();
  }

  bind() {
    var _this = this;

    if (this.previous_btn != null) {
      MOUSE_EVENTS.forEach((event) => {
        this.previous_btn.addEventListener(event, function(e) {
          e.preventDefault();
          if (!e.target.getAttribute('disabled')) {
            _this.previous_step();
          }
        });
      });
    }

    if (this.next_btn != null) {
      MOUSE_EVENTS.forEach((event) => {
        this.next_btn.addEventListener(event, function(e) {
          e.preventDefault();
          if (!e.target.getAttribute('disabled')) {
            _this.next_step();
          }
        });
      });
    }
  }

  start() {
    this.activate_step(0);
    this.updateActions(this.steps[0]);
  }

  get_current_step_id() {
    for (var i = 0; i < this.steps.length; i++) {
      var step = this.steps[i];

      if (step.classList.contains(this.options.active_class)) {
        return parseInt(step.getAttribute('data-step-id'));
      }
    }

    return null;
  }

  updateActions(step) {
    var stepId = parseInt(step.getAttribute('data-step-id'));
    if (stepId == 0) {
      if (this.previous_btn != null) {
        this.previous_btn.setAttribute('disabled', 'disabled');
      }
      if (this.next_btn != null) {
        this.next_btn.removeAttribute('disabled', 'disabled');
      }
    } else if (stepId == (this.steps.length - 1)) {
      if (this.previous_btn != null) {
        this.previous_btn.removeAttribute('disabled', 'disabled');
      }
      if (this.next_btn != null) {
        this.next_btn.setAttribute('disabled', 'disabled');
      }
    } else {
      if (this.previous_btn != null) {
        this.previous_btn.removeAttribute('disabled', 'disabled');
      }
      if (this.next_btn != null) {
        this.next_btn.removeAttribute('disabled', 'disabled');
      }
    }
  }

  next_step() {
    var current_id = this.get_current_step_id();

    if (current_id == null) {
      return;
    }

    var next_id = current_id + 1,
      errors = [];

    if (typeof this.options.beforeNext != 'undefined' && this.options.beforeNext != null && this.options.beforeNext) {
      errors = this.options.beforeNext(current_id);
    }

    if (typeof errors == 'undefined') {
      errors = [];
    }

    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i++) {
        if (typeof this.options.onError != 'undefined' && this.options.onError != null && this.options.onError) {
          this.options.onError(errors[i]);
        }
      }

      return;
    }

    if (next_id >= this.steps.length) {
      if (typeof this.options.onFinish != 'undefined' && this.options.onFinish != null && this.options.onFinish) {
        this.options.onFinish(current_id);
      }
      this.deactivate_step(current_id);
    } else {
      this.complete_step(current_id);
      this.activate_step(next_id);
    }
  }

  previous_step() {
    var current_id = this.get_current_step_id();
    if (current_id == null) {
      return;
    }

    this.uncomplete_step(current_id - 1);
    this.activate_step(current_id - 1);
  }

  /**
   * Activate a single step,
   * will deactivate all other steps.
   */
  activate_step(step_id) {
    this.updateActions(this.steps[step_id]);

    for (var i = 0; i < this.steps.length; i++) {
      var _step = this.steps[i];

      if (_step == this.steps[step_id]) {
        continue;
      }

      this.deactivate_step(i);
    }

    this.steps[step_id].classList.add(this.options.active_class);
    if (typeof this.contents[step_id] !== 'undefined') {
      this.contents[step_id].classList.add(this.options.active_class);
    }

    if (typeof this.options.onShow != 'undefined' && this.options.onShow != null && this.options.onShow) {
      this.options.onShow(step_id);
    }
  }

  complete_step(step_id) {
    this.steps[step_id].classList.add(this.options.completed_class);
  }

  uncomplete_step(step_id) {
    this.steps[step_id].classList.remove(this.options.completed_class);
  }

  deactivate_step(step_id) {
    this.steps[step_id].classList.remove(this.options.active_class);
    if (typeof this.contents[step_id] !== 'undefined') {
      this.contents[step_id].classList.remove(this.options.active_class);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var stepsContainers = document.querySelectorAll('.steps');
  [].forEach.call(stepsContainers, (stepsContainer) => {
    var stepsWizard = new StepsWizard(stepsContainer);
  });
});

return StepsWizard;

}());
