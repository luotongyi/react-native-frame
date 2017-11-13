
import xml2js from 'react-native-xml2js';

/**
 * 请求返回的数据解析格式enum
 */
export const ReponseParserType = {
    ReponseParserType_JSON: 0,
    ReponseParserType_XML: 1
}

/**
 * 网络请求处理
 * 
 * @export
 * @class HTTPRequest
 */
export default class HTTPRequest {

    /**
     * 网络请求方法，可以自己设置method、header、parserType
     * 
     * @static
     * @param {any} url 
     * @param {any} params 
     * @param {any} method 
     * @param {any} header 
     * @param {any} parseType 
     * @memberof HTTPRequest
     */
    static fetchRequest(url, params, method, headers, parserType) {

        //处理get请求，params拼接
        let paramsArray = [];
        if (method == 'GET') {
            if (params) {
                Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
                if (url.search(/\?/) === -1) {
                    url += '?' + paramsArray.join('&');
                } else {
                    url += '&' + paramsArray.join('&');
                }
            }
        }
        //根据解析修改headers，并
        let defaultHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };

        return new Promise((resolve, reject) => {
            _fetch(fetch(url, {
                method: method,
                headers: headers === null ? defaultHeaders : headers,
                body: method == 'GET' ? null : JSON.stringify(params)
            }))
                .then((response) => {
                    if (response.ok) {
                        if (parserType == ReponseParserType.ReponseParserType_XML) {
                            //xml解析
                            response = response.text();
                            console.log('xml ==', response);
                        }
                        else {
                            //默认全部json解析
                            response = response.json();
                            console.log('json ==', response);
                        }
                        return response;
                    } else {
                        reject(new Error(response.status + ' ' + response));
                    }
                })
                .then((response) => {
                    if (parserType == ReponseParserType.ReponseParserType_XML) {
                        xml2js.parseString(response, (err, result) => {
                            resolve(result)
                        });
                    } else {
                        resolve(response);
                    }
                })
                .catch((error) => {
                    reject({ status: -1, error: error });
                })
        })
    }

    /**
     * 默认的网络请求方法
     * method:POST,
     * header:null,
     * parserType:JSON
     * 
     * @static
     * @param {any} url 
     * @param {any} params 
     * @memberof HTTPRequest
     */
    static fetchDefaultRequest(url, params) {

        return HTTPRequest.fetchRequest(url, params, 'POST', null, ReponseParserType.ReponseParserType_JSON)
    }
}

/**
 * 请求超时失败的处理
 * @param {*} requestPromise 
 * @param {*} timeout 
 */
const _fetch = (requestPromise, timeout = 30000) => {
    let timeoutAction = null;
    const timerPromise = new Promise((resolve, reject) => {
        timeoutAction = () => {
            reject('请求超时');
        }
    })
    setTimeout(() => {
        timeoutAction()
    }, timeout)
    return Promise.race([requestPromise, timerPromise]);
}