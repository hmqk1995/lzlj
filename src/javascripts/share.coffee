# Share ->> ownerId:string helper:[string] status:
class @Share extends APIModel
    constractor: (@objectId = "") ->
        @modelName = "Share"
        if @objectId.length > 1
            @__mountData @__getInfo()
        return


    share: () ->
        return