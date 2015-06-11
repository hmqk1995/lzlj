# Share ->> ownerId:string helper:[string] status:
class @Share extends APIModel
    constractor: (ownerId = null) ->
        if ownerId != null
            @__getDataByOwnerId ownerId
        return


    share: () ->
        return

    create: (ownerId) ->
        @__analyseData @__apiReq
            method: "POST"
            url: "Share"
            data:
                ownerId: ownerId

    helpd: () ->
        data = 
            helper:
                "__op": "AddUnique"
                "objects": [helperId]
        console.log data
        result = @__apiReq
            method: "PUT"
            url: "Share/#{@objectId}"
            data: data
        console.log result
        @__updateData()
        return


    __getDataByOwnerId: (ownerId) ->
        data = @__apiReq
            url: "Share"
            params:
                where: "{'ownerId':'#{ownerId}'}"
        @__analyseData data.results[0]
        return 

    __updateData: ->
        @__analyseData @__apiReq
            url: "Share/#{@objectId}"
        return


    __analyseData: (json) ->
        @objectId = json.objectId
        @helpers  = json.helper
        @ownerId  = json.ownerId
        @status = @__isDone()
        console.log "objectId: #{@objectId}, ownerId: #{@ownerId}, helpers: #{@helpers}"
        return

    __isDone: ->
        if _.uniq(@helpers).length > 2
            return true
        else
            return false
