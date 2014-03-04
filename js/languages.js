// requirejs setup to use for the front-end in the homepage
requirejs.config({
  baseDir:'/js',
  paths: {
    'jquery': '/bower/jquery/jquery',
    'list': '/bower/listjs/dist/list.min',
    'fuzzySearch': '/bower/list.fuzzysearch.js/dist/list.fuzzysearch.min'
  }
});

define(['jquery', 'list', 'fuzzySearch'], function($, List, Fuzzy) {
  var $currentLang = $('#current-language');
  var $languageList = $('#list-of-languages');
  var $languageSearch = $('#language-search');
  var $emptyMessage = $('#empty-message');
  var $clickLang = $('.langList');
  var fuzzy = new Fuzzy({
    threshold: 1
  });
  var langs = new List('list-of-languages', {
    valueNames: ['localized-name', 'english-name'],
    plugins: [fuzzy]
  });

  $clickLang.click(function(){
    langRedirector($(this).data().value);
  });

  function langRedirector (selectedLang) {
    var matchesLang,
        href = document.location.pathname,
        lang = document.querySelector("html").lang,
        supportedLanguages = $(".links").data("supported"),
        // matches any of these:
        // `en`, `en-us`, `en-US` or `ady`
        matches = href.match(/([a-z]{2,3})([-]([a-zA-Z]{2}))?/);

    if (matches) {
      if(matches[1] && matches[2]) {
        matchesLang = matches[1].toLowerCase() + matches[2].toUpperCase();
      } else {
        matchesLang = matches[1].toLowerCase();
      }
    }
    // if the selected language is match to the language in the header
    if (selectedLang === lang) {
      return;
    // check if we have any matches and they are exist in the array we have
    } else if ((matches && matches[0]) && supportedLanguages.indexOf(matchesLang) !== -1) {
      href = href.replace(matches[0], selectedLang);
      window.location = href;
    } else {
      window.location = "/" + selectedLang + href;
    }
  };

  $currentLang.on('click', function(e) {
    if ($(window).width() < 500) {
      return;
    }
    e.preventDefault();
    var offset = $currentLang.position();

    if ($languageList.is(':visible')) {
      $languageList.fadeOut(100);
      return;
    }

    $languageList.css({
      bottom: ( offset.top - 18 )+ 'px',
      left: ( offset.left + $currentLang.width() + 25 ) + 'px',
    }).fadeIn(100);

    $languageSearch.val('');
    langs.search();

    $(document).on('mousedown', function hideLanguageList() {
      $languageList.fadeOut(100);
      $(document).off('mousedown', hideLanguageList);
    });

  });

  $languageList.on('mousedown', function(e) {
    e.stopPropagation();
  });

  if ($languageList.length) {
    $languageSearch.on('keyup', function(e) {
      var $firstResult;
      if (e.which === 13) {
        $firstResult = $languageList.find('li > a:first-child');
        if ($firstResult.length) {
          $(this).val($firstResult.find('.localized-name').data('hint'));
          window.location = $firstResult[0].href;
          return;
        } else {
          return;
        }
      }
      langs.fuzzySearch.search(this.value);
      if (!langs.visibleItems.length) {
        $emptyMessage.show();
      } else {
        $emptyMessage.hide();
      }
    });
  }
});
