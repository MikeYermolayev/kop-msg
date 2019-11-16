import lottie from 'lottie-web';

export function loadAnimation(
    animElement,
    container,
    name,
    promise,
    loop,
    autoplay,
) {
    if (animElement && animElement.name === name) {
        return Promise.resolve(animElement);
    }

    return promise.then(function(animationData) {
        animElement && animElement.destroy();

        return lottie.loadAnimation({
            container,
            renderer: 'svg',
            loop,
            autoplay,
            name,
            animationData,
        });
    });
}
