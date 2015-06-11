# Share ->> ownerId:string helper:[string] status:
class @Share extends APIModel
    constractor: (@objectId = "") ->
        @modelName = "Share"
        if @objectId.length > 1
            @__getInfo()
        return

    help: ->
        @update
            helper: @helper + 1
        return true

    status: ->
        return (@helper >= 2 ? true : false)

    left: ->
        return (@helper >=2 ? 0 : 2 - @helper)