authHookRunBlock.$inject = ['$transitions', 'authService'];
export function authHookRunBlock($transitions, AuthService) {
  let requiresAuthCriteria = {
    to: (state) => state.data && state.data.requiresLogin
  };

  let redirectToLogin = (transition) => {
    let AuthService = transition.injector().get('authService');
    let $state = transition.router.stateService;
    if (!AuthService.isAuthenticated()) {
      return $state.target('login', undefined, { location: false });
    }
  };

  $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
}
