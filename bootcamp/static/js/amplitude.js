/* Amplitude Web Analytics */
(function(e, t) {
  var n = e.amplitude || {
      _q: [],
      _iq: {}
  };
  var r = t.createElement("script");
  r.type = "text/javascript";
  r.async = true;
  r.src = "https://cdn.amplitude.com/libs/amplitude-4.5.2-min.gz.js";
  r.onload = function() {
      if (e.amplitude.runQueuedFunctions) {
          e.amplitude.runQueuedFunctions()
      } else {
          console.log("[Amplitude] Error: could not load SDK")
      }
  };
  var i = t.getElementsByTagName("script")[0];
  i.parentNode.insertBefore(r, i);

  function s(e, t) {
      e.prototype[t] = function() {
          this._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
          return this
      }
  }
  var o = function() {
      this._q = [];
      return this
  };
  var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
  for (var u = 0; u < a.length; u++) {
      s(o, a[u])
  }
  n.Identify = o;
  var c = function() {
      this._q = [];
      return this
  };
  var l = ["setProductId", "setQuantity", "setPrice", "setRevenueType", "setEventProperties"];
  for (var p = 0; p < l.length; p++) {
      s(c, l[p])
  }
  n.Revenue = c;
  var d = ["init", "logEvent", "logRevenue", "setUserId", "setUserProperties", "setOptOut",
      "setVersionName", "setDomain", "setDeviceId", "setGlobalUserProperties", "identify",
      "clearUserProperties", "setGroup", "logRevenueV2", "regenerateDeviceId", "logEventWithTimestamp",
      "logEventWithGroups", "setSessionId", "resetSessionId"
  ];

  function v(e) {
      function t(t) {
          e[t] = function() {
              e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)))
          }
      }
      for (var n = 0; n < d.length; n++) {
          t(d[n])
      }
  }
  v(n);
  n.getInstance = function(e) {
      e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase();
      if (!n._iq.hasOwnProperty(e)) {
          n._iq[e] = {
              _q: []
          };
          v(n._iq[e])
      }
      return n._iq[e]
  };
  e.amplitude = n
})(window, document);

function logEvent(event_type, event_properties){
    if(amplitude){
        amplitude.getInstance().logEvent(event_type, event_properties);

        if(event_type=="USER_LOGOFF"){
            amplitude.getInstance().setUserId(null); // not string 'null'
            amplitude.getInstance().regenerateDeviceId();
        }else if(event_type=="USER_SIGNUP_CONFIRMED"){
            var signup_date = new Date().toLocaleDateString('fr-CA');//yyyy-mm-dd
            var identify = new amplitude.Identify().setOnce('sign_up_date', signup_date);
            amplitude.getInstance().identify(identify);
        }
    }
}

function logUserUpdate(data){
    if(amplitude){
        var identify = new amplitude.Identify();
        data.forEach(function(d) {
            identify.set(d.name, d.value);
        });
        amplitude.getInstance().identify(identify);
    }
}

function initData(){
  var amplitudeKey = "000ccab0a1582df04195a07a9126c4e4";
  if(currentUser && currentUser.length>0){
    amplitude.getInstance().init(amplitudeKey, currentUser);
  }else{
    amplitude.getInstance().init(amplitudeKey);
  }

  var pagePath = window.location.pathname.split("/").filter(value => value != "");
  var urls = {};
  if(pagePath.length > 0){
      pagePath.forEach((value, index) => {
          urls["url" + index] = value;
      });
  }else{
      urls.url0 = "home";
  }
  logEvent("PAGE_VIEW", urls);
}

if(localStorage.allowedLGPD){
  initData();
}else{
  document.addEventListener("DOMContentLoaded", function(event) {
    var lgpdContainer = document.createElement("div");
    lgpdContainer.id = "lgpdContainer"
    document.body.appendChild(lgpdContainer);
    lgpdContainer.innerHTML = `<div class="modal" id="lgpdModal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Respeitamos a sua privacidade</h5>
      </div>
      <div class="modal-body">
        <p>Ao navegar neste site, você aceita os cookies que usamos para melhorar sua experiência.<br/>
        Conheça nossa <a href="/politics">Política de Privacidade</a> e <a href="/terms">Termos e condições gerais de uso</a>.</p>
      </div>
      <div class="modal-footer">
        <button type="button" id="allowLGPD" class="btn btn-primary">Ok</button>
      </div>
    </div>
  </div>
</div>`
    $('#lgpdModal').modal({show:true, backdrop:false})
    $("#allowLGPD").click(function() {
      $('#lgpdModal').modal('hide');
      localStorage.setItem("allowedLGPD", true);
      initData();
    });
  });  
}