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
        id = (typeof id == 'string' || typeof id == 'number') ? `${id}` : typeof id == 'object' && id.id ? `${id.id}`: '';
        if (url[url.length - 1] != '/' && id.length > 1) {
            id = `/${id}`;
        }
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
        this.$log.log('DataService:', method.toUpperCase(), url, data || '');

        let setting = {
            method,
            url,
            timeout: this.canceler.promise
        };

        if (typeof data == 'object' && Object.keys(data).length) {
            delete data.id;
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
        var statusErrors = [500, 404, 409, 403, 401, 400, 502];

        if (error.status === 408 || error.status === 504) {
            return error;
        } else if (this.errorsLang[error.status]) {
            this.Message[ statusErrors.indexOf(error.status) != -1 ? 'error' : 'warning' ](error.data.message && typeof error.data.message == 'string' ? error.data.message : this.parseError(error.data) || this.errorsLang[error.status], error.data.errors ? this.errorsLang.validation : null);
        } else if (this.cancel) {
            this.Message.warning(this.errorsLang.cancelRequest);
            this.cancel = false;
        } else {
            this.Message.error(this.parseError(error.data) || this.errorsLang.connection, error && error.data && error.data.message ? error.data.message : null);
        }

        return null;
    }

    parseError(error) {
        var message = [];
        if (error) {
            if (error.errors) {                
                if (error.detail || error.error) {
                    return error.detail || error.error;
                }
                if (Object.keys(error.errors).length === 0) {
                    return error;
                }

                error = error.errors;
                for (let i in error) {
                    message.push('<strong>' + (error[i].label || i) + ':</strong> ' + (this.Util.toType(error[i].errors) == 'array' ? error[i].errors.join(', ') : error[i].errors));
                }
                return message.join('<br>');
            } else if (error.errorType && error.errorType == 'ValidationError') {
                error = error.property;
                for (let i in error) {
                    message.push('<strong>' + (error[i].label || i) + ':</strong> ' + (this.Util.toType(error[i].errors) == 'array' ? error[i].errors.join(', ') : error[i].errors));
                }
                return message.join('<br>');
            }
        }
        return null;
    }
    
}

export default DataService;