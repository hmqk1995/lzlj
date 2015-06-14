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
    return "test";
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

window.Cookie = {
  set: function(target, value) {
    return $.cookie(target, value);
  },
  read: function(target) {
    return $.cookie(target);
  },
  "delete": function(target) {
    return $.removeCookie(target);
  },
  info: function() {
    return $.cookie();
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

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

  return Share;

})(APIModel);
