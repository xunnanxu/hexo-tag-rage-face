/*global hexo:true*/

(function (hexo) {
    var Promise = require('bluebird');
    var request = Promise.promisify(require('request'));

    var _cache = {};

    var baseUrl = 'http://www.memes.at/faces/';
    var exts = ['.jpg', '.gif', '.png'];

    function requestUrls(name, urls) {
        function requestHelper(i) {
            if (i >= urls.length) {
                return Promise.resolve(null);
            }
            var cached = _cache[name];
            if (cached) {
                return Promise.resolve(cached);
            }
            return request(urls[i]).then(function (response) {
                if (response.statusCode !== 200) {
                    return requestHelper(i + 1);
                }
                _cache[name] = urls[i];
                return urls[i];
            }, function () {
                return requestHelper(i + 1);
            });
        }
        return requestHelper(0);
    }

    function parseArgs(args) {
        var parsed = {};
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            if (!arg) {
                continue;
            }
            var kv = arg.split(':');
            if (kv.length < 2) {
                continue;
            }
            parsed[kv[0]] = arg.substring(kv[0].length + 1);
        }
        return parsed;
    }

    hexo.extend.tag.register('rage_face', function(args) {
        if (!args || !args[0]) {
            return Promise.resolve('');
        }
        var name = args[0];
        var argMap = parseArgs(args.slice(1));
        var nameRef = args[0].toLowerCase().replace(/[ ]/g, '_');
        var candidates = exts.map(function (ext) {
            return baseUrl + nameRef + ext;
        });
        return requestUrls(name, candidates).then(function (url) {
            var imgAttrStrs = [];
            if (url) {
                imgAttrStrs.push('src="' + url + '"');
                imgAttrStrs.push('alt="' + name + '"');
                for (var k in argMap) {
                    imgAttrStrs.push(k + '="' + argMap[k] + '"');
                }
                return '<img ' + imgAttrStrs.join(' ') + '>';
            }
            return '';
        });
    }, {
        async: true
    });
})(hexo);
