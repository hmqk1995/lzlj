window.App =
    params: ->
        result = {}
        rawData = window.location.href.split("?")[1].split("&") 
        for param in rawData
            array = param.split '='
            result[array[0]] = array[1]
        return result

    getStatus: ->

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

class @APIModel
    __apiReq: (set = {method: 'GET', data: {}, params: {}, url: ""}) ->
        result = {}
        $.ajax
            type: set.method
            url: "#{API_URL}/#{set.url}"
            dataType: "JSON"
            params: set.params
            data: set.data
            async: false
            success: (data, _) ->
                result = data
            headers:
                "X-AVOSCloud-Application-Id": "tua132u1316bi5opzxm7zjknwaq6qnb2i5rkp3d2h96m18z2"
                "X-AVOSCloud-Application-Key": "qs35km6zeer3sglasmy6nkcc9zhc4s1cbyu2j7kkskhsr1g4"
        return result

        

    