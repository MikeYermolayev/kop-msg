import monkey from '../assets/monkey/TwoFactorSetupMonkeyIdle.tgs';
import './sms.scss';
import lottie from 'lottie-web';
import { fetchTgs } from '../utils/fetchTgs';

export function render(state) {
    const page = document.createElement('div');
    page.id = 'sms';

    const player = document.createElement('div');
    player.id = 'monkey';

    return fetchTgs(monkey).then(function(animationData) {
        lottie.loadAnimation({
            container: player,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData,
        });

        const h1 = document.createElement('h1');
        h1.innerText = state.phone;

        const h4 = document.createElement('h4');
        h4.innerText = 'We have sent you an SMS with the code.';

        page.appendChild(player);
        page.appendChild(h1);
        page.appendChild(h4);

        return page;
    });
}
