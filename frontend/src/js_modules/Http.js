const hostName = "http://localhost:8800"

const Http = {
    _getHostName: function () {
        return hostName;
    },

    _sendRequest: async function (method = '', path = '', data = '', headers = {}) {
        const finalUrl = this._getHostName() + path;

        const response = await fetch(finalUrl, {
            method, // POST, PUT, DELETE, etc.
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: data
        })
        return response;
    },

    sendGetRequest: async function (path = '', data = {}) {
        let params = new URLSearchParams()
        for (let key in data) {
            params.append(key, data[key])
        }
        const queryString = params.toString() ? '?' + params.toString() : '';

        const finalUrl = this._getHostName() + path + queryString;
        console.log(finalUrl)

        const response = await fetch(finalUrl, {
            method: 'GET',
            cache: 'no-cache'
        })
        return response;
    },

    sendPutRequest: async function (path = '', data = {}, headers = {}) {
        const response = await this._sendRequest('PUT', path, JSON.stringify(data), headers);
        return response;
    },

    sendPostRequest: async function (path = '', data = {}, headers = {}) {
        const response = await this._sendRequest('POST', path, JSON.stringify(data), headers);
        return response;
    },

    sendDeleteRequest: async function (path = '', data = {}, headers = {}) {
        const response = await this._sendRequest('DELETE', path, JSON.stringify(data), headers);
        return response;
    },

    fetchJson: async function (path = '', data = {}) {
        const response = await this.sendGetRequest(path, data)
        return response.json()
    }
}

export default Http;