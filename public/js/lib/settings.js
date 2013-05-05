// Generated by CoffeeScript 1.6.2
(function() {
  var Account, Settings, SettingsView, _ref, _ref1, _ref2, _ref3, _ref4,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.BelayCapital = (_ref = window.BelayCapital) != null ? _ref : {};

  window.BelayCapital.views = (_ref1 = window.BelayCapital.views) != null ? _ref1 : {};

  Account = (function(_super) {
    __extends(Account, _super);

    function Account() {
      _ref2 = Account.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    Account.prototype.defaults = {
      name: ''
    };

    Account.prototype.urlRoot = '/api/account';

    return Account;

  })(Backbone.Model);

  Settings = (function(_super) {
    __extends(Settings, _super);

    function Settings() {
      _ref3 = Settings.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Settings.prototype.model = Account;

    return Settings;

  })(Backbone.Collection);

  SettingsView = (function(_super) {
    __extends(SettingsView, _super);

    function SettingsView() {
      _ref4 = SettingsView.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    SettingsView.prototype.el = '#settings';

    SettingsView.prototype.template = Handlebars.templates['settings'];

    SettingsView.prototype.initialize = function(router) {
      _.bindAll(this);
      this.collection = new Settings;
      this.collection.bind('add', this.appendBoard);
      return this.$el = $(this.el);
    };

    SettingsView.prototype.render = function() {
      this.$el.html(this.template({}));
      $('.main-navigation').find('.icon-gs-settings').parent().addClass('selected');
      return $(this.el).addClass('show');
    };

    SettingsView.prototype.unrender = function() {
      this.$el.html('');
      $('.main-navigation').find('.icon-gs-settings').parent().removeClass('selected');
      return $(this.el).removeClass('show');
    };

    return SettingsView;

  })(Backbone.View);

  window.BelayCapital.views.Settings = SettingsView;

}).call(this);