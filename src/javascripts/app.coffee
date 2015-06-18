window.App =
    params: ->
        result = {}
        rawData = window.location.href.split("?")[1].split("&") 
        for param in rawData
            array = param.split '='
            result[array[0]] = array[1]
        return result

    getStatus: ->

    channel: ->
        return "WeChat"

    analyse: (platform, pageName) ->
        id = (Math.random() * Math.random()).toString(16)
        $.ajax
            type: "POST"
            url: "#{ANALYSE_URL}"
            data: JSON.stringify
                client:
                    id: id
                    platform: platform
                    app_version: 0.7
                    app_channel: window.App.channel()
                session:
                    id: id
                events: [
                    {
                        "event": "_page"
                        "duration": 100000
                        "tag": pageName
                    }
                ]
            contentType: "application/json;charset=utf-8"
            dataType: "json"
            success: (data, _) ->
                console.log data
            headers:
                "X-AVOSCloud-Application-Id": "tua132u1316bi5opzxm7zjknwaq6qnb2i5rkp3d2h96m18z2"
                "X-AVOSCloud-Application-Key": "qs35km6zeer3sglasmy6nkcc9zhc4s1cbyu2j7kkskhsr1g4"

    init: ->
        window.current = new Share

    host: ->
        hostname = window.location.host
        host = ""
        if hostname == "www.google.com"
            host = "Google"
        else
            host = "LuZhouLaoJiao"
        return host
(->
    pluses = /\+/g

    encode = (s) ->
        encodeURIComponent s

    decode = (s) ->
        decodeURIComponent s

    stringifyCookieValue = (value) ->
        console.log value
        String value

    parseCookieValue = (s) ->
        if s.indexOf('"') == 0
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')

        try
            s = decodeURIComponent(s.replace(pluses, ' '))
            return s
        catch e
            console.log e

    read = (s) ->
        value = parseCookieValue s
        value

    window.App.cookie = (key, value) ->
        if arguments.length > 1 && !_.isFunction(value)
            return document.cookie = [encode(key), '=', stringifyCookieValue(value)].join('')

        if key
            result = undefined
        else
            result = {}
        cookies = document.cookie.split '; '

        for cookie in cookies
            parts = cookie.split '='
            name = decode parts.shift()
            thisCookie = parts.join '='

            if key == name
                result = read thisCookie
                result = undefined if result.length == 0
                break

            if !key
                result[name] = read(thisCookie) || undefined

        return result

    window.App.removeCookie = (key) ->
        window.App.cookie key, ''
        return !window.App.cookie key
).call()



window.Cookie = 
    set: (target, value) ->
        App.cookie(target, value)

    read: (target) ->
        App.cookie target

    delete: (target) ->
        App.removeCookie target

    info: ->
        App.cookie()

        


API_URL = "https://leancloud.cn/1.1/classes"
ANALYSE_URL = "https://api.leancloud.cn/1.1/stats/open/collect"

class @APIModel
    __apiReq: (set = {method: 'GET', data: {}, params: {}, url: ""}) ->
        result = {}
        $.ajax
            type: set.method
            url: "#{API_URL}/#{set.url}"
            params: set.params
            data: JSON.stringify set.data
            contentType: "application/json;charset=utf-8"
            dataType: "json"
            async: false
            success: (data, _) ->
                result = data
            headers:
                "X-AVOSCloud-Application-Id": "tua132u1316bi5opzxm7zjknwaq6qnb2i5rkp3d2h96m18z2"
                "X-AVOSCloud-Application-Key": "qs35km6zeer3sglasmy6nkcc9zhc4s1cbyu2j7kkskhsr1g4"
        return result

    __mountData: (data) ->
        that = this
        console.log "Mount data!"
        _.mapObject data, (k,v) ->
            that[v] = k
        return