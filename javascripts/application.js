(function() {
  var Dropdowns, Menu, MinifyText, Playlists, Tabs;

  Dropdowns = {
    init: function() {
      return this.watchTogglers(this);
    },
    watchTogglers: function(self) {
      $('html').click(function() {
        return $('.dropdown ul').slideUp('fast');
      });
      $('.dropdown a.toggler').click(function() {
        var target, ul, _i, _len, _ref;
        target = $(this).next('ul');
        $('.dropdown ul').slideUp('fast');
        $(this).toggleClass('open');
        _ref = $('.dropdown ul');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ul = _ref[_i];
          if (ul === !target) {
            ul.slideUp('fast');
          }
        }
        if (target.is(":visible")) {
          target.slideUp('fast');
        } else {
          target.slideDown('fast');
        }
        return false;
      });
      return false;
    },
    closeAll: function() {
      return $('.dropdown ul').slideUp('fast');
    }
  };

  Tabs = {
    init: function() {
      this.formatTabs();
      return this.watchTabMenu();
    },
    formatTabs: function() {
      $.each($('.tabs'), function(i, tabs) {
        var allTabs, links, ul;
        allTabs = $(tabs).find('.tab');
        allTabs.hide();
        allTabs.first().show();
        ul = $($(tabs).data('for'));
        links = ul.find('a');
        return links.first().addClass('active');
      });
      return false;
    },
    watchTabMenu: function() {
      $('ul.tabs-menu a').on('click', function(e) {
        var activeTab, self, tabs;
        self = $(this);
        activeTab = $(self.attr('href'));
        tabs = $(self.closest('ul').data('tabs'));
        self.closest('ul').find('li a').removeClass('active');
        self.addClass('active');
        tabs.find('.tab').hide();
        activeTab.show();
        return false;
      });
      return false;
    }
  };

  Menu = {
    init: function() {
      var hash, link;
      hash = window.location.hash;
      if (hash) {
        link = '#nav a[href="' + hash + '"]';
        $(link).addClass('active');
      } else {
        $('#nav a[href="#releases"]').addClass('active');
      }
      $('#nav a').click(function(event) {
        $('#nav a').removeClass('active');
        $(this).addClass('active');
        return true;
      });
      return $('#nav').localScroll();
    }
  };

  MinifyText = {
    init: function() {
      this.restructureHtml();
      this.watchToggler();
      return false;
    },
    restructureHtml: function() {
      $.each($('.minify'), function(i, e) {
        var fulltext, html, minitext, p;
        html = [];
        p = $(e);
        fulltext = p.html().split('<br><br>');
        minitext = fulltext.shift();
        p.html('');
        html.push("<div class=\"minitext\">" + minitext + "..</div>");
        html.push("<div class=\"fulltext\">" + (fulltext.join('<br><br>')) + "</div>");
        html.push("<a class=\"toggle-excerpt closed\" href=\"#\">READ MORE</a>");
        return p.append(html.join(''));
      });
      return false;
    },
    watchToggler: function() {
      $('.fulltext').hide();
      return $('.toggle-excerpt').on('click', function(event) {
        if ($(this).hasClass('closed')) {
          $(this).text('CLOSE TEXT');
          $(this).prev('.fulltext').slideDown();
        } else {
          $(this).text('READ MORE');
          $(this).prev('.fulltext').slideUp();
        }
        $(this).toggleClass('closed');
        return false;
      });
    }
  };

  Playlists = {
    init: function() {
      this.watchPlayLinks(this);
      return false;
    },
    watchPlayLinks: function(self) {
      var links;
      links = $('ul.playlist').find('li a');
      links.click(function() {
        var link;
        Dropdowns.closeAll();
        link = $(this);
        if (link.hasClass('pressed')) {
          link.removeClass('pressed');
        } else {
          links.removeClass('pressed');
          link.addClass('pressed');
        }
        self.playTrackFor(link);
        return false;
      });
      return false;
    },
    playTrackFor: function(link) {
      var p, player, players, _i, _len;
      players = link.closest('tr').find('td.side span.player');
      for (_i = 0, _len = players.length; _i < _len; _i++) {
        p = players[_i];
        $(p).hide();
      }
      player = $(link.data('play'));
      player.show();
      return player.find('.sm2-360btn')[0].click();
    }
  };

  $(document).ready(function() {
    Dropdowns.init();
    Menu.init();
    MinifyText.init();
    Tabs.init();
    Playlists.init();
    soundManager.url = "/swf/";
    soundManager.useFastPolling = true;
    threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i) ? false : true);
    threeSixtyPlayer.config.showHMSTime = true;
    threeSixtyPlayer.config.useWaveformData = true;
    threeSixtyPlayer.config.useEQData = true;
    if (threeSixtyPlayer.config.useWaveformData) {
      soundManager.flash9Options.useWaveformData = true;
    }
    if (threeSixtyPlayer.config.useEQData) {
      soundManager.flash9Options.useEQData = true;
    }
    if (threeSixtyPlayer.config.usePeakData) {
      soundManager.flash9Options.usePeakData = true;
    }
    if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {
      soundManager.preferFlash = true;
    }
    if (window.location.href.match(/hifi/i)) {
      threeSixtyPlayer.config.useFavIcon = true;
    }
    if (window.location.href.match(/html5/i)) {
      soundManager.useHTML5Audio = true;
    }
    return threeSixtyPlayer.config.circleDiameter = null;
  });

}).call(this);
