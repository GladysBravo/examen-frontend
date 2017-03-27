'use strict';

class DataService {

    constructor($http, $q, $location, $sce, DataServiceConfig, HTTPCanceler, Message, Util, restUrl, appName, errorsLang, $log) {
        'ngInject';

        this.$http = $http;
        this.$sce = $sce;
        this.defer = $q.defer();
        this.Message = Message;
        this.Util = Util;
        this.DataServiceConfig = DataServiceConfig;
        this.HTTPCanceler = HTTPCanceler;
        this.canceler = this.HTTPCanceler.get(this.defer, this.appName);
        this.restUrl = restUrl;
        this.errorsLang = errorsLang;
        this.appName = appName;

        this.PATERN_HOST = $location.protocol() == 'https' ? /(https:\/\/|www\.)\S+/i : /(http:\/\/|www\.)\S+/i;
        this.$log = $log;
    }

    cancelRequest() {
        this.HTTPCanceler.cancel();
        this.canceler = this.HTTPCanceler.get(this.defer, this.appName);
        this.cancel = true;
    }

    getUrl(url, id) {
        id = typeof id == 'string' ? `/${id}` : typeof id == 'object' && id.id ? `${id.id}/`: '';
        return this.PATERN_HOST.test(url)? (url + id) : this.restUrl + url + id;
    }

    options(url) {
        return this._http('options', url);
    }

    get(url, id) {
        return this._http('get', url, id);
    }

    post(url, data) {
        return this._http('post', url, data);
    }

    put(url, data) {
        return this._http('put', url, data);
    }

    patch(url, data) {
        return this._http('patch', url, data);
    }

    remove(url, id) {
        return this._http('delete', url, id);
    }

    list(url, query) {
        query = query ? '?' + this.Util.serialize(query) : '';
        return this._http('get', url + query);
    }

    save(url, data) {
        return this._http(data.id ? 'put' : 'post', url, data);
    }

    _http(method, url, data) {

        url = this.getUrl(url, data);
        this.$log.log('DataService:' ,method.toUpperCase(), url, data || '');

        let setting = {
            method,
            url,
            timeout: this.canceler.promise
        };

        if (typeof data == 'object' && Object.key(data).length) {
            setting.data = data;
        }

        return this.$http(setting)
        .then(response => this.filterResponse(response.data))
        .catch(error => this.msgError(error));
    }

    pdf(url, data = {}) {
        url = this.getDomain(url);
        return this.$http.post(url, data, { responseType:'arraybuffer' })
        .then(response => {
            if (response.data) {
                let file = new window.Blob([response.data], { type: 'application/pdf' });
                let fileURL = window.URL.createObjectURL(file);
                return this.$sce.trustAsResourceUrl(fileURL);
            }
            return null;
        }).catch(error => this.msgError(error));
    }

    setFormly(data) {
        this.formly = data;
    }

    filterResponse(response) {
        if (typeof this.DataServiceConfig.filterResponse == 'function') {
            return this.DataServiceConfig.filterResponse(response, this.Message);
        }            
        return response;
    }

    msgError(error) {
        let statusErrors = [500, 404, 409, 403, 401, 502];
        // let statusWarnings = [503, 409];

        if (error.status === 408 || error.status === 504) {
            return error;
        } else if (this.errorsLang[error.status]) {
            this.Message[ statusErrors.indexOf(error.status) != -1 ? 'error' : 'warning' ](error.data.mensaje && typeof error.data.mensaje == 'string' ? error.data.mensaje : this.errorsLang[error.status]);
        } else if (this.cancel) {
            this.Message.warning(this.errorsLang.cancelRequest);
            this.cancel = false;
        } else {
            this.Message.error(this.parseError(error.data) || this.errorsLang.connection);
        }

        return null;
    }

    parseError(error) {
        let message = [];
        if (error) {
            if (error.detail || error.error) {
                return error.detail || error.error;
            }
            if (Object.keys({}).length === 0) {
                return error;
            }
            for (let i in error) {
                let label = i;
                if (this.formly) {
                    for (let el of this.formly) {
                        if (el.key == i) {
                            label = el.templateOptions.label;
                            break;
                        }
                    }
                }
                message.push('<strong>' + label + ':</strong> ' + (this.Util.toType(error[i]) == 'array' ? error[i].join(', ') : error[i]));
            }
            return message.join('<br>');
        }
        return null;
    }
    
}

export default DataService;