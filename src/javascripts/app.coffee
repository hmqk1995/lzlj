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
        return "test"

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