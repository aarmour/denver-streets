import { Component, Inject } from 'angular2/core';
import Map from './map-container.component';

@Component({
  selector: 'app',
  directives: [Map],
  template: `
    <map></map>
  `
})
export default class AppContainer {
  constructor(@Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis/*, this.mapDispatchToThis */)(this);
  }

  unsubscribe() {}

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
