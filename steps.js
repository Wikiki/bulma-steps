class StepsWizard {
  constructor( element = null, options = {} ) {
    this.options = Object.assign( {}, {
      'selector': '.step-item',
      'previous_selector': '[data-nav="previous"]',
      'next_selector': '[data-nav="next"]',
      'active_class': 'is-active',
      'completed_class': 'is-completed',
      'beforeNext': null,
      'onFinish': null,
      'onError': null
    }, options );

    this.element = element;
    this.steps = element.querySelectorAll( this.options.selector );
    this.previous_btn = element.querySelector( this.options.previous_selector );
    this.next_btn = element.querySelector( this.options.next_selector );

    this.init();
  }

  init() {
    for ( var i = 0; i < this.steps.length; i++ ) {
      var step = this.steps[ i ];

      step.setAttribute( 'data-step-id', i );
    }

    this.bind();

    this.start();
  }

  bind() {
    var _this = this;

    if ( this.previous_btn != null ) {
      this.previous_btn.addEventListener( 'click', function( e ) {
        _this.previous_step();
      } );
    }

    if ( this.next_btn != null ) {
      this.next_btn.addEventListener( 'click', function( e ) {
        _this.next_step();
      } );
    }
  }

  start() {
    this.activate_step( this.steps[ 0 ] );
    this.updateActions( this.steps[ 0 ] );
  }

  get_current_step_id() {
    for ( var i = 0; i < this.steps.length; i++ ) {
      var step = this.steps[ i ];

      if ( step.classList.contains( this.options.active_class ) ) {
        return parseInt( step.getAttribute( 'data-step-id' ) );
      }
    }

    return null;
  }

  updateActions( step ) {
    var stepId = parseInt( step.getAttribute( 'data-step-id' ) );
    if ( stepId == 0 ) {
      this.previous_btn.setAttribute( 'disabled', 'disabled' );
      this.next_btn.removeAttribute( 'disabled', 'disabled' );
    } else if ( stepId == ( this.steps.length - 1 ) ) {
      this.previous_btn.removeAttribute( 'disabled', 'disabled' );
      this.next_btn.setAttribute( 'disabled', 'disabled' );
    } else {
      this.previous_btn.removeAttribute( 'disabled', 'disabled' );
      this.next_btn.removeAttribute( 'disabled', 'disabled' );
    }
  }

  next_step() {
    var current_id = this.get_current_step_id();

    if ( current_id == null ) {
      return;
    }

    var next_id = current_id + 1,
        errors = [];

    if ( typeof this.options.beforeNext != 'undefined' &&
        this.options.beforeNext != null &&
        this.options.beforeNext ) {
      errors = this.options.beforeNext( this.steps[ current_id ] );
    }

    if ( typeof errors == 'undefined' ) {
      errors = [];
    }

    if ( errors.length > 0 ) {
      for ( var i = 0; i < errors.length; i++ ) {
        if ( typeof this.options.onError != 'undefined' &&
            this.options.onError != null &&
            this.options.onError ) {
          this.options.onError( errors[ i ] );
        }
      }

      return;
    }

    if ( next_id >= this.steps.length ) {
      if ( typeof this.options.onFinish != 'undefined' &&
          this.options.onFinish != null &&
          this.options.onFinish ) {
        this.options.onFinish( this.steps[ current_id ] );
      }
      this.deactivate_step( this.steps[ current_id ] );
    } else {
      this.complete_step( this.steps[ current_id ] );
      this.activate_step( this.steps[ next_id ] );
    }
  }

  previous_step() {
    var current_id = this.get_current_step_id();
    if ( current_id == null ) {
      return;
    }

    this.uncomplete_step( this.steps[ current_id - 1 ] );
    this.activate_step( this.steps[ current_id - 1 ] );
  }

  /**
   * Activate a single step,
   * will deactivate all other steps.
   */
  activate_step( step ) {
    this.updateActions( step );

    for ( var i = 0; i < this.steps.length; i++ ) {
      var _step = this.steps[ i ];

      if ( _step == step ) {
        continue;
      }

      this.deactivate_step( _step );
    }

    step.classList.add( this.options.active_class );
  }

  complete_step( step ) {
    step.classList.add( this.options.completed_class );
  }

  uncomplete_step( step ) {
    step.classList.remove( this.options.completed_class );
  }

  deactivate_step( step ) {
    step.classList.remove( this.options.active_class );
  }
}

document.addEventListener( 'DOMContentLoaded', function () {
  var stepsWizard = new StepsWizard( document.getElementById( 'stepsDemo' ) );
} );
