import pako from 'pako';

export function fetchTgs(path) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                try {
                    // Attempt to convert it to JSON as is:

                    const data = String.fromCharCode.apply(
                        null,
                        new Uint8Array(xhr.response),
                    );
                    return resolve(JSON.parse(data));
                } catch (err) {
                    // Attempt to ungzip response and convert to JSON:

                    try {
                        const data = pako.inflate(xhr.response, {
                            to: 'string',
                        });
                        return resolve(JSON.parse(data));
                    } catch (err) {
                        return reject(err);
                    }
                }
            }
        };
    });
}
