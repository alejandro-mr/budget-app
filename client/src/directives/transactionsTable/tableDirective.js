import Controller from './tableCtrl';

export default function TableDirective() {
  function compile(elem, attrs) {
  };

  return {
    bindToController: true,
    compile: compile,
    controller: Controller,
    controllerAs: 'vm',
    restrict: 'A',
    scope: {
    }
  };
}

TableDirective.$inject = [];



