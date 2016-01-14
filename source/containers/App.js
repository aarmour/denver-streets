import { Component, Inject, InjectMetadata } from 'angular2/core';

@Component({
  selector: 'app',
  template: '<h1>Denver Streets</h1>'
})
@Reflect.metadata('parameters', [[new InjectMetadata('ngRedux')]])
export default class AppContainer {
  constructor(ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis/*, this.mapDispatchToThis */)(this);
  }

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
