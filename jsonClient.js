module.exports = { configure, getJSON };
const HTTP_SUCCESS = 200;

/**
 * Configure the module
 * @param {Request} request
 */
let _request = null;
function configure(request) {
    _request = request;
}

/**
 * Get the data
 * @param {String} url
 * @returns {Promise<Object>}
 */
function getJSON(url) {
    return new Promise((resolve, reject) => {
        const opt = {
            url
        };

        _request.get(opt, (err, response, bodyStr) => {

            if (err || response.statusCode !== HTTP_SUCCESS) {
                return reject(err);
            }

            try {
                return resolve(JSON.parse(bodyStr));
            } catch (e) {
                return reject(e)
            }

        });
    });
}


