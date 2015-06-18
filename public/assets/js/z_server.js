var ANALYSE_URL, API_URL;

window.App = {
  params: function() {
    var array, i, len, param, rawData, result;
    result = {};
    rawData = window.location.href.split("?")[1].split("&");
    for (i = 0, len = rawData.length; i < len; i++) {
      param = rawData[i];
      array = param.split('=');
      result[array[0]] = array[1];
    }
    return result;
  },
  getStatus: function() {},
  channel: function() {
    return "WeChat";
  },
  analyse: function(platform, pageName) {
    var id;
    id = (Math.random() * Math.random()).toString(16);
    return $.ajax({
      type: "POST",
      url: "" + ANALYSE_URL,
      data: JSON.stringify({
        client: {
          id: id,
          platform: platform,
          app_version: 0.7,
          app_channel: window.App.channel()
        },
        session: {
          id: id
        },
        events: [
          {
            "event": "_page",
            "duration": 100000,
            "tag": pageName
          }
        ]
      }),
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      success: function(data, _) {
        return console.log(data);
      },
      headers: {
        "X-AVOSCloud-Application-Id": "tua132u1316bi5opzxm7zjknwaq6qnb2i5rkp3d2h96m18z2",
        "X-AVOSCloud-Application-Key": "qs35km6zeer3sglasmy6nkcc9zhc4s1cbyu2j7kkskhsr1g4"
      }
    });
  },
  init: function() {
    return window.current = new Share;
  },
  host: function() {
    var host, hostname;
    hostname = window.location.host;
    host = "";
    if (hostname === "www.google.com") {
      host = "Google";
    } else {
      host = "LuZhouLaoJiao";
    }
    return host;
  }
};

(function() {
  var decode, encode, parseCookieValue, pluses, read, stringifyCookieValue;
  pluses = /\+/g;
  encode = function(s) {
    return encodeURIComponent(s);
  };
  decode = function(s) {
    return decodeURIComponent(s);
  };
  stringifyCookieValue = function(value) {
    console.log(value);
    return String(value);
  };
  parseCookieValue = function(s) {
    var e;
    if (s.indexOf('"') === 0) {
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }
    try {
      s = decodeURIComponent(s.replace(pluses, ' '));
      return s;
    } catch (_error) {
      e = _error;
      return console.log(e);
    }
  };
  read = function(s) {
    var value;
    value = parseCookieValue(s);
    return value;
  };
  window.App.cookie = function(key, value) {
    var cookie, cookies, i, len, name, parts, result, thisCookie;
    if (arguments.length > 1 && !_.isFunction(value)) {
      return document.cookie = [encode(key), '=', stringifyCookieValue(value)].join('');
    }
    if (key) {
      result = void 0;
    } else {
      result = {};
    }
    cookies = document.cookie.split('; ');
    for (i = 0, len = cookies.length; i < len; i++) {
      cookie = cookies[i];
      parts = cookie.split('=');
      name = decode(parts.shift());
      thisCookie = parts.join('=');
      if (key === name) {
        result = read(thisCookie);
        if (result.length === 0) {
          result = void 0;
        }
        break;
      }
      if (!key) {
        result[name] = read(thisCookie) || void 0;
      }
    }
    return result;
  };
  return window.App.removeCookie = function(key) {
    window.App.cookie(key, '');
    return !window.App.cookie(key);
  };
}).call();

window.Cookie = {
  set: function(target, value) {
    return App.cookie(target, value);
  },
  read: function(target) {
    return App.cookie(target);
  },
  "delete": function(target) {
    return App.removeCookie(target);
  },
  info: function() {
    return App.cookie();
  }
};

API_URL = "https://leancloud.cn/1.1/classes";

ANALYSE_URL = "https://api.leancloud.cn/1.1/stats/open/collect";

this.APIModel = (function() {
  function APIModel() {}

  APIModel.prototype.__apiReq = function(set) {
    var result;
    if (set == null) {
      set = {
        method: 'GET',
        data: {},
        params: {},
        url: ""
      };
    }
    result = {};
    $.ajax({
      type: set.method,
      url: API_URL + "/" + set.url,
      params: set.params,
      data: JSON.stringify(set.data),
      contentType: "application/json;charset=utf-8",
      dataType: "json",
      async: false,
      success: function(data, _) {
        return result = data;
      },
      headers: {
        "X-AVOSCloud-Application-Id": "tua132u1316bi5opzxm7zjknwaq6qnb2i5rkp3d2h96m18z2",
        "X-AVOSCloud-Application-Key": "qs35km6zeer3sglasmy6nkcc9zhc4s1cbyu2j7kkskhsr1g4"
      }
    });
    return result;
  };

  APIModel.prototype.__mountData = function(data) {
    var that;
    that = this;
    console.log("Mount data!");
    _.mapObject(data, function(k, v) {
      return that[v] = k;
    });
  };

  return APIModel;

})();

var TICKET_ID,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TICKET_ID = {
  JXWTicket: {
    0: "557dd65ae4b0bd33aa27a809",
    1: "557dd6b6e4b0bd33aa27a90a",
    2: "557dd6ebe4b0bd33aa27a9af",
    3: "557dd712e4b0bd33aa27aa2b",
    4: "557dd723e4b0bd33aa27aa60"
  },
  SRXTicket: {
    0: "557dd7d5e4b0bd33aa27ac29",
    1: "557dd6b6e4b0bd33aa27ac52",
    2: "557dd7f7e4b0bd33aa27ac89",
    3: "557dd712e4b0bd33aa27ace7",
    4: "557dd723e4b0bd33aa27ad28"
  }
};

this.Ticket = (function(superClass) {
  extend(Ticket, superClass);

  function Ticket(domain) {
    if (domain === 'jxw') {
      this.modelName = "JXWTicket";
    } else {
      this.modelName = "SRXTicket";
    }
    return;
  }

  Ticket.prototype.getByType = function(type) {
    var data, id, that;
    id = TICKET_ID[this.modelName][type];
    that = this;
    data = this.__apiReq({
      method: 'GET',
      url: that.modelName + "/" + id
    });
    this.__mountData(data);
    return this.times > 0;
  };

  Ticket.prototype.update = function(data) {
    var APIdata, that;
    if (data == null) {
      data = {};
    }
    that = this;
    APIdata = this.__apiReq({
      method: 'PUT',
      url: that.modelName + "/" + that.objectId,
      data: data
    });
    return this.__getInfo();
  };

  Ticket.prototype.use = function() {
    this.update({
      times: this.times - 1
    });
    this.__getInfo();
    return true;
  };

  Ticket.prototype.__getInfo = function() {
    var data, that;
    that = this;
    data = this.__apiReq({
      url: that.modelName + "/" + that.objectId
    });
    return this.__mountData(data);
  };

  return Ticket;

})(APIModel);

this.Share = (function(superClass) {
  extend(Share, superClass);

  function Share(objectId) {
    this.objectId = objectId != null ? objectId : "";
    this.modelName = "Share";
    if (this.objectId.length > 1) {
      this.__getInfo();
    }
    return;
  }

  Share.prototype.create = function(data) {
    var APIdata, that;
    if (data == null) {
      data = {};
    }
    console.log(this.modelName);
    that = this;
    APIdata = this.__apiReq({
      method: 'POST',
      url: "" + that.modelName,
      data: data
    });
    this.__mountData(APIdata);
    return this.__getInfo();
  };

  Share.prototype.__getInfo = function() {
    var data, that;
    that = this;
    data = this.__apiReq({
      url: that.modelName + "/" + that.objectId
    });
    return this.__mountData(data);
  };

  Share.prototype.update = function(data) {
    var APIdata, that;
    if (data == null) {
      data = {};
    }
    that = this;
    APIdata = this.__apiReq({
      method: 'PUT',
      url: that.modelName + "/" + that.objectId,
      data: data
    });
    return this.__getInfo();
  };

  Share.prototype.help = function() {
    this.update({
      helper: this.helper + 1
    });
    this.__getInfo();
    return true;
  };

  Share.prototype.setTicketType = function(type) {
    this.update({
      ticketType: type
    });
    this.__getInfo();
    return true;
  };

  Share.prototype.status = function() {
    var ref;
    return (ref = this.helper >= 2) != null ? ref : {
      "true": false
    };
  };

  Share.prototype.left = function() {
    var ref;
    return (ref = this.helper >= 2) != null ? ref : {
      0: 2 - this.helper
    };
  };

  Share.prototype.getTicket = function(domain) {
    var getType, that, ticket, type;
    ticket = new Ticket(domain);
    that = this;
    if (this.ticketType) {
      ticket.getByType(that.ticketType);
    } else {
      getType = function() {
        var result, seed, type;
        seed = Math.random * _.now();
        result = seed % 250000;
        type = (function() {
          switch (false) {
            case !(result <= 100):
              return 4;
            case !(result > 100 && result <= 600):
              return 3;
            case !(result > 600 && result <= 2600):
              return 2;
            case !(result > 2600 && result <= 7600):
              return 1;
            default:
              return 0;
          }
        })();
        return type;
      };
      if (ticket.getByType(type = getType())) {
        ticket.use();
        that.setTicketType(type);
      } else {
        ticket.getByType(0);
        that.setTicketType(0);
      }
    }
    return ticket;
  };

  return Share;

})(APIModel);
