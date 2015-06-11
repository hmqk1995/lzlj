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

  return APIModel;

})();

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

this.Share = (function(superClass) {
  extend(Share, superClass);

  function Share() {
    return Share.__super__.constructor.apply(this, arguments);
  }

  Share.prototype.constractor = function(ownerId) {
    if (ownerId == null) {
      ownerId = null;
    }
    if (ownerId !== null) {
      this.__getDataByOwnerId(ownerId);
    }
  };

  Share.prototype.share = function() {};

  Share.prototype.create = function(ownerId) {
    return this.__analyseData(this.__apiReq({
      method: "POST",
      url: "Share",
      data: {
        ownerId: ownerId
      }
    }));
  };

  Share.prototype.helpd = function() {
    var data, result;
    data = {
      helper: {
        "__op": "AddUnique",
        "objects": [helperId]
      }
    };
    console.log(data);
    result = this.__apiReq({
      method: "PUT",
      url: "Share/" + this.objectId,
      data: data
    });
    console.log(result);
    this.__updateData();
  };

  Share.prototype.__getDataByOwnerId = function(ownerId) {
    var data;
    data = this.__apiReq({
      url: "Share",
      params: {
        where: "{'ownerId':'" + ownerId + "'}"
      }
    });
    this.__analyseData(data.results[0]);
  };

  Share.prototype.__updateData = function() {
    this.__analyseData(this.__apiReq({
      url: "Share/" + this.objectId
    }));
  };

  Share.prototype.__analyseData = function(json) {
    this.objectId = json.objectId;
    this.helpers = json.helper;
    this.ownerId = json.ownerId;
    this.status = this.__isDone();
    console.log("objectId: " + this.objectId + ", ownerId: " + this.ownerId + ", helpers: " + this.helpers);
  };

  Share.prototype.__isDone = function() {
    if (_.uniq(this.helpers).length > 2) {
      return true;
    } else {
      return false;
    }
  };

  return Share;

})(APIModel);
