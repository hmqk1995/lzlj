# Share ->> ownerId:string helper:[string] status:
class @Share extends APIModel
    constructor: (@objectId = "") ->
        @modelName = "Share"
        if @objectId.length > 1
            @__getInfo()
        return

    create: (data = {}) ->
        console.log @modelName
        that = this
        APIdata = @__apiReq
            method: 'POST'
            url: "#{that.modelName}"
            data: data
        @__mountData APIdata

    __getInfo: ->
        that = this
        data = @__apiReq
            url: "#{that.modelName}/#{that.objectId}"
        @__mountData data

    update: (data = {}) ->
        that = this
        APIdata = @__apiReq
            method: 'PUT'
            url: "#{that.modelName}/#{that.objectId}"
            data: data
        @__mountData APIdata

    help: ->
        @update
            helper: @helper + 1
        return true

    status: ->
        return (@helper >= 2 ? true : false)

    left: ->
        return (@helper >=2 ? 0 : 2 - @helper)