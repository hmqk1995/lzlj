var API_URL;

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

API_URL = "https://leancloud.cn/1.1/classes";

this.APIModel = (function() {
  function APIModel() {}

  APIModel.prototype.create = function(data) {
    if (data == null) {
      data = {};
    }
    return this.__mountData(this.__apiReq({
      method: 'POST',
      url: "" + this.modelName,
      data: data
    }));
  };

  APIModel.prototype.__getInfo = function() {
    return this.__mountData(this.__apiReq({
      url: this.modelName + "/" + this.objectId
    }));
  };

  APIModel.prototype.update = function(data) {
    if (data == null) {
      data = {};
    }
    return this.__mountData(this.__apiReq({
      method: 'PUT',
      url: this.modelName + "/" + this.objectId,
      data: data
    }));
  };

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
      dataType: "JSON",
      params: set.params,
      data: set.data,
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
      return that[k] = v;
    });
  };

  return APIModel;

})();

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.Share = (function(superClass) {
  extend(Share, superClass);

  function Share() {
    return Share.__super__.constructor.apply(this, arguments);
  }

  Share.prototype.constractor = function(objectId) {
    this.objectId = objectId != null ? objectId : "";
    this.modelName = "Share";
    if (this.objectId.length > 1) {
      this.__getInfo();
    }
  };

  Share.prototype.share = function() {};

  return Share;

})(APIModel);
