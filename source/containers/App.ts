import { Component, Inject } from 'angular2/core';

@Component({
  selector: 'app',
  template: '<h1>Denver Streets</h1>'
})
export default class AppContainer {
  constructor(@Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis/*, this.mapDispatchToThis */)(this);
  }

  unsubscribe() {}

  ngOnInit() {}

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    // TODO: bind state properties to 'this'
    return {
      // someProp: state.someProp
    };
  }

  mapDispatchToThis(dispatch) {
    // TODO (optional): bind action creators to 'this'
    // return { actions: bindActionCreators(SomeActions, dispatch) };
  }
}
