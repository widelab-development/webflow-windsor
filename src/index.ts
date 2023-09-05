import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Jan Kowalski 2';
  greetUser(name);
});
