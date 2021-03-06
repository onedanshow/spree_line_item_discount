$.fn.variantPicker = function () {
  'use strict';

  this.select2({
    minimumInputLength: 1,
    multiple: true,
    initSelection: function (element, callback) {
      $.get(Spree.routes.variants_api, {
        q: { id_in: element.val().split(',') },
      }, function (data) {
        callback(data.variants);
      });
    },
    ajax: {
      url: Spree.url(Spree.routes.variants_api),
      datatype: 'json',
      data: function (term, page) {
        return {
          q: {
            product_name_or_sku_cont: term,
          },
        };
      },
      results: function (data, page) {
        var variants = data.variants ? data.variants : [];
        return {
          results: variants
        };
      }
    },
    formatResult: function (variant) {
      return variant.name + ' ' + variant.sku + ( variant.is_master ? ' (Master)' : '');
    },
    formatSelection: function (variant) {
      return variant.name + ' ' + variant.sku + ( variant.is_master ? ' (Master)' : '');
    }
  });
};

$(document).ready(function () {
  $('.variant_picker').variantPicker();
});
