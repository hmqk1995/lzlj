TICKET_ID =
    JXWTicket:
        0: "557dd65ae4b0bd33aa27a809"
        1: "557dd6b6e4b0bd33aa27a90a"
        2: "557dd6ebe4b0bd33aa27a9af"
        3: "557dd712e4b0bd33aa27aa2b"
        4: "557dd723e4b0bd33aa27aa60"
    SRXTicket:
        0: "557dd7d5e4b0bd33aa27ac29"
        1: "557dd6b6e4b0bd33aa27ac52"
        2: "557dd7f7e4b0bd33aa27ac89"
        3: "557dd712e4b0bd33aa27ace7"
        4: "557dd723e4b0bd33aa27ad28"


class @Ticket extends APIModel
    constructor: (domain) ->
        if domain == 'jxw'
            @modelName = "JXWTicket"
        else
            @modelName = "SRXTicket"
        return

    getByType: (type) ->
        id = TICKET_ID[@modelName][type]
        that = this
        data = @__apiReq
            method: 'GET'
            url: "#{that.modelName}/#{id}"
        @__mountData data
        return (@times > 0)

    update: (data = {}) ->
        that = this
        APIdata = @__apiReq
            method: 'PUT'
            url: "#{that.modelName}/#{that.objectId}"
            data: data
        @__getInfo()

    use: ->
        @update
            times: @times - 1
        @__getInfo()
        return true

    __getInfo: ->
        that = this
        data = @__apiReq
            url: "#{that.modelName}/#{that.objectId}"
        @__mountData data


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
        @__getInfo()

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
        @__getInfo()

    help: ->
        @update
            helper: @helper + 1
        @__getInfo()
        return true

    setTicketType: (type) ->
        @update
            ticketType: type
        @__getInfo()
        return true

    status: ->
        return (@helper >= 2 ? true : false)

    left: ->
        return (@helper >=2 ? 0 : 2 - @helper)

    getTicket: (domain) ->
        ticket = new Ticket(domain)
        that = this

        if @ticketType
            ticket.getByType(that.ticketType)
        else
            getType = ->
                seed = Math.random *  _.now()
                result = seed % 250000
                type = switch
                    when result <= 50 then 4
                    when result > 50 && result <= 100 then 3
                    when result > 100 && result <= 4100 then 2
                    when result > 4100 && result <= 14100 then 1
                    else 0
                return type

            if ticket.getByType(type = getType())
                ticket.use()
                that.setTicketType type
            else
                ticket.getByType(0)
                that.setTicketType 0


        return ticket





