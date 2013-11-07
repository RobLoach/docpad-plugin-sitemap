// Generated by CoffeeScript 1.6.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module.exports = function(BasePlugin) {
    var SitemapPlugin, extendr, safefs, sm, _ref;
    extendr = require('extendr');
    safefs = require('safefs');
    sm = require('sitemap');
    return SitemapPlugin = (function(_super) {
      __extends(SitemapPlugin, _super);

      function SitemapPlugin() {
        _ref = SitemapPlugin.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      SitemapPlugin.prototype.name = 'sitemap';

      SitemapPlugin.prototype.defaultConfig = {
        cachetime: 10 * 60 * 1000,
        changefreq: 'weekly',
        priority: 0.5,
        hostname: 'http://www.change-me.com',
        file: '/sitemap.xml'
      };

      SitemapPlugin.prototype.sitemap = {
        hostname: null,
        cachetime: null,
        urls: []
      };

      SitemapPlugin.prototype.writeAfter = function(opts, next) {
        var config, defaultConfig, docpad, siteUrl, sitemap, sitemapData, sitemapPath, templateData;
        docpad = this.docpad;
        defaultConfig = this.defaultConfig;
        config = this.config;
        sitemap = this.sitemap;
        templateData = docpad.getTemplateData();
        sitemapData = extendr.extend(sitemap, defaultConfig);
        sitemapData = extendr.extend(sitemapData, config);
        siteUrl = templateData.site.url;
        sitemapData.hostname = siteUrl != null ? siteUrl : sitemapData.hostname;
        sitemapPath = docpad.getConfig().outPath + sitemapData.file;
        docpad.log('debug', 'Creating sitemap in ' + sitemapPath);
        docpad.getCollection('html').sortCollection({
          date: 9
        }).forEach(function(document) {
          var data, _ref1, _ref2;
          if ((document.get('sitemap') === null || document.get('sitemap') !== false) && (document.get('write') === null || document.get('write') !== false) && document.get('ignored') !== true) {
            data = {
              url: document.get('url'),
              changefreq: (_ref1 = document.get('changefreq')) != null ? _ref1 : sitemapData.changefreq,
              priority: (_ref2 = document.get('priority')) != null ? _ref2 : sitemapData.priority
            };
            docpad.log("debug", data);
            return sitemapData.urls.push(data);
          }
        });
        sitemap = sm.createSitemap(sitemapData);
        return safefs.writeFile(sitemapPath, sitemap.toString(), function(err) {
          if (err) {
            return typeof next === "function" ? next(err) : void 0;
          }
          docpad.log('debug', "Wrote the sitemap.xml file to: " + sitemapPath);
          return typeof next === "function" ? next() : void 0;
        });
      };

      return SitemapPlugin;

    })(BasePlugin);
  };

}).call(this);