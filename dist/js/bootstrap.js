$(function () {
  'use strict'

  QUnit.module('alert plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).alert, 'alert method is defined')
  })

  QUnit.module('alert', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapAlert = $.fn.alert.noConflict()
    },
    afterEach: function () {
      $.fn.alert = $.fn.bootstrapAlert
      delete $.fn.bootstrapAlert
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.alert, undefined, 'alert was set back to undefined (org value)')
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $alert = $el.bootstrapAlert()
    assert.ok($alert instanceof $, 'returns jquery collection')
    assert.strictEqual($alert[0], $el[0], 'collection contains element')
  })

  QUnit.test('should fade element out on clicking .close', function (assert) {
    assert.expect(1)
    var alertHTML = '<div class="alert alert-danger fade show">'
        + '<a class="close" href="#" data-dismiss="alert">×</a>'
        + '<p><strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.</p>'
        + '</div>'

    var $alert = $(alertHTML).bootstrapAlert().appendTo($('#qunit-fixture'))

    $alert.find('.close').trigger('click')

    assert.strictEqual($alert.hasClass('show'), false, 'remove .show class on .close click')
  })

  QUnit.test('should remove element when clicking .close', function (assert) {
    assert.expect(2)
    var alertHTML = '<div class="alert alert-danger fade show">'
        + '<a class="close" href="#" data-dismiss="alert">×</a>'
        + '<p><strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.</p>'
        + '</div>'
    var $alert = $(alertHTML).appendTo('#qunit-fixture').bootstrapAlert()

    assert.notEqual($('#qunit-fixture').find('.alert').length, 0, 'element added to dom')

    $alert.find('.close').trigger('click')

    assert.strictEqual($('#qunit-fixture').find('.alert').length, 0, 'element removed from dom')
  })

  QUnit.test('should not fire closed when close is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('<div class="alert"/>')
      .on('close.bs.alert', function (e) {
        e.preventDefault()
        assert.ok(true, 'close event fired')
        done()
      })
      .on('closed.bs.alert', function () {
        assert.ok(false, 'closed event fired')
      })
      .bootstrapAlert('close')
  })

})
;$(function () {
  'use strict'

  QUnit.module('button plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).button, 'button method is defined')
  })

  QUnit.module('button', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapButton = $.fn.button.noConflict()
    },
    afterEach: function () {
      $.fn.button = $.fn.bootstrapButton
      delete $.fn.bootstrapButton
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.button, undefined, 'button was set back to undefined (org value)')
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $button = $el.bootstrapButton()
    assert.ok($button instanceof $, 'returns jquery collection')
    assert.strictEqual($button[0], $el[0], 'collection contains element')
  })

  QUnit.test('should toggle active', function (assert) {
    assert.expect(2)
    var $btn = $('<button class="btn" data-toggle="button">mdo</button>')
    assert.ok(!$btn.hasClass('active'), 'btn does not have active class')
    $btn.bootstrapButton('toggle')
    assert.ok($btn.hasClass('active'), 'btn has class active')
  })

  QUnit.test('should toggle active when btn children are clicked', function (assert) {
    assert.expect(2)
    var $btn = $('<button class="btn" data-toggle="button">mdo</button>')
    var $inner = $('<i/>')
    $btn
      .append($inner)
      .appendTo('#qunit-fixture')
    assert.ok(!$btn.hasClass('active'), 'btn does not have active class')
    $inner.trigger('click')
    assert.ok($btn.hasClass('active'), 'btn has class active')
  })

  QUnit.test('should toggle aria-pressed', function (assert) {
    assert.expect(2)
    var $btn = $('<button class="btn" data-toggle="button" aria-pressed="false">redux</button>')
    assert.strictEqual($btn.attr('aria-pressed'), 'false', 'btn aria-pressed state is false')
    $btn.bootstrapButton('toggle')
    assert.strictEqual($btn.attr('aria-pressed'), 'true', 'btn aria-pressed state is true')
  })

  QUnit.test('should toggle aria-pressed on buttons with container', function (assert) {
    assert.expect(1)
    var groupHTML = '<div class="btn-group" data-toggle="buttons">' +
        '<button id="btn1" class="btn btn-secondary" type="button">One</button>' +
        '<button class="btn btn-secondary" type="button">Two</button>' +
      '</div>'
    $('#qunit-fixture').append(groupHTML)
    $('#btn1').bootstrapButton('toggle')
    assert.strictEqual($('#btn1').attr('aria-pressed'), 'true')
  })

  QUnit.test('should toggle aria-pressed when btn children are clicked', function (assert) {
    assert.expect(2)
    var $btn = $('<button class="btn" data-toggle="button" aria-pressed="false">redux</button>')
    var $inner = $('<i/>')
    $btn
      .append($inner)
      .appendTo('#qunit-fixture')
    assert.strictEqual($btn.attr('aria-pressed'), 'false', 'btn aria-pressed state is false')
    $inner.trigger('click')
    assert.strictEqual($btn.attr('aria-pressed'), 'true', 'btn aria-pressed state is true')
  })

  QUnit.test('should trigger input change event when toggled button has input field', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var groupHTML = '<div class="btn-group" data-toggle="buttons">'
      + '<label class="btn btn-primary">'
      + '<input type="radio" id="radio" autocomplete="off">Radio'
      + '</label>'
      + '</div>'
    var $group = $(groupHTML).appendTo('#qunit-fixture')

    $group.find('input').on('change', function (e) {
      e.preventDefault()
      assert.ok(true, 'change event fired')
      done()
    })

    $group.find('label').trigger('click')
  })

  QUnit.test('should check for closest matching toggle', function (assert) {
    assert.expect(12)
    var groupHTML = '<div class="btn-group" data-toggle="buttons">'
      + '<label class="btn btn-primary active">'
      + '<input type="radio" name="options" id="option1" checked="true"> Option 1'
      + '</label>'
      + '<label class="btn btn-primary">'
      + '<input type="radio" name="options" id="option2"> Option 2'
      + '</label>'
      + '<label class="btn btn-primary">'
      + '<input type="radio" name="options" id="option3"> Option 3'
      + '</label>'
      + '</div>'
    var $group = $(groupHTML).appendTo('#qunit-fixture')

    var $btn1 = $group.children().eq(0)
    var $btn2 = $group.children().eq(1)

    assert.ok($btn1.hasClass('active'), 'btn1 has active class')
    assert.ok($btn1.find('input').prop('checked'), 'btn1 is checked')
    assert.ok(!$btn2.hasClass('active'), 'btn2 does not have active class')
    assert.ok(!$btn2.find('input').prop('checked'), 'btn2 is not checked')
    $btn2.find('input').trigger('click')
    assert.ok(!$btn1.hasClass('active'), 'btn1 does not have active class')
    assert.ok(!$btn1.find('input').prop('checked'), 'btn1 is not checked')
    assert.ok($btn2.hasClass('active'), 'btn2 has active class')
    assert.ok($btn2.find('input').prop('checked'), 'btn2 is checked')

    $btn2.find('input').trigger('click') // clicking an already checked radio should not un-check it
    assert.ok(!$btn1.hasClass('active'), 'btn1 does not have active class')
    assert.ok(!$btn1.find('input').prop('checked'), 'btn1 is not checked')
    assert.ok($btn2.hasClass('active'), 'btn2 has active class')
    assert.ok($btn2.find('input').prop('checked'), 'btn2 is checked')
  })

  QUnit.test('should not add aria-pressed on labels for radio/checkbox inputs in a data-toggle="buttons" group', function (assert) {
    assert.expect(2)
    var groupHTML = '<div class="btn-group" data-toggle="buttons">'
      + '<label class="btn btn-primary"><input type="checkbox" autocomplete="off"> Checkbox</label>'
      + '<label class="btn btn-primary"><input type="radio" name="options" autocomplete="off"> Radio</label>'
      + '</div>'
    var $group = $(groupHTML).appendTo('#qunit-fixture')

    var $btn1 = $group.children().eq(0)
    var $btn2 = $group.children().eq(1)

    $btn1.find('input').trigger('click')
    assert.ok($btn1.is(':not([aria-pressed])'), 'label for nested checkbox input has not been given an aria-pressed attribute')

    $btn2.find('input').trigger('click')
    assert.ok($btn2.is(':not([aria-pressed])'), 'label for nested radio input has not been given an aria-pressed attribute')
  })

  QUnit.test('should handle disabled attribute on non-button elements', function (assert) {
    assert.expect(2)
    var groupHTML = '  <div class="btn-group disabled" data-toggle="buttons" aria-disabled="true" disabled>'
      + '<label class="btn btn-danger disabled" aria-disabled="true" disabled>'
      + '<input type="checkbox" aria-disabled="true" autocomplete="off" disabled class="disabled"/>'
      + '</label>'
      + '</div>'
    var $group = $(groupHTML).appendTo('#qunit-fixture')

    var $btn = $group.children().eq(0)
    var $input = $btn.children().eq(0)

    $btn.trigger('click')
    assert.ok($btn.is(':not(.active)'), 'button did not become active')
    assert.ok(!$input.is(':checked'), 'checkbox did not get checked')
  })

})
;$(function () {
  'use strict'

  QUnit.module('carousel plugin')

  QUnit.test('should be defined on jQuery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).carousel, 'carousel method is defined')
  })

  QUnit.module('carousel', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapCarousel = $.fn.carousel.noConflict()
    },
    afterEach: function () {
      $.fn.carousel = $.fn.bootstrapCarousel
      delete $.fn.bootstrapCarousel
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.carousel, undefined, 'carousel was set back to undefined (orig value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapCarousel()
    try {
      $el.bootstrapCarousel('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $carousel = $el.bootstrapCarousel()
    assert.ok($carousel instanceof $, 'returns jquery collection')
    assert.strictEqual($carousel[0], $el[0], 'collection contains element')
  })

  QUnit.test('should type check config options', function (assert) {
    assert.expect(2)

    var message
    var expectedMessage = 'CAROUSEL: Option "interval" provided type "string" but expected type "(number|boolean)".'
    var config = {
      interval: 'fat sux'
    }

    try {
      $('<div/>').bootstrapCarousel(config)
    } catch (e) {
      message = e.message
    }

    assert.ok(message === expectedMessage, 'correct error message')

    config = {
      keyboard: document.createElement('div')
    }
    expectedMessage = 'CAROUSEL: Option "keyboard" provided type "element" but expected type "boolean".'

    try {
      $('<div/>').bootstrapCarousel(config)
    } catch (e) {
      message = e.message
    }

    assert.ok(message === expectedMessage, 'correct error message')
  })


  QUnit.test('should not fire slid when slide is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()
    $('<div class="carousel"/>')
      .on('slide.bs.carousel', function (e) {
        e.preventDefault()
        assert.ok(true, 'slide event fired')
        done()
      })
      .on('slid.bs.carousel', function () {
        assert.ok(false, 'slid event fired')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should reset when slide is prevented', function (assert) {
    assert.expect(6)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)

    var done = assert.async()
    $carousel
      .one('slide.bs.carousel', function (e) {
        e.preventDefault()
        setTimeout(function () {
          assert.ok($carousel.find('.carousel-item:eq(0)').is('.active'), 'first item still active')
          assert.ok($carousel.find('.carousel-indicators li:eq(0)').is('.active'), 'first indicator still active')
          $carousel.bootstrapCarousel('next')
        }, 0)
      })
      .one('slid.bs.carousel', function () {
        setTimeout(function () {
          assert.ok(!$carousel.find('.carousel-item:eq(0)').is('.active'), 'first item still active')
          assert.ok(!$carousel.find('.carousel-indicators li:eq(0)').is('.active'), 'first indicator still active')
          assert.ok($carousel.find('.carousel-item:eq(1)').is('.active'), 'second item active')
          assert.ok($carousel.find('.carousel-indicators li:eq(1)').is('.active'), 'second indicator active')
          done()
        }, 0)
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should fire slide event with direction', function (assert) {
    assert.expect(4)
    var carouselHTML = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'
    var $carousel = $(carouselHTML)

    var done = assert.async()

    $carousel
      .one('slide.bs.carousel', function (e) {
        assert.ok(e.direction, 'direction present on next')
        assert.strictEqual(e.direction, 'left', 'direction is left on next')

        $carousel
          .one('slide.bs.carousel', function (e) {
            assert.ok(e.direction, 'direction present on prev')
            assert.strictEqual(e.direction, 'right', 'direction is right on prev')
            done()
          })
          .bootstrapCarousel('prev')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should fire slid event with direction', function (assert) {
    assert.expect(4)
    var carouselHTML = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'
    var $carousel = $(carouselHTML)

    var done = assert.async()

    $carousel
      .one('slid.bs.carousel', function (e) {
        assert.ok(e.direction, 'direction present on next')
        assert.strictEqual(e.direction, 'left', 'direction is left on next')

        $carousel
          .one('slid.bs.carousel', function (e) {
            assert.ok(e.direction, 'direction present on prev')
            assert.strictEqual(e.direction, 'right', 'direction is right on prev')
            done()
          })
          .bootstrapCarousel('prev')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should fire slide event with relatedTarget', function (assert) {
    assert.expect(2)
    var template = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'

    var done = assert.async()

    $(template)
      .on('slide.bs.carousel', function (e) {
        assert.ok(e.relatedTarget, 'relatedTarget present')
        assert.ok($(e.relatedTarget).hasClass('carousel-item'), 'relatedTarget has class "item"')
        done()
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should fire slid event with relatedTarget', function (assert) {
    assert.expect(2)
    var template = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'

    var done = assert.async()

    $(template)
      .on('slid.bs.carousel', function (e) {
        assert.ok(e.relatedTarget, 'relatedTarget present')
        assert.ok($(e.relatedTarget).hasClass('carousel-item'), 'relatedTarget has class "item"')
        done()
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should fire slid and slide events with from and to', function (assert) {
    assert.expect(4)
    var template = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'

    var done = assert.async()
    $(template)
      .on('slid.bs.carousel', function (e) {
        assert.ok(e.from !== undefined, 'from present')
        assert.ok(e.to !== undefined, 'to present')
        $(this).off()
        done()
      })
      .on('slide.bs.carousel', function (e) {
        assert.ok(e.from !== undefined, 'from present')
        assert.ok(e.to !== undefined, 'to present')
        $(this).off('slide.bs.carousel')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should set interval from data attribute', function (assert) {
    assert.expect(4)
    var templateHTML = '<div id="myCarousel" class="carousel slide">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>First Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Second Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '<div class="carousel-caption">'
        + '<h4>Third Thumbnail label</h4>'
        + '<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec '
        + 'id elit non mi porta gravida at eget metus. Nullam id dolor id nibh '
        + 'ultricies vehicula ut id elit.</p>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>'
        + '<a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>'
        + '</div>'
    var $carousel = $(templateHTML)
    $carousel.attr('data-interval', 1814)

    $carousel.appendTo('body')
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel')._config.interval, 1814)
    $carousel.remove()

    $carousel.appendTo('body').attr('data-modal', 'foobar')
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel')._config.interval, 1814, 'even if there is an data-modal attribute set')
    $carousel.remove()

    $carousel.appendTo('body')
    $('[data-slide]').first().trigger('click')
    $carousel.attr('data-interval', 1860)
    $('[data-slide]').first().trigger('click')
    assert.strictEqual($carousel.data('bs.carousel')._config.interval, 1814, 'attributes should be read only on initialization')
    $carousel.remove()

    $carousel.attr('data-interval', false)
    $carousel.appendTo('body')
    $carousel.bootstrapCarousel(1)
    assert.strictEqual($carousel.data('bs.carousel')._config.interval, false, 'data attribute has higher priority than default options')
    $carousel.remove()
  })

  QUnit.test('should skip over non-items when using item indices', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="1814">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '<script type="text/x-metamorph" id="thingy"/>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div class="carousel-item">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')

    $template.bootstrapCarousel(1)

    assert.strictEqual($template.find('.carousel-item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should skip over non-items when using next/prev methods', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="1814">'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '<script type="text/x-metamorph" id="thingy"/>'
        + '<div class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div class="carousel-item">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')

    $template.bootstrapCarousel('next')

    assert.strictEqual($template.find('.carousel-item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should go to previous item if left arrow key is pressed', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[1], $template.find('.active')[0], 'second item active')

    $template.trigger($.Event('keydown', { which: 37 }))

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')
  })

  QUnit.test('should go to next item if right arrow key is pressed', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')

    $template.trigger($.Event('keydown', { which: 39 }))

    assert.strictEqual($template.find('.carousel-item')[1], $template.find('.active')[0], 'second item active')
  })

  QUnit.test('should not prevent keydown if key is not ARROW_LEFT or ARROW_RIGHT', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()
    var done = assert.async()

    var eventArrowDown = $.Event('keydown', { which: 40 })
    var eventArrowUp   = $.Event('keydown', { which: 38 })

    $template.one('keydown', function (event) {
      assert.strictEqual(event.isDefaultPrevented(), false)
    })

    $template.trigger(eventArrowDown)

    $template.one('keydown', function (event) {
      assert.strictEqual(event.isDefaultPrevented(), false)
      done()
    })

    $template.trigger(eventArrowUp)
  })

  QUnit.test('should support disabling the keyboard navigation', function (assert) {
    assert.expect(3)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false" data-keyboard="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="carousel-item active">'
        + '<img alt="">'
        + '</div>'
        + '<div id="second" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')

    $template.trigger($.Event('keydown', { which: 39 }))

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after right arrow press')

    $template.trigger($.Event('keydown', { which: 37 }))

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after left arrow press')
  })

  QUnit.test('should ignore keyboard events within <input>s and <textarea>s', function (assert) {
    assert.expect(7)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
        + '<div id="first" class="carousel-item active">'
        + '<img alt="">'
        + '<input type="text" id="in-put">'
        + '<textarea id="text-area"></textarea>'
        + '</div>'
        + '<div id="second" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '<div id="third" class="carousel-item">'
        + '<img alt="">'
        + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)
    var $input = $template.find('#in-put')
    var $textarea = $template.find('#text-area')

    assert.strictEqual($input.length, 1, 'found <input>')
    assert.strictEqual($textarea.length, 1, 'found <textarea>')

    $template.bootstrapCarousel()

    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item active')


    $input.trigger($.Event('keydown', { which: 39 }))
    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after right arrow press in <input>')

    $input.trigger($.Event('keydown', { which: 37 }))
    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after left arrow press in <input>')


    $textarea.trigger($.Event('keydown', { which: 39 }))
    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after right arrow press in <textarea>')

    $textarea.trigger($.Event('keydown', { which: 37 }))
    assert.strictEqual($template.find('.carousel-item')[0], $template.find('.active')[0], 'first item still active after left arrow press in <textarea>')
  })

  QUnit.test('should wrap around from end to start when wrap option is true', function (assert) {
    assert.expect(3)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="true">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)
    var getActiveId = function () { return $carousel.find('.carousel-item.active').attr('id') }

    var done = assert.async()

    $carousel
      .one('slid.bs.carousel', function () {
        assert.strictEqual(getActiveId(), 'two', 'carousel slid from 1st to 2nd slide')
        $carousel
          .one('slid.bs.carousel', function () {
            assert.strictEqual(getActiveId(), 'three', 'carousel slid from 2nd to 3rd slide')
            $carousel
              .one('slid.bs.carousel', function () {
                assert.strictEqual(getActiveId(), 'one', 'carousel wrapped around and slid from 3rd to 1st slide')
                done()
              })
              .bootstrapCarousel('next')
          })
          .bootstrapCarousel('next')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should wrap around from start to end when wrap option is true', function (assert) {
    assert.expect(1)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="true">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)

    var done = assert.async()

    $carousel
      .on('slid.bs.carousel', function () {
        assert.strictEqual($carousel.find('.carousel-item.active').attr('id'), 'three', 'carousel wrapped around and slid from 1st to 3rd slide')
        done()
      })
      .bootstrapCarousel('prev')
  })

  QUnit.test('should stay at the end when the next method is called and wrap is false', function (assert) {
    assert.expect(3)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="false">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)
    var getActiveId = function () { return $carousel.find('.carousel-item.active').attr('id') }

    var done = assert.async()

    $carousel
      .one('slid.bs.carousel', function () {
        assert.strictEqual(getActiveId(), 'two', 'carousel slid from 1st to 2nd slide')
        $carousel
          .one('slid.bs.carousel', function () {
            assert.strictEqual(getActiveId(), 'three', 'carousel slid from 2nd to 3rd slide')
            $carousel
              .one('slid.bs.carousel', function () {
                assert.ok(false, 'carousel slid when it should not have slid')
              })
              .bootstrapCarousel('next')
            assert.strictEqual(getActiveId(), 'three', 'carousel did not wrap around and stayed on 3rd slide')
            done()
          })
          .bootstrapCarousel('next')
      })
      .bootstrapCarousel('next')
  })

  QUnit.test('should stay at the start when the prev method is called and wrap is false', function (assert) {
    assert.expect(1)
    var carouselHTML = '<div id="carousel-example-generic" class="carousel slide" data-wrap="false">'
        + '<ol class="carousel-indicators">'
        + '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="1"/>'
        + '<li data-target="#carousel-example-generic" data-slide-to="2"/>'
        + '</ol>'
        + '<div class="carousel-inner">'
        + '<div class="carousel-item active" id="one">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="two">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '<div class="carousel-item" id="three">'
        + '<div class="carousel-caption"/>'
        + '</div>'
        + '</div>'
        + '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"/>'
        + '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"/>'
        + '</div>'
    var $carousel = $(carouselHTML)

    $carousel
      .on('slid.bs.carousel', function () {
        assert.ok(false, 'carousel slid when it should not have slid')
      })
      .bootstrapCarousel('prev')
    assert.strictEqual($carousel.find('.carousel-item.active').attr('id'), 'one', 'carousel did not wrap around and stayed on 1st slide')
  })

  QUnit.test('should not prevent keydown for inputs and textareas', function (assert) {
    assert.expect(2)
    var templateHTML = '<div id="myCarousel" class="carousel" data-interval="false">'
        + '<div class="carousel-inner">'
          + '<div id="first" class="carousel-item">'
            + '<input type="text" id="inputText" />'
          + '</div>'
          + '<div id="second" class="carousel-item active">'
            + '<textarea id="txtArea"></textarea>'
          + '</div>'
        + '</div>'
        + '</div>'
    var $template = $(templateHTML)
    var done = assert.async()
    $template.appendTo('#qunit-fixture')
    var $inputText = $template.find('#inputText')
    var $textArea = $template.find('#txtArea')
    $template.bootstrapCarousel()

    var eventKeyDown = $.Event('keydown', { which: 65 }) // 65 for "a"
    $inputText.on('keydown', function (event) {
      assert.strictEqual(event.isDefaultPrevented(), false)
    })
    $inputText.trigger(eventKeyDown)

    $textArea.on('keydown', function (event) {
      assert.strictEqual(event.isDefaultPrevented(), false)
      done()
    })
    $textArea.trigger(eventKeyDown)
  })
})
;$(function () {
  'use strict'

  QUnit.module('collapse plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).collapse, 'collapse method is defined')
  })

  QUnit.module('collapse', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapCollapse = $.fn.collapse.noConflict()
    },
    afterEach: function () {
      $.fn.collapse = $.fn.bootstrapCollapse
      delete $.fn.bootstrapCollapse
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.collapse, undefined, 'collapse was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapCollapse()
    try {
      $el.bootstrapCollapse('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $collapse = $el.bootstrapCollapse()
    assert.ok($collapse instanceof $, 'returns jquery collection')
    assert.strictEqual($collapse[0], $el[0], 'collection contains element')
  })

  QUnit.test('should show a collapsed element', function (assert) {
    assert.expect(2)
    var $el = $('<div class="collapse"/>').bootstrapCollapse('show')

    assert.ok($el.hasClass('show'), 'has class "show"')
    assert.ok(!/height/i.test($el.attr('style')), 'has height reset')
  })


  QUnit.test('should show multiple collapsed elements', function (assert) {
    assert.expect(4)
    var done = assert.async()
    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href=".multi"/>').appendTo('#qunit-fixture')
    var $el = $('<div class="collapse multi"/>').appendTo('#qunit-fixture')
    var $el2 = $('<div class="collapse multi"/>').appendTo('#qunit-fixture')
    $el.one('shown.bs.collapse', function () {
      assert.ok($el.hasClass('show'), 'has class "show"')
      assert.ok(!/height/i.test($el.attr('style')), 'has height reset')
    })
    $el2.one('shown.bs.collapse', function () {
      assert.ok($el2.hasClass('show'), 'has class "show"')
      assert.ok(!/height/i.test($el2.attr('style')), 'has height reset')
      done()
    })
    $target.trigger('click')
  })

  QUnit.test('should collapse only the first collapse', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var html = [
      '<div class="panel-group" id="accordion1">',
      '<div class="panel">',
      '<div id="collapse1" class="collapse"/>',
      '</div>',
      '</div>',
      '<div class="panel-group" id="accordion2">',
      '<div class="panel">',
      '<div id="collapse2" class="collapse show"/>',
      '</div>',
      '</div>'
    ].join('')
    $(html).appendTo('#qunit-fixture')
    var $el1 = $('#collapse1')
    var $el2 = $('#collapse2')
    $el1.one('shown.bs.collapse', function () {
      assert.ok($el1.hasClass('show'))
      assert.ok($el2.hasClass('show'))
      done()
    }).bootstrapCollapse('show')
  })

  QUnit.test('should hide a collapsed element', function (assert) {
    assert.expect(1)
    var $el = $('<div class="collapse"/>').bootstrapCollapse('hide')

    assert.ok(!$el.hasClass('show'), 'does not have class "show"')
  })

  QUnit.test('should not fire shown when show is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="collapse"/>')
      .on('show.bs.collapse', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.collapse', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapCollapse('show')
  })

  QUnit.test('should reset style to auto after finishing opening collapse', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<div class="collapse" style="height: 0px"/>')
      .on('show.bs.collapse', function () {
        assert.strictEqual(this.style.height, '0px', 'height is 0px')
      })
      .on('shown.bs.collapse', function () {
        assert.strictEqual(this.style.height, '', 'height is auto')
        done()
      })
      .bootstrapCollapse('show')
  })

  QUnit.test('should reset style to auto after finishing closing collapse', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="collapse"/>')
      .on('shown.bs.collapse', function () {
        $(this).bootstrapCollapse('hide')
      })
      .on('hidden.bs.collapse', function () {
        assert.strictEqual(this.style.height, '', 'height is auto')
        done()
      })
      .bootstrapCollapse('show')
  })

  QUnit.test('should remove "collapsed" class from target when collapse is shown', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.ok(!$target.hasClass('collapsed'), 'target does not have collapsed class')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should add "collapsed" class to target when collapse is hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.ok($target.hasClass('collapsed'), 'target has collapsed class')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should remove "collapsed" class from all triggers targeting the collapse when the collapse is shown', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.ok(!$target.hasClass('collapsed'), 'target trigger does not have collapsed class')
        assert.ok(!$alt.hasClass('collapsed'), 'alt trigger does not have collapsed class')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should add "collapsed" class to all triggers targeting the collapse when the collapse is hidden', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.ok($target.hasClass('collapsed'), 'target has collapsed class')
        assert.ok($alt.hasClass('collapsed'), 'alt trigger has collapsed class')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should not close a collapse when initialized with "show" option if already shown', function (assert) {
    assert.expect(0)
    var done = assert.async()

    var $test = $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hide.bs.collapse', function () {
        assert.ok(false)
      })

    $test.bootstrapCollapse('show')

    setTimeout(done, 0)
  })

  QUnit.test('should open a collapse when initialized with "show" option if not already shown', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $test = $('<div id="test1" />')
      .appendTo('#qunit-fixture')
      .on('show.bs.collapse', function () {
        assert.ok(true)
      })

    $test.bootstrapCollapse('show')

    setTimeout(done, 0)
  })

  QUnit.test('should not show a collapse when initialized with "hide" option if already hidden', function (assert) {
    assert.expect(0)
    var done = assert.async()

    $('<div class="collapse"></div>')
      .appendTo('#qunit-fixture')
      .on('show.bs.collapse', function () {
        assert.ok(false, 'showing a previously-uninitialized hidden collapse when the "hide" method is called')
      })
      .bootstrapCollapse('hide')

    setTimeout(done, 0)
  })

  QUnit.test('should hide a collapse when initialized with "hide" option if not already hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="collapse show"></div>')
      .appendTo('#qunit-fixture')
      .on('hide.bs.collapse', function () {
        assert.ok(true, 'hiding a previously-uninitialized shown collapse when the "hide" method is called')
      })
      .bootstrapCollapse('hide')

    setTimeout(done, 0)
  })

  QUnit.test('should remove "collapsed" class from active accordion target', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div id="accordion">'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.card')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1" />').appendTo($groups.eq(0))

    $('<div id="body1" class="show" data-parent="#accordion"/>').appendTo($groups.eq(0))

    var $target2 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body2" />').appendTo($groups.eq(1))

    $('<div id="body2" data-parent="#accordion"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body3" />').appendTo($groups.eq(2))

    $('<div id="body3" data-parent="#accordion"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.ok($target1.hasClass('collapsed'), 'inactive target 1 does have class "collapsed"')
        assert.ok($target2.hasClass('collapsed'), 'inactive target 2 does have class "collapsed"')
        assert.ok(!$target3.hasClass('collapsed'), 'active target 3 does not have class "collapsed"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should allow dots in data-parent', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div class="accordion">'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.card')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="show" data-parent=".accordion"/>').appendTo($groups.eq(0))

    var $target2 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body2"/>').appendTo($groups.eq(1))

    $('<div id="body2" data-parent=".accordion"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" role="button" href="#body3"/>').appendTo($groups.eq(2))

    $('<div id="body3" data-parent=".accordion"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.ok($target1.hasClass('collapsed'), 'inactive target 1 does have class "collapsed"')
        assert.ok($target2.hasClass('collapsed'), 'inactive target 2 does have class "collapsed"')
        assert.ok(!$target3.hasClass('collapsed'), 'active target 3 does not have class "collapsed"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should set aria-expanded="true" on trigger/control when collapse is shown', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'true', 'aria-expanded on target is "true"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="false" on trigger/control when collapse is hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'false', 'aria-expanded on target is "false"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="true" on all triggers targeting the collapse when the collapse is shown', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1" aria-expanded="false"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'true', 'aria-expanded on trigger/control is "true"')
        assert.strictEqual($alt.attr('aria-expanded'), 'true', 'aria-expanded on alternative trigger/control is "true"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should set aria-expanded="false" on all triggers targeting the collapse when the collapse is hidden', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')
    var $alt = $('<a role="button" data-toggle="collapse" href="#test1" aria-expanded="true"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.strictEqual($target.attr('aria-expanded'), 'false', 'aria-expanded on trigger/control is "false"')
        assert.strictEqual($alt.attr('aria-expanded'), 'false', 'aria-expanded on alternative trigger/control is "false"')
        done()
      })

    $target.trigger('click')
  })

  QUnit.test('should change aria-expanded from active accordion trigger/control to "false" and set the trigger/control for the newly active one to "true"', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var accordionHTML = '<div id="accordion">'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '</div>'
    var $groups = $(accordionHTML).appendTo('#qunit-fixture').find('.card')

    var $target1 = $('<a role="button" data-toggle="collapse" aria-expanded="true" href="#body1"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="show" data-parent="#accordion"/>').appendTo($groups.eq(0))

    var $target2 = $('<a role="button" data-toggle="collapse" aria-expanded="false" href="#body2" class="collapsed" aria-expanded="false" />').appendTo($groups.eq(1))

    $('<div id="body2" data-parent="#accordion"/>').appendTo($groups.eq(1))

    var $target3 = $('<a class="collapsed" data-toggle="collapse" aria-expanded="false" role="button" href="#body3"/>').appendTo($groups.eq(2))

    $('<div id="body3" data-parent="#accordion"/>')
      .appendTo($groups.eq(2))
      .on('shown.bs.collapse', function () {
        assert.strictEqual($target1.attr('aria-expanded'), 'false', 'inactive trigger/control 1 has aria-expanded="false"')
        assert.strictEqual($target2.attr('aria-expanded'), 'false', 'inactive trigger/control 2 has aria-expanded="false"')
        assert.strictEqual($target3.attr('aria-expanded'), 'true', 'active trigger/control 3 has aria-expanded="true"')

        done()
      })

    $target3.trigger('click')
  })

  QUnit.test('should not fire show event if show is prevented because other element is still transitioning', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var accordionHTML = '<div id="accordion">'
        + '<div class="card"/>'
        + '<div class="card"/>'
        + '</div>'
    var showFired = false
    var $groups   = $(accordionHTML).appendTo('#qunit-fixture').find('.card')

    var $target1 = $('<a role="button" data-toggle="collapse" href="#body1"/>').appendTo($groups.eq(0))

    $('<div id="body1" class="collapse" data-parent="#accordion"/>')
      .appendTo($groups.eq(0))
      .on('show.bs.collapse', function () {
        showFired = true
      })

    var $target2 = $('<a role="button" data-toggle="collapse" href="#body2"/>').appendTo($groups.eq(1))
    var $body2   = $('<div id="body2" class="collapse" data-parent="#accordion"/>').appendTo($groups.eq(1))

    $target2.trigger('click')

    $body2
      .toggleClass('show collapsing')
      .data('bs.collapse')._isTransitioning = 1

    $target1.trigger('click')

    setTimeout(function () {
      assert.ok(!showFired, 'show event did not fire')
      done()
    }, 1)
  })

  QUnit.test('should add "collapsed" class to target when collapse is hidden via manual invocation', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1" class="show"/>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.collapse', function () {
        assert.ok($target.hasClass('collapsed'))
        done()
      })
      .bootstrapCollapse('hide')
  })

  QUnit.test('should remove "collapsed" class from target when collapse is shown via manual invocation', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $target = $('<a role="button" data-toggle="collapse" class="collapsed" href="#test1"/>').appendTo('#qunit-fixture')

    $('<div id="test1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.ok(!$target.hasClass('collapsed'))
        done()
      })
      .bootstrapCollapse('show')
  })

  QUnit.test('should allow accordion to use children other than card', function (assert) {
    assert.expect(4)
    var done = assert.async()
    var accordionHTML = '<div id="accordion">'
        + '<div class="item">'
        + '<a id="linkTrigger" data-parent="#accordion" data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"></a>'
        + '<div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingThree"></div>'
        + '</div>'
        + '<div class="item">'
        + '<a id="linkTriggerTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"></a>'
        + '<div id="collapseTwo" class="collapse show" role="tabpanel" aria-labelledby="headingTwo"></div>'
        + '</div>'
        + '</div>'

    $(accordionHTML).appendTo('#qunit-fixture')
    var $trigger = $('#linkTrigger')
    var $triggerTwo = $('#linkTriggerTwo')
    var $collapseOne = $('#collapseOne')
    var $collapseTwo = $('#collapseTwo')
    $collapseOne.on('shown.bs.collapse', function () {
      assert.ok($collapseOne.hasClass('show'), '#collapseOne is shown')
      assert.ok(!$collapseTwo.hasClass('show'), '#collapseTwo is not shown')
      $collapseTwo.on('shown.bs.collapse', function () {
        assert.ok(!$collapseOne.hasClass('show'), '#collapseOne is not shown')
        assert.ok($collapseTwo.hasClass('show'), '#collapseTwo is shown')
        done()
      })
      $triggerTwo.trigger($.Event('click'))
    })
    $trigger.trigger($.Event('click'))
  })

  QUnit.test('should collapse accordion children but not nested accordion children', function (assert) {
    assert.expect(9)
    var done = assert.async()
    $('<div id="accordion">'
        + '<div class="item">'
        + '<a id="linkTrigger" data-parent="#accordion" data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"></a>'
        + '<div id="collapseOne" class="collapse" role="tabpanel" aria-labelledby="headingThree">'
        + '<div id="nestedAccordion">'
        + '<div class="item">'
        + '<a id="nestedLinkTrigger" data-parent="#nestedAccordion" data-toggle="collapse" href="#nestedCollapseOne" aria-expanded="false" aria-controls="nestedCollapseOne"></a>'
        + '<div id="nestedCollapseOne" class="collapse" role="tabpanel" aria-labelledby="headingThree">'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="item">'
        + '<a id="linkTriggerTwo" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"></a>'
        + '<div id="collapseTwo" class="collapse show" role="tabpanel" aria-labelledby="headingTwo"></div>'
        + '</div>'
        + '</div>').appendTo('#qunit-fixture')
    var $trigger = $('#linkTrigger')
    var $triggerTwo = $('#linkTriggerTwo')
    var $nestedTrigger = $('#nestedLinkTrigger')
    var $collapseOne = $('#collapseOne')
    var $collapseTwo = $('#collapseTwo')
    var $nestedCollapseOne = $('#nestedCollapseOne')


    $collapseOne.one('shown.bs.collapse', function () {
      assert.ok($collapseOne.hasClass('show'), '#collapseOne is shown')
      assert.ok(!$collapseTwo.hasClass('show'), '#collapseTwo is not shown')
      assert.ok(!$('#nestedCollapseOne').hasClass('show'), '#nestedCollapseOne is not shown')
      $nestedCollapseOne.one('shown.bs.collapse', function () {
        assert.ok($collapseOne.hasClass('show'), '#collapseOne is shown')
        assert.ok(!$collapseTwo.hasClass('show'), '#collapseTwo is not shown')
        assert.ok($nestedCollapseOne.hasClass('show'), '#nestedCollapseOne is shown')
        $collapseTwo.one('shown.bs.collapse', function () {
          assert.ok(!$collapseOne.hasClass('show'), '#collapseOne is not shown')
          assert.ok($collapseTwo.hasClass('show'), '#collapseTwo is shown')
          assert.ok($nestedCollapseOne.hasClass('show'), '#nestedCollapseOne is shown')
          done()
        })
        $triggerTwo.trigger($.Event('click'))
      })
      $nestedTrigger.trigger($.Event('click'))
    })
    $trigger.trigger($.Event('click'))
  })

  QUnit.test('should not prevent event for input', function (assert) {
    assert.expect(3)
    var done = assert.async()
    var $target = $('<input type="checkbox" data-toggle="collapse" data-target="#collapsediv1" />').appendTo('#qunit-fixture')

    $('<div id="collapsediv1"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.collapse', function () {
        assert.ok($(this).hasClass('show'))
        assert.ok($target.attr('aria-expanded') === 'true')
        assert.ok($target.prop('checked'))
        done()
      })

    $target.trigger($.Event('click'))
  })

  QUnit.test('should add "collapsed" class to triggers only when all the targeted collapse are hidden', function (assert) {
    assert.expect(9)
    var done = assert.async()

    var $trigger1 = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')
    var $trigger2 = $('<a role="button" data-toggle="collapse" href="#test2"/>').appendTo('#qunit-fixture')
    var $trigger3 = $('<a role="button" data-toggle="collapse" href=".multi"/>').appendTo('#qunit-fixture')

    var $target1 = $('<div id="test1" class="multi"/>').appendTo('#qunit-fixture')
    var $target2 = $('<div id="test2" class="multi"/>').appendTo('#qunit-fixture')

    $target2.one('shown.bs.collapse', function () {
      assert.ok(!$trigger1.hasClass('collapsed'), 'trigger1 does not have collapsed class')
      assert.ok(!$trigger2.hasClass('collapsed'), 'trigger2 does not have collapsed class')
      assert.ok(!$trigger3.hasClass('collapsed'), 'trigger3 does not have collapsed class')
      $target2.one('hidden.bs.collapse', function () {
        assert.ok(!$trigger1.hasClass('collapsed'), 'trigger1 does not have collapsed class')
        assert.ok($trigger2.hasClass('collapsed'), 'trigger2 has collapsed class')
        assert.ok(!$trigger3.hasClass('collapsed'), 'trigger3 does not have collapsed class')
        $target1.one('hidden.bs.collapse', function () {
          assert.ok($trigger1.hasClass('collapsed'), 'trigger1 has collapsed class')
          assert.ok($trigger2.hasClass('collapsed'), 'trigger2 has collapsed class')
          assert.ok($trigger3.hasClass('collapsed'), 'trigger3 has collapsed class')
          done()
        })
        $trigger1.trigger('click')
      })
      $trigger2.trigger('click')
    })
    $trigger3.trigger('click')
  })

  QUnit.test('should set aria-expanded="true" to triggers targetting shown collaspe and aria-expanded="false" only when all the targeted collapses are shown', function (assert) {
    assert.expect(9)
    var done = assert.async()

    var $trigger1 = $('<a role="button" data-toggle="collapse" href="#test1"/>').appendTo('#qunit-fixture')
    var $trigger2 = $('<a role="button" data-toggle="collapse" href="#test2"/>').appendTo('#qunit-fixture')
    var $trigger3 = $('<a role="button" data-toggle="collapse" href=".multi"/>').appendTo('#qunit-fixture')

    var $target1 = $('<div id="test1" class="multi collapse"/>').appendTo('#qunit-fixture')
    var $target2 = $('<div id="test2" class="multi collapse"/>').appendTo('#qunit-fixture')

    $target2.one('shown.bs.collapse', function () {
      assert.strictEqual($trigger1.attr('aria-expanded'), 'true', 'aria-expanded on trigger1 is "true"')
      assert.strictEqual($trigger2.attr('aria-expanded'), 'true', 'aria-expanded on trigger2 is "true"')
      assert.strictEqual($trigger3.attr('aria-expanded'), 'true', 'aria-expanded on trigger3 is "true"')
      $target2.one('hidden.bs.collapse', function () {
        assert.strictEqual($trigger1.attr('aria-expanded'), 'true', 'aria-expanded on trigger1 is "true"')
        assert.strictEqual($trigger2.attr('aria-expanded'), 'false', 'aria-expanded on trigger2 is "false"')
        assert.strictEqual($trigger3.attr('aria-expanded'), 'true', 'aria-expanded on trigger3 is "true"')
        $target1.one('hidden.bs.collapse', function () {
          assert.strictEqual($trigger1.attr('aria-expanded'), 'false', 'aria-expanded on trigger1 is "fasle"')
          assert.strictEqual($trigger2.attr('aria-expanded'), 'false', 'aria-expanded on trigger2 is "false"')
          assert.strictEqual($trigger3.attr('aria-expanded'), 'false', 'aria-expanded on trigger3 is "false"')
          done()
        })
        $trigger1.trigger('click')
      })
      $trigger2.trigger('click')
    })
    $trigger3.trigger('click')
  })
})
;$(function () {
  'use strict'

  QUnit.module('dropdowns plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).dropdown, 'dropdown method is defined')
  })

  QUnit.module('dropdowns', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapDropdown = $.fn.dropdown.noConflict()
    },
    afterEach: function () {
      $.fn.dropdown = $.fn.bootstrapDropdown
      delete $.fn.bootstrapDropdown
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.dropdown, undefined, 'dropdown was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapDropdown()
    try {
      $el.bootstrapDropdown('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $dropdown = $el.bootstrapDropdown()
    assert.ok($dropdown instanceof $, 'returns jquery collection')
    assert.strictEqual($dropdown[0], $el[0], 'collection contains element')
  })

  QUnit.test('should not open dropdown if target is disabled via attribute', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<button disabled href="#" class="btn dropdown-toggle" data-toggle="dropdown">Dropdown</button>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    $(dropdownHTML).appendTo('#qunit-fixture')
    var $dropdown = $('#qunit-fixture').find('[data-toggle="dropdown"]').bootstrapDropdown()
    $dropdown.on('click', function () {
      assert.ok(!$dropdown.parent('.dropdown').hasClass('show'))
      done()
    })
    $dropdown.trigger($.Event('click'))
  })

  QUnit.test('should set aria-expanded="true" on target when dropdown menu is shown', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
          .appendTo('#qunit-fixture')
          .find('[data-toggle="dropdown"]')
          .bootstrapDropdown()
    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.strictEqual($dropdown.attr('aria-expanded'), 'true', 'aria-expanded is set to string "true" on click')
        done()
      })
    $dropdown.trigger('click')
  })

  QUnit.test('should set aria-expanded="false" on target when dropdown menu is hidden', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" aria-expanded="false" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    $dropdown
      .parent('.dropdown')
      .on('hidden.bs.dropdown', function () {
        assert.strictEqual($dropdown.attr('aria-expanded'), 'false', 'aria-expanded is set to string "false" on hide')
        done()
      })

    $dropdown.trigger('click')
    $(document.body).trigger('click')
  })

  QUnit.test('should not open dropdown if target is disabled via class', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<button href="#" class="btn dropdown-toggle disabled" data-toggle="dropdown">Dropdown</button>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'

    $(dropdownHTML).appendTo('#qunit-fixture')
    var $dropdown = $('#qunit-fixture').find('[data-toggle="dropdown"]').bootstrapDropdown()
    $dropdown.on('click', function () {
      assert.ok(!$dropdown.parent('.dropdown').hasClass('show'))
      done()
    })
    $dropdown.trigger($.Event('click'))
  })

  QUnit.test('should add class show to menu if clicked', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown()
    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdown.parent('.dropdown').hasClass('show'), '"show" class added on click')
        done()
      })
    $dropdown.trigger('click')
  })

  QUnit.test('should test if element has a # before assuming it\'s a selector', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="/foo/" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML).find('[data-toggle="dropdown"]').bootstrapDropdown()
    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdown.parent('.dropdown').hasClass('show'), '"show" class added on click')
        done()
      })
    $dropdown.trigger('click')
  })


  QUnit.test('should remove "show" class if body is clicked', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdown.parent('.dropdown').hasClass('show'), '"show" class added on click')
        $(document.body).trigger('click')
      }).on('hidden.bs.dropdown', function () {
        assert.ok(!$dropdown.parent('.dropdown').hasClass('show'), '"show" class removed')
        done()
      })
    $dropdown.trigger('click')
  })

  QUnit.test('should remove "show" class if tabbing outside of menu', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="dropdown-divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
       .appendTo('#qunit-fixture')
       .find('[data-toggle="dropdown"]')
       .bootstrapDropdown()
    $dropdown
     .parent('.dropdown')
     .on('shown.bs.dropdown', function () {
       assert.ok($dropdown.parent('.dropdown').hasClass('show'), '"show" class added on click')
       var e = $.Event('keyup')
       e.which = 9 // Tab
       $(document.body).trigger(e)
     }).on('hidden.bs.dropdown', function () {
       assert.ok(!$dropdown.parent('.dropdown').hasClass('show'), '"show" class removed')
       done()
     })
    $dropdown.trigger('click')
  })

  QUnit.test('should remove "show" class if body is clicked, with multiple dropdowns', function (assert) {
    assert.expect(7)
    var done = assert.async()
    var dropdownHTML = '<div class="nav">'
        + '<div class="dropdown" id="testmenu">'
        + '<a class="dropdown-toggle" data-toggle="dropdown" href="#testmenu">Test menu <span class="caret"/></a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#sub1">Submenu 1</a>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="btn-group">'
        + '<button class="btn">Actions</button>'
        + '<button class="btn dropdown-toggle" data-toggle="dropdown"></button>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Action 1</a>'
        + '</div>'
        + '</div>'
    var $dropdowns = $(dropdownHTML).appendTo('#qunit-fixture').find('[data-toggle="dropdown"]')
    var $first = $dropdowns.first()
    var $last = $dropdowns.last()

    assert.strictEqual($dropdowns.length, 2, 'two dropdowns')

    $first.parent('.dropdown')
    .on('shown.bs.dropdown', function () {
      assert.strictEqual($first.parents('.show').length, 1, '"show" class added on click')
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 1, 'only one dropdown is shown')
      $(document.body).trigger('click')
    }).on('hidden.bs.dropdown', function () {
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 0, '"show" class removed')
      $last.trigger('click')
    })

    $last.parent('.btn-group')
    .on('shown.bs.dropdown', function () {
      assert.strictEqual($last.parent('.show').length, 1, '"show" class added on click')
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 1, 'only one dropdown is shown')
      $(document.body).trigger('click')
    }).on('hidden.bs.dropdown', function () {
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 0, '"show" class removed')
      done()
    })
    $first.trigger('click')
  })

  QUnit.test('should remove "show" class if body if tabbing outside of menu, with multiple dropdowns', function (assert) {
    assert.expect(7)
    var done = assert.async()
    var dropdownHTML = '<div class="nav">'
        + '<div class="dropdown" id="testmenu">'
        + '<a class="dropdown-toggle" data-toggle="dropdown" href="#testmenu">Test menu <span class="caret"/></a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#sub1">Submenu 1</a>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div class="btn-group">'
        + '<button class="btn">Actions</button>'
        + '<button class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"/></button>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Action 1</a>'
        + '</div>'
        + '</div>'
    var $dropdowns = $(dropdownHTML).appendTo('#qunit-fixture').find('[data-toggle="dropdown"]')
    var $first = $dropdowns.first()
    var $last = $dropdowns.last()

    assert.strictEqual($dropdowns.length, 2, 'two dropdowns')

    $first.parent('.dropdown')
    .on('shown.bs.dropdown', function () {
      assert.strictEqual($first.parents('.show').length, 1, '"show" class added on click')
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 1, 'only one dropdown is shown')
      var e = $.Event('keyup')
      e.which = 9 // Tab
      $(document.body).trigger(e)
    }).on('hidden.bs.dropdown', function () {
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 0, '"show" class removed')
      $last.trigger('click')
    })

    $last.parent('.btn-group')
    .on('shown.bs.dropdown', function () {
      assert.strictEqual($last.parent('.show').length, 1, '"show" class added on click')
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 1, 'only one dropdown is shown')
      var e = $.Event('keyup')
      e.which = 9 // Tab
      $(document.body).trigger(e)
    }).on('hidden.bs.dropdown', function () {
      assert.strictEqual($('#qunit-fixture .dropdown-menu.show').length, 0, '"show" class removed')
      done()
    })
    $first.trigger('click')
  })

  QUnit.test('should fire show and hide event', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var done = assert.async()

    $dropdown
      .parent('.dropdown')
      .on('show.bs.dropdown', function () {
        assert.ok(true, 'show was fired')
      })
      .on('hide.bs.dropdown', function () {
        assert.ok(true, 'hide was fired')
        done()
      })

    $dropdown.trigger('click')
    $(document.body).trigger('click')
  })


  QUnit.test('should fire shown and hidden event', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var done = assert.async()

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')
      })
      .on('hidden.bs.dropdown', function () {
        assert.ok(true, 'hidden was fired')
        done()
      })

    $dropdown.trigger('click')
    $(document.body).trigger('click')
  })

  QUnit.test('should fire shown and hidden event with a relatedTarget', function (assert) {
    assert.expect(2)
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
    var done = assert.async()

    $dropdown.parent('.dropdown')
      .on('hidden.bs.dropdown', function (e) {
        assert.strictEqual(e.relatedTarget, $dropdown[0])
        done()
      })
      .on('shown.bs.dropdown', function (e) {
        assert.strictEqual(e.relatedTarget, $dropdown[0])
        $(document.body).trigger('click')
      })

    $dropdown.trigger('click')
  })

  QUnit.test('should ignore keyboard events within <input>s and <textarea>s', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item" href="#">Secondary link</a>'
        + '<a class="dropdown-item" href="#">Something else here</a>'
        + '<div class="divider"/>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '<input type="text" id="input">'
        + '<textarea id="textarea"/>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var $input = $('#input')
    var $textarea = $('#textarea')

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')

        $input.trigger('focus').trigger($.Event('keydown', { which: 38 }))
        assert.ok($(document.activeElement).is($input), 'input still focused')

        $textarea.trigger('focus').trigger($.Event('keydown', { which: 38 }))
        assert.ok($(document.activeElement).is($textarea), 'textarea still focused')

        done()
      })

    $dropdown.trigger('click')
  })

  QUnit.test('should skip disabled element when using keyboard navigation', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item disabled" href="#">Disabled link</a>'
        + '<a class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')
        $dropdown.trigger($.Event('keydown', { which: 40 }))
        $dropdown.trigger($.Event('keydown', { which: 40 }))
        assert.ok(!$(document.activeElement).is('.disabled'), '.disabled is not focused')
        done()
      })
    $dropdown.trigger('click')
  })

  QUnit.test('should focus next/previous element when using keyboard navigation', function (assert) {
    assert.expect(4)
    var done = assert.async()
    var dropdownHTML = '<div class="tabs">'
        + '<div class="dropdown">'
        + '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a id="item1" class="dropdown-item" href="#">A link</a>'
        + '<a id="item2" class="dropdown-item" href="#">Another link</a>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok(true, 'shown was fired')
        $dropdown.trigger($.Event('keydown', { which: 40 }))
        assert.ok($(document.activeElement).is($('#item1')), 'item1 is focused')

        $(document.activeElement).trigger($.Event('keydown', { which: 40 }))
        assert.ok($(document.activeElement).is($('#item2')), 'item2 is focused')

        $(document.activeElement).trigger($.Event('keydown', { which: 38 }))
        assert.ok($(document.activeElement).is($('#item1')), 'item1 is focused')
        done()
      })
    $dropdown.trigger('click')

  })

  QUnit.test('should not close the dropdown if the user clicks on a text field', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var dropdownHTML = '<div class="dropdown">'
        + '<button type="button" data-toggle="dropdown">Dropdown</button>'
        + '<div class="dropdown-menu">'
        + '<input id="textField" type="text" />'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var $textfield = $('#textField')
    $textfield.on('click', function () {
      assert.ok($dropdown.parent('.dropdown').hasClass('show'), 'dropdown menu is shown')
      done()
    })

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdown.parent('.dropdown').hasClass('show'), 'dropdown menu is shown')
        $textfield.trigger($.Event('click'))
      })
    $dropdown.trigger('click')
  })

  QUnit.test('should not close the dropdown if the user clicks on a textarea', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var dropdownHTML = '<div class="dropdown">'
        + '<button type="button" data-toggle="dropdown">Dropdown</button>'
        + '<div class="dropdown-menu">'
        + '<textarea id="textArea"></textarea>'
        + '</div>'
        + '</div>'
    var $dropdown = $(dropdownHTML)
      .appendTo('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()

    var $textarea = $('#textArea')
    $textarea.on('click', function () {
      assert.ok($dropdown.parent('.dropdown').hasClass('show'), 'dropdown menu is shown')
      done()
    })

    $dropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdown.parent('.dropdown').hasClass('show'), 'dropdown menu is shown')
        $textarea.trigger($.Event('click'))
      })
    $dropdown.trigger('click')
  })

  QUnit.test('Dropdown should not use Popper.js in navbar', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var html = '<nav class="navbar navbar-expand-md navbar-light bg-light">'
        + '<div class="dropdown">'
        + '  <a class="nav-link dropdown-toggle" href="#" id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>'
        + '  <div class="dropdown-menu" aria-labelledby="dropdown">'
        + '    <a class="dropdown-item" href="#">Action</a>'
        + '    <a class="dropdown-item" href="#">Another action</a>'
        + '    <a class="dropdown-item" href="#">Something else here</a>'
        + '  </div>'
        + '</div>'
        + '</nav>'

    $(html).appendTo('#qunit-fixture')
    var $triggerDropdown = $('#qunit-fixture')
      .find('[data-toggle="dropdown"]')
      .bootstrapDropdown()
    var $dropdownMenu = $triggerDropdown.next()

    $triggerDropdown
      .parent('.dropdown')
      .on('shown.bs.dropdown', function () {
        assert.ok($dropdownMenu.attr('style') === undefined, 'No inline style applied by Popper.js')
        done()
      })
    $triggerDropdown.trigger($.Event('click'))
  })
})
;$(function () {
  'use strict'

  QUnit.module('modal plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).modal, 'modal method is defined')
  })

  QUnit.module('modal', {
    before: function () {
      // Enable the scrollbar measurer
      $('<style type="text/css"> .modal-scrollbar-measure { position: absolute; top: -9999px; width: 50px; height: 50px; overflow: scroll; } </style>').appendTo('head')
      // Function to calculate the scrollbar width which is then compared to the padding or margin changes
      $.fn.getScrollbarWidth = function () {
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'modal-scrollbar-measure'
        document.body.appendChild(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        return scrollbarWidth
      }
    },
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapModal = $.fn.modal.noConflict()
    },
    afterEach: function () {
      $.fn.modal = $.fn.bootstrapModal
      delete $.fn.bootstrapModal
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.modal, undefined, 'modal was set back to undefined (orig value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div id="modal-test"/>')
    $el.bootstrapModal()
    try {
      $el.bootstrapModal('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div id="modal-test"/>')
    var $modal = $el.bootstrapModal()
    assert.ok($modal instanceof $, 'returns jquery collection')
    assert.strictEqual($modal[0], $el[0], 'collection contains element')
  })

  QUnit.test('should expose defaults var for settings', function (assert) {
    assert.expect(1)
    assert.ok($.fn.bootstrapModal.Constructor.Default, 'default object exposed')
  })

  QUnit.test('should insert into dom when show method is called', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div id="modal-test"/>')
      .on('shown.bs.modal', function () {
        assert.notEqual($('#modal-test').length, 0, 'modal inserted into dom')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should fire show event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div id="modal-test"/>')
      .on('show.bs.modal', function () {
        assert.ok(true, 'show event fired')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should not fire shown when show was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div id="modal-test"/>')
      .on('show.bs.modal', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.modal', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should hide modal when hide is called', function (assert) {
    assert.expect(3)
    var done = assert.async()

    $('<div id="modal-test"/>')
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        assert.notEqual($('#modal-test').length, 0, 'modal inserted into dom')
        $(this).bootstrapModal('hide')
      })
      .on('hidden.bs.modal', function () {
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should toggle when toggle is called', function (assert) {
    assert.expect(3)
    var done = assert.async()

    $('<div id="modal-test"/>')
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        assert.notEqual($('#modal-test').length, 0, 'modal inserted into dom')
        $(this).bootstrapModal('toggle')
      })
      .on('hidden.bs.modal', function () {
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        done()
      })
      .bootstrapModal('toggle')
  })

  QUnit.test('should remove from dom when click [data-dismiss="modal"]', function (assert) {
    assert.expect(3)
    var done = assert.async()

    $('<div id="modal-test"><span class="close" data-dismiss="modal"/></div>')
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        assert.notEqual($('#modal-test').length, 0, 'modal inserted into dom')
        $(this).find('.close').trigger('click')
      })
      .on('hidden.bs.modal', function () {
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        done()
      })
      .bootstrapModal('toggle')
  })

  QUnit.test('should allow modal close with "backdrop:false"', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<div id="modal-test" data-backdrop="false"/>')
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        $(this).bootstrapModal('hide')
      })
      .on('hidden.bs.modal', function () {
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should close modal when clicking outside of modal-content', function (assert) {
    assert.expect(3)
    var done = assert.async()

    $('<div id="modal-test"><div class="contents"/></div>')
      .on('shown.bs.modal', function () {
        assert.notEqual($('#modal-test').length, 0, 'modal inserted into dom')
        $('.contents').trigger('click')
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        $('#modal-test').trigger('click')
      })
      .on('hidden.bs.modal', function () {
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should not close modal when clicking outside of modal-content if data-backdrop="true"', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div id="modal-test" data-backdrop="false"><div class="contents"/></div>')
      .on('shown.bs.modal', function () {
        $('#modal-test').trigger('click')
        assert.ok($('#modal-test').is(':visible'), 'modal not hidden')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should close modal when escape key is pressed via keydown', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $div = $('<div id="modal-test"/>')
    $div
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').length, 'modal inserted into dom')
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        $div.trigger($.Event('keydown', { which: 27 }))

        setTimeout(function () {
          assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
          $div.remove()
          done()
        }, 0)
      })
      .bootstrapModal('show')
  })

  QUnit.test('should not close modal when escape key is pressed via keyup', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $div = $('<div id="modal-test"/>')
    $div
      .on('shown.bs.modal', function () {
        assert.ok($('#modal-test').length, 'modal inserted into dom')
        assert.ok($('#modal-test').is(':visible'), 'modal visible')
        $div.trigger($.Event('keyup', { which: 27 }))

        setTimeout(function () {
          assert.ok($div.is(':visible'), 'modal still visible')
          $div.remove()
          done()
        }, 0)
      })
      .bootstrapModal('show')
  })

  QUnit.test('should trigger hide event once when clicking outside of modal-content', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var triggered

    $('<div id="modal-test"><div class="contents"/></div>')
      .on('shown.bs.modal', function () {
        triggered = 0
        $('#modal-test').trigger('click')
      })
      .on('hide.bs.modal', function () {
        triggered += 1
        assert.strictEqual(triggered, 1, 'modal hide triggered once')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should remove aria-hidden attribute when shown, add it back when hidden', function (assert) {
    assert.expect(3)
    var done = assert.async()

    $('<div id="modal-test" aria-hidden="true"/>')
      .on('shown.bs.modal', function () {
        assert.notOk($('#modal-test').is('[aria-hidden]'), 'aria-hidden attribute removed')
        $(this).bootstrapModal('hide')
      })
      .on('hidden.bs.modal', function () {
        assert.ok($('#modal-test').is('[aria-hidden]'), 'aria-hidden attribute added')
        assert.strictEqual($('#modal-test').attr('aria-hidden'), 'true', 'correct aria-hidden="true" added')
        done()
      })
      .bootstrapModal('show')
  })

  QUnit.test('should close reopened modal with [data-dismiss="modal"] click', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div></div>')
      .one('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .one('hidden.bs.modal', function () {
        // after one open-close cycle
        assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
        $(this)
          .one('shown.bs.modal', function () {
            $('#close').trigger('click')
          })
          .one('hidden.bs.modal', function () {
            assert.ok(!$('#modal-test').is(':visible'), 'modal hidden')
            done()
          })
          .bootstrapModal('show')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should restore focus to toggling element when modal is hidden after having been opened via data-api', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $toggleBtn = $('<button data-toggle="modal" data-target="#modal-test"/>').appendTo('#qunit-fixture')

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div></div>')
      .on('hidden.bs.modal', function () {
        setTimeout(function () {
          assert.ok($(document.activeElement).is($toggleBtn), 'toggling element is once again focused')
          done()
        }, 0)
      })
      .on('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .appendTo('#qunit-fixture')

    $toggleBtn.trigger('click')
  })

  QUnit.test('should not restore focus to toggling element if the associated show event gets prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $toggleBtn = $('<button data-toggle="modal" data-target="#modal-test"/>').appendTo('#qunit-fixture')
    var $otherBtn = $('<button id="other-btn"/>').appendTo('#qunit-fixture')

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div>')
      .one('show.bs.modal', function (e) {
        e.preventDefault()
        $otherBtn.trigger('focus')
        setTimeout($.proxy(function () {
          $(this).bootstrapModal('show')
        }, this), 0)
      })
      .on('hidden.bs.modal', function () {
        setTimeout(function () {
          assert.ok($(document.activeElement).is($otherBtn), 'focus returned to toggling element')
          done()
        }, 0)
      })
      .on('shown.bs.modal', function () {
        $('#close').trigger('click')
      })
      .appendTo('#qunit-fixture')

    $toggleBtn.trigger('click')
  })

  QUnit.test('should adjust the inline body padding when opening and restore when closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $body = $(document.body)
    var originalPadding = $body.css('padding-right')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        var currentPadding = $body.css('padding-right')
        assert.strictEqual(currentPadding, originalPadding, 'body padding should be reset after closing')
        $body.removeAttr('style')
        done()
      })
      .on('shown.bs.modal', function () {
        var expectedPadding = parseFloat(originalPadding) + $(this).getScrollbarWidth() + 'px'
        var currentPadding = $body.css('padding-right')
        assert.strictEqual(currentPadding, expectedPadding, 'body padding should be adjusted while opening')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should store the original body padding in data-padding-right before showing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $body = $(document.body)
    var originalPadding = '0px'
    $body.css('padding-right', originalPadding)

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($body.data('padding-right'), undefined, 'data-padding-right should be cleared after closing')
        $body.removeAttr('style')
        done()
      })
      .on('shown.bs.modal', function () {
        assert.strictEqual($body.data('padding-right'), originalPadding, 'original body padding should be stored in data-padding-right')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should adjust the inline padding of fixed elements when opening and restore when closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $element = $('<div class="fixed-top"></div>').appendTo('#qunit-fixture')
    var originalPadding = $element.css('padding-right')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        var currentPadding = $element.css('padding-right')
        assert.strictEqual(currentPadding, originalPadding, 'fixed element padding should be reset after closing')
        $element.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        var expectedPadding = parseFloat(originalPadding) + $(this).getScrollbarWidth() + 'px'
        var currentPadding = $element.css('padding-right')
        assert.strictEqual(currentPadding, expectedPadding, 'fixed element padding should be adjusted while opening')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should store the original padding of fixed elements in data-padding-right before showing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $element = $('<div class="fixed-top"></div>').appendTo('#qunit-fixture')
    var originalPadding = '0px'
    $element.css('padding-right', originalPadding)

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($element.data('padding-right'), undefined, 'data-padding-right should be cleared after closing')
        $element.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        assert.strictEqual($element.data('padding-right'), originalPadding, 'original fixed element padding should be stored in data-padding-right')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should adjust the inline margin of the navbar-toggler when opening and restore when closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $element = $('<div class="navbar-toggler"></div>').appendTo('#qunit-fixture')
    var originalMargin = $element.css('margin-right')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        var currentMargin = $element.css('margin-right')
        assert.strictEqual(currentMargin, originalMargin, 'navbar-toggler margin should be reset after closing')
        $element.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        var expectedMargin = parseFloat(originalMargin) + $(this).getScrollbarWidth() + 'px'
        var currentMargin = $element.css('margin-right')
        assert.strictEqual(currentMargin, expectedMargin, 'navbar-toggler margin should be adjusted while opening')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should store the original margin of the navbar-toggler in data-margin-right before showing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $element = $('<div class="navbar-toggler"></div>').appendTo('#qunit-fixture')
    var originalMargin = '0px'
    $element.css('margin-right', originalMargin)

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($element.data('margin-right'), undefined, 'data-margin-right should be cleared after closing')
        $element.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        assert.strictEqual($element.data('margin-right'), originalMargin, 'original navbar-toggler margin should be stored in data-margin-right')
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should ignore values set via CSS when trying to restore body padding after closing', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $body = $(document.body)
    var $style = $('<style>body { padding-right: 42px; }</style>').appendTo('head')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.ok(!$body.attr('style'), 'body does not have inline padding set')
        $style.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should ignore other inline styles when trying to restore body padding after closing', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $body = $(document.body)
    var $style = $('<style>body { padding-right: 42px; }</style>').appendTo('head')

    $body.css('color', 'red')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($body[0].style.paddingRight, '', 'body does not have inline padding set')
        assert.strictEqual($body[0].style.color, 'red', 'body still has other inline styles set')
        $body.removeAttr('style')
        $style.remove()
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should properly restore non-pixel inline body padding after closing', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $body = $(document.body)

    $body.css('padding-right', '5%')

    $('<div id="modal-test"/>')
      .on('hidden.bs.modal', function () {
        assert.strictEqual($body[0].style.paddingRight, '5%', 'body does not have inline padding set')
        $body.removeAttr('style')
        done()
      })
      .on('shown.bs.modal', function () {
        $(this).bootstrapModal('hide')
      })
      .bootstrapModal('show')
  })

  QUnit.test('should not follow link in area tag', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<map><area id="test" shape="default" data-toggle="modal" data-target="#modal-test" href="demo.html"/></map>')
      .appendTo('#qunit-fixture')

    $('<div id="modal-test"><div class="contents"><div id="close" data-dismiss="modal"/></div></div>')
      .appendTo('#qunit-fixture')

    $('#test')
      .on('click.bs.modal.data-api', function (event) {
        assert.notOk(event.isDefaultPrevented(), 'navigating to href will happen')

        setTimeout(function () {
          assert.ok(event.isDefaultPrevented(), 'model shown instead of navigating to href')
          done()
        }, 1)
      })
      .trigger('click')
  })
})
;$(function () {
  'use strict'

  QUnit.module('popover plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).popover, 'popover method is defined')
  })

  QUnit.module('popover', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapPopover = $.fn.popover.noConflict()
    },
    afterEach: function () {
      $.fn.popover = $.fn.bootstrapPopover
      delete $.fn.bootstrapPopover
      $('.popover').remove()
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.popover, undefined, 'popover was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapPopover()
    try {
      $el.bootstrapPopover('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $popover = $el.bootstrapPopover()
    assert.ok($popover instanceof $, 'returns jquery collection')
    assert.strictEqual($popover[0], $el[0], 'collection contains element')
  })

  QUnit.test('should render popover element', function (assert) {
    assert.expect(2)
    var done = assert.async()
    $('<a href="#" title="mdo" data-content="https://twitter.com/mdo">@mdo</a>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.popover', function () {
        assert.notEqual($('.popover').length, 0, 'popover was inserted')
        $(this).bootstrapPopover('hide')
      })
      .on('hidden.bs.popover', function () {
        assert.strictEqual($('.popover').length, 0, 'popover removed')
        done()
      })
      .bootstrapPopover('show')
  })

  QUnit.test('should store popover instance in popover data object', function (assert) {
    assert.expect(1)
    var $popover = $('<a href="#" title="mdo" data-content="https://twitter.com/mdo">@mdo</a>').bootstrapPopover()

    assert.ok($popover.data('bs.popover'), 'popover instance exists')
  })

  QUnit.test('should store popover trigger in popover instance data object', function (assert) {
    assert.expect(1)
    var $popover = $('<a href="#" title="ResentedHook">@ResentedHook</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover()

    $popover.bootstrapPopover('show')

    assert.ok($('.popover').data('bs.popover'), 'popover trigger stored in instance data')
  })

  QUnit.test('should get title and content from options', function (assert) {
    assert.expect(4)
    var $popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: function () {
          return '@fat'
        },
        content: function () {
          return 'loves writing tests （╯°□°）╯︵ ┻━┻'
        }
      })

    $popover.bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.strictEqual($('.popover .popover-header').text(), '@fat', 'title correctly inserted')
    assert.strictEqual($('.popover .popover-body').text(), 'loves writing tests （╯°□°）╯︵ ┻━┻', 'content correctly inserted')

    $popover.bootstrapPopover('hide')

    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should allow DOMElement title and content (html: true)', function (assert) {
    assert.expect(5)
    var title = document.createTextNode('@glebm <3 writing tests')
    var content = $('<i>¯\\_(ツ)_/¯</i>').get(0)
    var $popover = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({ html: true, title: title, content: content })

    $popover.bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover inserted')
    assert.strictEqual($('.popover .popover-header').text(), '@glebm <3 writing tests', 'title inserted')
    assert.ok($.contains($('.popover').get(0), title), 'title node moved, not copied')
    // toLowerCase because IE8 will return <I>...</I>
    assert.strictEqual($('.popover .popover-body').html().toLowerCase(), '<i>¯\\_(ツ)_/¯</i>', 'content inserted')
    assert.ok($.contains($('.popover').get(0), content), 'content node moved, not copied')
  })

  QUnit.test('should allow DOMElement title and content (html: false)', function (assert) {
    assert.expect(5)
    var title = document.createTextNode('@glebm <3 writing tests')
    var content = $('<i>¯\\_(ツ)_/¯</i>').get(0)
    var $popover = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({ title: title, content: content })

    $popover.bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover inserted')
    assert.strictEqual($('.popover .popover-header').text(), '@glebm <3 writing tests', 'title inserted')
    assert.ok(!$.contains($('.popover').get(0), title), 'title node copied, not moved')
    assert.strictEqual($('.popover .popover-body').html(), '¯\\_(ツ)_/¯', 'content inserted')
    assert.ok(!$.contains($('.popover').get(0), content), 'content node copied, not moved')
  })


  QUnit.test('should not duplicate HTML object', function (assert) {
    assert.expect(6)
    var $div = $('<div/>').html('loves writing tests （╯°□°）╯︵ ┻━┻')

    var $popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        html: true,
        content: function () {
          return $div
        }
      })

    $popover.bootstrapPopover('show')
    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.equal($('.popover .popover-body').html(), $div[0].outerHTML, 'content correctly inserted')

    $popover.bootstrapPopover('hide')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')

    $popover.bootstrapPopover('show')
    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.equal($('.popover .popover-body').html(), $div[0].outerHTML, 'content correctly inserted')

    $popover.bootstrapPopover('hide')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should get title and content from attributes', function (assert) {
    assert.expect(4)
    var $popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover()
      .bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.strictEqual($('.popover .popover-header').text(), '@mdo', 'title correctly inserted')
    assert.strictEqual($('.popover .popover-body').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

    $popover.bootstrapPopover('hide')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should get title and content from attributes ignoring options passed via js', function (assert) {
    assert.expect(4)
    var $popover = $('<a href="#" title="@mdo" data-content="loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻" >@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: 'ignored title option',
        content: 'ignored content option'
      })
      .bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.strictEqual($('.popover .popover-header').text(), '@mdo', 'title correctly inserted')
    assert.strictEqual($('.popover .popover-body').text(), 'loves data attributes (づ｡◕‿‿◕｡)づ ︵ ┻━┻', 'content correctly inserted')

    $popover.bootstrapPopover('hide')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should respect custom template', function (assert) {
    assert.expect(3)
    var $popover = $('<a href="#">@fat</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: 'Test',
        content: 'Test',
        template: '<div class="popover foobar"><div class="arrow"></div><div class="inner"><h3 class="title"/><div class="content"><p/></div></div></div>'
      })

    $popover.bootstrapPopover('show')

    assert.notEqual($('.popover').length, 0, 'popover was inserted')
    assert.ok($('.popover').hasClass('foobar'), 'custom class is present')

    $popover.bootstrapPopover('hide')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should destroy popover', function (assert) {
    assert.expect(7)
    var $popover = $('<div/>')
      .bootstrapPopover({
        trigger: 'hover'
      })
      .on('click.foo', $.noop)

    assert.ok($popover.data('bs.popover'), 'popover has data')
    assert.ok($._data($popover[0], 'events').mouseover && $._data($popover[0], 'events').mouseout, 'popover has hover event')
    assert.strictEqual($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover has extra click.foo event')

    $popover.bootstrapPopover('show')
    $popover.bootstrapPopover('dispose')

    assert.ok(!$popover.hasClass('show'), 'popover is hidden')
    assert.ok(!$popover.data('popover'), 'popover does not have data')
    assert.strictEqual($._data($popover[0], 'events').click[0].namespace, 'foo', 'popover still has click.foo')
    assert.ok(!$._data($popover[0], 'events').mouseover && !$._data($popover[0], 'events').mouseout, 'popover does not have any events')
  })

  QUnit.test('should render popover element using delegated selector', function (assert) {
    assert.expect(2)
    var $div = $('<div><a href="#" title="mdo" data-content="http://twitter.com/mdo">@mdo</a></div>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        selector: 'a',
        trigger: 'click'
      })

    $div.find('a').trigger('click')
    assert.notEqual($('.popover').length, 0, 'popover was inserted')

    $div.find('a').trigger('click')
    assert.strictEqual($('.popover').length, 0, 'popover was removed')
  })

  QUnit.test('should detach popover content rather than removing it so that event handlers are left intact', function (assert) {
    assert.expect(1)
    var $content = $('<div class="content-with-handler"><a class="btn btn-warning">Button with event handler</a></div>').appendTo('#qunit-fixture')

    var handlerCalled = false
    $('.content-with-handler .btn').on('click', function () {
      handlerCalled = true
    })

    var $div = $('<div><a href="#">Show popover</a></div>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        html: true,
        trigger: 'manual',
        container: 'body',
        content: function () {
          return $content
        }
      })

    var done = assert.async()
    $div
      .one('shown.bs.popover', function () {
        $div
          .one('hidden.bs.popover', function () {
            $div
              .one('shown.bs.popover', function () {
                $('.content-with-handler .btn').trigger('click')
                $div.bootstrapPopover('dispose')
                assert.ok(handlerCalled, 'content\'s event handler still present')
                done()
              })
              .bootstrapPopover('show')
          })
          .bootstrapPopover('hide')
      })
      .bootstrapPopover('show')
  })

  QUnit.test('should do nothing when an attempt is made to hide an uninitialized popover', function (assert) {
    assert.expect(1)

    var $popover = $('<span data-toggle="popover" data-title="some title" data-content="some content">some text</span>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.popover shown.bs.popover', function () {
        assert.ok(false, 'should not fire any popover events')
      })
      .bootstrapPopover('hide')
    assert.strictEqual($popover.data('bs.popover'), undefined, 'should not initialize the popover')
  })

  QUnit.test('should fire inserted event', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<a href="#">@Johann-S</a>')
      .appendTo('#qunit-fixture')
      .on('inserted.bs.popover', function () {
        assert.notEqual($('.popover').length, 0, 'popover was inserted')
        assert.ok(true, 'inserted event fired')
        done()
      })
      .bootstrapPopover({
        title: 'Test',
        content: 'Test'
      })
      .bootstrapPopover('show')
  })

  QUnit.test('should throw an error when show is called on hidden elements', function (assert) {
    assert.expect(1)
    var done = assert.async()

    try {
      $('<div data-toggle="popover" data-title="some title" data-content="@Johann-S" style="display: none"/>').bootstrapPopover('show')
    }
    catch (err) {
      assert.strictEqual(err.message, 'Please use show on visible elements')
      done()
    }
  })

  QUnit.test('should hide popovers when their containing modal is closed', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var templateHTML = '<div id="modal-test" class="modal">' +
                          '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                              '<div class="modal-body">' +
                                '<button id="popover-test" type="button" class="btn btn-secondary" data-toggle="popover" data-placement="top" data-content="Popover">' +
                                  'Popover on top' +
                                '</button>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>'

    $(templateHTML).appendTo('#qunit-fixture')
    $('#popover-test')
      .on('shown.bs.popover', function () {
        $('#modal-test').modal('hide')
      })
      .on('hide.bs.popover', function () {
        assert.ok(true, 'popover hide')
        done()
      })

    $('#modal-test')
      .on('shown.bs.modal', function () {
        $('#popover-test').bootstrapPopover('show')
      })
      .modal('show')
  })

  QUnit.test('should convert number to string without error for content and title', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $popover = $('<a href="#">@mdo</a>')
      .appendTo('#qunit-fixture')
      .bootstrapPopover({
        title: 5,
        content: 7
      })
      .on('shown.bs.popover', function () {
        assert.strictEqual($('.popover .popover-header').text(), '5')
        assert.strictEqual($('.popover .popover-body').text(), '7')
        done()
      })

    $popover.bootstrapPopover('show')
  })
})
;$(function () {
  'use strict'

  QUnit.module('scrollspy plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).scrollspy, 'scrollspy method is defined')
  })

  QUnit.module('scrollspy', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapScrollspy = $.fn.scrollspy.noConflict()
    },
    afterEach: function () {
      $.fn.scrollspy = $.fn.bootstrapScrollspy
      delete $.fn.bootstrapScrollspy
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.scrollspy, undefined, 'scrollspy was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>').appendTo('#qunit-fixture')
    $el.bootstrapScrollspy()
    try {
      $el.bootstrapScrollspy('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>').appendTo('#qunit-fixture')
    var $scrollspy = $el.bootstrapScrollspy()
    assert.ok($scrollspy instanceof $, 'returns jquery collection')
    assert.strictEqual($scrollspy[0], $el[0], 'collection contains element')
  })

  QUnit.test('should only switch "active" class on current target', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var sectionHTML = '<div id="root" class="active">'
        + '<div class="topbar">'
        + '<div class="topbar-inner">'
        + '<div class="container" id="ss-target">'
        + '<ul class="nav">'
        + '<li class="nav-item"><a href="#masthead">Overview</a></li>'
        + '<li class="nav-item"><a href="#detail">Detail</a></li>'
        + '</ul>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div id="scrollspy-example" style="height: 100px; overflow: auto;">'
        + '<div style="height: 200px;">'
        + '<h4 id="masthead">Overview</h4>'
        + '<p style="height: 200px">'
        + 'Ad leggings keytar, brunch id art party dolor labore.'
        + '</p>'
        + '</div>'
        + '<div style="height: 200px;">'
        + '<h4 id="detail">Detail</h4>'
        + '<p style="height: 200px">'
        + 'Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard.'
        + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $section = $(sectionHTML).appendTo('#qunit-fixture')

    var $scrollspy = $section
      .show()
      .find('#scrollspy-example')
      .bootstrapScrollspy({ target: '#ss-target' })

    $scrollspy.one('scroll', function () {
      assert.ok($section.hasClass('active'), '"active" class still on root node')
      done()
    })

    $scrollspy.scrollTop(350)
  })

  QUnit.test('should only switch "active" class on current target specified w element', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var sectionHTML = '<div id="root" class="active">'
        + '<div class="topbar">'
        + '<div class="topbar-inner">'
        + '<div class="container" id="ss-target">'
        + '<ul class="nav">'
        + '<li class="nav-item"><a href="#masthead">Overview</a></li>'
        + '<li class="nav-item"><a href="#detail">Detail</a></li>'
        + '</ul>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '<div id="scrollspy-example" style="height: 100px; overflow: auto;">'
        + '<div style="height: 200px;">'
        + '<h4 id="masthead">Overview</h4>'
        + '<p style="height: 200px">'
        + 'Ad leggings keytar, brunch id art party dolor labore.'
        + '</p>'
        + '</div>'
        + '<div style="height: 200px;">'
        + '<h4 id="detail">Detail</h4>'
        + '<p style="height: 200px">'
        + 'Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard.'
        + '</p>'
        + '</div>'
        + '</div>'
        + '</div>'
    var $section = $(sectionHTML).appendTo('#qunit-fixture')

    var $scrollspy = $section
      .show()
      .find('#scrollspy-example')
      .bootstrapScrollspy({ target: document.getElementById('#ss-target') })

    $scrollspy.one('scroll', function () {
      assert.ok($section.hasClass('active'), '"active" class still on root node')
      done()
    })

    $scrollspy.scrollTop(350)
  })

  QUnit.test('should correctly select middle navigation option when large offset is used', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var sectionHTML = '<div id="header" style="height: 500px;"></div>'
        + '<nav id="navigation" class="navbar">'
        + '<ul class="navbar-nav">'
        + '<li class="nav-item active"><a class="nav-link" id="one-link" href="#one">One</a></li>'
        + '<li class="nav-item"><a class="nav-link" id="two-link" href="#two">Two</a></li>'
        + '<li class="nav-item"><a class="nav-link" id="three-link" href="#three">Three</a></li>'
        + '</ul>'
        + '</nav>'
        + '<div id="content" style="height: 200px; overflow-y: auto;">'
        + '<div id="one" style="height: 500px;"></div>'
        + '<div id="two" style="height: 300px;"></div>'
        + '<div id="three" style="height: 10px;"></div>'
        + '</div>'
    var $section = $(sectionHTML).appendTo('#qunit-fixture')
    var $scrollspy = $section
      .show()
      .filter('#content')

    $scrollspy.bootstrapScrollspy({ target: '#navigation', offset: $scrollspy.position().top })

    $scrollspy.one('scroll', function () {
      assert.ok(!$section.find('#one-link').hasClass('active'), '"active" class removed from first section')
      assert.ok($section.find('#two-link').hasClass('active'), '"active" class on middle section')
      assert.ok(!$section.find('#three-link').hasClass('active'), '"active" class not on last section')
      done()
    })

    $scrollspy.scrollTop(550)
  })

  QUnit.test('should add the active class to the correct element', function (assert) {
    assert.expect(2)
    var navbarHtml =
        '<nav class="navbar">'
      + '<ul class="nav">'
      + '<li class="nav-item"><a class="nav-link" id="a-1" href="#div-1">div 1</a></li>'
      + '<li class="nav-item"><a class="nav-link" id="a-2" href="#div-2">div 2</a></li>'
      + '</ul>'
      + '</nav>'
    var contentHtml =
        '<div class="content" style="overflow: auto; height: 50px">'
      + '<div id="div-1" style="height: 100px; padding: 0; margin: 0">div 1</div>'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')
    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '.navbar' })

    var done = assert.async()
    var testElementIsActiveAfterScroll = function (element, target) {
      var deferred = $.Deferred()
      var scrollHeight = Math.ceil($content.scrollTop() + $(target).position().top)
      $content.one('scroll', function () {
        assert.ok($(element).hasClass('active'), 'target:' + target + ', element' + element)
        deferred.resolve()
      })
      $content.scrollTop(scrollHeight)
      return deferred.promise()
    }

    $.when(testElementIsActiveAfterScroll('#a-1', '#div-1'))
      .then(function () { return testElementIsActiveAfterScroll('#a-2', '#div-2') })
      .then(function () { done() })
  })

  QUnit.test('should add the active class to the correct element (nav markup)', function (assert) {
    assert.expect(2)
    var navbarHtml =
        '<nav class="navbar">'
      + '<nav class="nav">'
      + '<a class="nav-link" id="a-1" href="#div-1">div 1</a>'
      + '<a class="nav-link" id="a-2" href="#div-2">div 2</a>'
      + '</nav>'
      + '</nav>'
    var contentHtml =
        '<div class="content" style="overflow: auto; height: 50px">'
      + '<div id="div-1" style="height: 100px; padding: 0; margin: 0">div 1</div>'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')
    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '.navbar' })

    var done = assert.async()
    var testElementIsActiveAfterScroll = function (element, target) {
      var deferred = $.Deferred()
      var scrollHeight = Math.ceil($content.scrollTop() + $(target).position().top)
      $content.one('scroll', function () {
        assert.ok($(element).hasClass('active'), 'target:' + target + ', element' + element)
        deferred.resolve()
      })
      $content.scrollTop(scrollHeight)
      return deferred.promise()
    }

    $.when(testElementIsActiveAfterScroll('#a-1', '#div-1'))
      .then(function () { return testElementIsActiveAfterScroll('#a-2', '#div-2') })
      .then(function () { done() })
  })

  QUnit.test('should add the active class to the correct element (list-group markup)', function (assert) {
    assert.expect(2)
    var navbarHtml =
        '<nav class="navbar">'
      + '<div class="list-group">'
      + '<a class="list-group-item" id="a-1" href="#div-1">div 1</a>'
      + '<a class="list-group-item" id="a-2" href="#div-2">div 2</a>'
      + '</div>'
      + '</nav>'
    var contentHtml =
        '<div class="content" style="overflow: auto; height: 50px">'
      + '<div id="div-1" style="height: 100px; padding: 0; margin: 0">div 1</div>'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')
    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '.navbar' })

    var done = assert.async()
    var testElementIsActiveAfterScroll = function (element, target) {
      var deferred = $.Deferred()
      var scrollHeight = Math.ceil($content.scrollTop() + $(target).position().top)
      $content.one('scroll', function () {
        assert.ok($(element).hasClass('active'), 'target:' + target + ', element' + element)
        deferred.resolve()
      })
      $content.scrollTop(scrollHeight)
      return deferred.promise()
    }

    $.when(testElementIsActiveAfterScroll('#a-1', '#div-1'))
      .then(function () { return testElementIsActiveAfterScroll('#a-2', '#div-2') })
      .then(function () { done() })
  })

  QUnit.test('should add the active class correctly when there are nested elements at 0 scroll offset', function (assert) {
    assert.expect(6)
    var times = 0
    var done = assert.async()
    var navbarHtml = '<nav id="navigation" class="navbar">'
      + '<ul class="nav">'
      + '<li class="nav-item"><a id="a-1" class="nav-link" href="#div-1">div 1</a>'
      + '<ul class="nav">'
      + '<li class="nav-item"><a id="a-2" class="nav-link" href="#div-2">div 2</a></li>'
      + '</ul>'
      + '</li>'
      + '</ul>'
      + '</nav>'

    var contentHtml = '<div class="content" style="position: absolute; top: 0px; overflow: auto; height: 50px">'
      + '<div id="div-1" style="padding: 0; margin: 0">'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')

    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '#navigation' })

    function testActiveElements() {
      if (++times > 3) { return done() }

      $content.one('scroll', function () {
        assert.ok($('#a-1').hasClass('active'), 'nav item for outer element has "active" class')
        assert.ok($('#a-2').hasClass('active'), 'nav item for inner element has "active" class')
        testActiveElements()
      })

      $content.scrollTop($content.scrollTop() + 10)
    }

    testActiveElements()
  })

  QUnit.test('should add the active class correctly when there are nested elements (nav markup)', function (assert) {
    assert.expect(6)
    var times = 0
    var done = assert.async()
    var navbarHtml = '<nav id="navigation" class="navbar">'
      + '<nav class="nav">'
      + '<a id="a-1" class="nav-link" href="#div-1">div 1</a>'
      + '<nav class="nav">'
      + '<a id="a-2" class="nav-link" href="#div-2">div 2</a>'
      + '</nav>'
      + '</nav>'
      + '</nav>'

    var contentHtml = '<div class="content" style="position: absolute; top: 0px; overflow: auto; height: 50px">'
      + '<div id="div-1" style="padding: 0; margin: 0">'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')

    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '#navigation' })

    function testActiveElements() {
      if (++times > 3) { return done() }

      $content.one('scroll', function () {
        assert.ok($('#a-1').hasClass('active'), 'nav item for outer element has "active" class')
        assert.ok($('#a-2').hasClass('active'), 'nav item for inner element has "active" class')
        testActiveElements()
      })

      $content.scrollTop($content.scrollTop() + 10)
    }

    testActiveElements()
  })

  QUnit.test('should add the active class correctly when there are nested elements (list-group markup)', function (assert) {
    assert.expect(6)
    var times = 0
    var done = assert.async()
    var navbarHtml = '<nav id="navigation" class="navbar">'
      + '<div class="list-group">'
      + '<a id="a-1" class="list-group-item" href="#div-1">div 1</a>'
      + '<div class="list-group">'
      + '<a id="a-2" class="list-group-item" href="#div-2">div 2</a>'
      + '</div>'
      + '</div>'
      + '</nav>'

    var contentHtml = '<div class="content" style="position: absolute; top: 0px; overflow: auto; height: 50px">'
      + '<div id="div-1" style="padding: 0; margin: 0">'
      + '<div id="div-2" style="height: 200px; padding: 0; margin: 0">div 2</div>'
      + '</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')

    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '#navigation' })

    function testActiveElements() {
      if (++times > 3) { return done() }

      $content.one('scroll', function () {
        assert.ok($('#a-1').hasClass('active'), 'nav item for outer element has "active" class')
        assert.ok($('#a-2').hasClass('active'), 'nav item for inner element has "active" class')
        testActiveElements()
      })

      $content.scrollTop($content.scrollTop() + 10)
    }

    testActiveElements()
  })

  QUnit.test('should clear selection if above the first section', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var sectionHTML = '<div id="header" style="height: 500px;"></div>'
        + '<nav id="navigation" class="navbar">'
        + '<ul class="navbar-nav">'
        + '<li class="nav-item"><a id="one-link"   class="nav-link active" href="#one">One</a></li>'
        + '<li class="nav-item"><a id="two-link"   class="nav-link" href="#two">Two</a></li>'
        + '<li class="nav-item"><a id="three-link" class="nav-link" href="#three">Three</a></li>'
        + '</ul>'
        + '</nav>'
    $(sectionHTML).appendTo('#qunit-fixture')

    var scrollspyHTML = '<div id="content" style="height: 200px; overflow-y: auto;">'
        + '<div id="spacer" style="height: 100px;"/>'
        + '<div id="one" style="height: 100px;"/>'
        + '<div id="two" style="height: 100px;"/>'
        + '<div id="three" style="height: 100px;"/>'
        + '<div id="spacer" style="height: 100px;"/>'
        + '</div>'
    var $scrollspy = $(scrollspyHTML).appendTo('#qunit-fixture')

    $scrollspy
      .bootstrapScrollspy({
        target: '#navigation',
        offset: $scrollspy.position().top
      })
      .one('scroll', function () {
        assert.strictEqual($('.active').length, 1, '"active" class on only one element present')
        assert.strictEqual($('.active').is('#two-link'), true, '"active" class on second section')
        $scrollspy
          .one('scroll', function () {
            assert.strictEqual($('.active').length, 0, 'selection cleared')
            done()
          })
          .scrollTop(0)
      })
      .scrollTop(201)
  })

  QUnit.test('should NOT clear selection if above the first section and first section is at the top', function (assert) {
    assert.expect(4)
    var done = assert.async()

    var sectionHTML = '<div id="header" style="height: 500px;"></div>'
        + '<nav id="navigation" class="navbar">'
        + '<ul class="navbar-nav">'
        + '<li class="nav-item"><a id="one-link"   class="nav-link active" href="#one">One</a></li>'
        + '<li class="nav-item"><a id="two-link"   class="nav-link" href="#two">Two</a></li>'
        + '<li class="nav-item"><a id="three-link" class="nav-link" href="#three">Three</a></li>'
        + '</ul>'
        + '</nav>'
    $(sectionHTML).appendTo('#qunit-fixture')

    var negativeHeight = -10
    var startOfSectionTwo = 101

    var scrollspyHTML = '<div id="content" style="height: 200px; overflow-y: auto;">'
        + '<div id="one" style="height: 100px;"/>'
        + '<div id="two" style="height: 100px;"/>'
        + '<div id="three" style="height: 100px;"/>'
        + '<div id="spacer" style="height: 100px;"/>'
        + '</div>'
    var $scrollspy = $(scrollspyHTML).appendTo('#qunit-fixture')

    $scrollspy
      .bootstrapScrollspy({
        target: '#navigation',
        offset: $scrollspy.position().top
      })
      .one('scroll', function () {
        assert.strictEqual($('.active').length, 1, '"active" class on only one element present')
        assert.strictEqual($('.active').is('#two-link'), true, '"active" class on second section')
        $scrollspy
          .one('scroll', function () {
            assert.strictEqual($('.active').length, 1, '"active" class on only one element present')
            assert.strictEqual($('.active').is('#one-link'), true, '"active" class on first section')
            done()
          })
          .scrollTop(negativeHeight)
      })
      .scrollTop(startOfSectionTwo)
  })

  QUnit.test('should correctly select navigation element on backward scrolling when each target section height is 100%', function (assert) {
    assert.expect(5)
    var navbarHtml =
        '<nav class="navbar">'
      + '<ul class="nav">'
      + '<li class="nav-item"><a id="li-100-1" class="nav-link" href="#div-100-1">div 1</a></li>'
      + '<li class="nav-item"><a id="li-100-2" class="nav-link" href="#div-100-2">div 2</a></li>'
      + '<li class="nav-item"><a id="li-100-3" class="nav-link" href="#div-100-3">div 3</a></li>'
      + '<li class="nav-item"><a id="li-100-4" class="nav-link" href="#div-100-4">div 4</a></li>'
      + '<li class="nav-item"><a id="li-100-5" class="nav-link" href="#div-100-5">div 5</a></li>'
      + '</ul>'
      + '</nav>'
    var contentHtml =
        '<div class="content" style="position: relative; overflow: auto; height: 100px">'
      + '<div id="div-100-1" style="position: relative; height: 100%; padding: 0; margin: 0">div 1</div>'
      + '<div id="div-100-2" style="position: relative; height: 100%; padding: 0; margin: 0">div 2</div>'
      + '<div id="div-100-3" style="position: relative; height: 100%; padding: 0; margin: 0">div 3</div>'
      + '<div id="div-100-4" style="position: relative; height: 100%; padding: 0; margin: 0">div 4</div>'
      + '<div id="div-100-5" style="position: relative; height: 100%; padding: 0; margin: 0">div 5</div>'
      + '</div>'

    $(navbarHtml).appendTo('#qunit-fixture')
    var $content = $(contentHtml)
      .appendTo('#qunit-fixture')
      .bootstrapScrollspy({ offset: 0, target: '.navbar' })

    var testElementIsActiveAfterScroll = function (element, target) {
      var deferred = $.Deferred()
      var scrollHeight = Math.ceil($content.scrollTop() + $(target).position().top)
      $content.one('scroll', function () {
        assert.ok($(element).hasClass('active'), 'target:' + target + ', element: ' + element)
        deferred.resolve()
      })
      $content.scrollTop(scrollHeight)
      return deferred.promise()
    }

    var done = assert.async()
    $.when(testElementIsActiveAfterScroll('#li-100-5', '#div-100-5'))
      .then(function () { return testElementIsActiveAfterScroll('#li-100-4', '#div-100-4') })
      .then(function () { return testElementIsActiveAfterScroll('#li-100-3', '#div-100-3') })
      .then(function () { return testElementIsActiveAfterScroll('#li-100-2', '#div-100-2') })
      .then(function () { return testElementIsActiveAfterScroll('#li-100-1', '#div-100-1') })
      .then(function () { done() })
  })

  QUnit.test('should allow passed in option offset method: offset', function (assert) {
    assert.expect(4)

    var testOffsetMethod = function (type) {
      var $navbar = $(
          '<nav class="navbar"' + (type === 'data' ? ' id="navbar-offset-method-menu"' : '') + '>'
        + '<ul class="nav">'
        + '<li class="nav-item"><a id="li-' + type + 'm-1" class="nav-link" href="#div-' + type + 'm-1">div 1</a></li>'
        + '<li class="nav-item"><a id="li-' + type + 'm-2" class="nav-link" href="#div-' + type + 'm-2">div 2</a></li>'
        + '<li class="nav-item"><a id="li-' + type + 'm-3" class="nav-link" href="#div-' + type + 'm-3">div 3</a></li>'
        + '</ul>'
        + '</nav>'
      )
      var $content = $(
          '<div class="content"' + (type === 'data' ? ' data-spy="scroll" data-target="#navbar-offset-method-menu" data-offset="0" data-method="offset"' : '') + ' style="position: relative; overflow: auto; height: 100px">'
        + '<div id="div-' + type + 'm-1" style="position: relative; height: 200px; padding: 0; margin: 0">div 1</div>'
        + '<div id="div-' + type + 'm-2" style="position: relative; height: 150px; padding: 0; margin: 0">div 2</div>'
        + '<div id="div-' + type + 'm-3" style="position: relative; height: 250px; padding: 0; margin: 0">div 3</div>'
        + '</div>'
      )

      $navbar.appendTo('#qunit-fixture')
      $content.appendTo('#qunit-fixture')

      if (type === 'js') {
        $content.bootstrapScrollspy({ target: '.navbar', offset: 0, method: 'offset' })
      }
      else if (type === 'data') {
        $(window).trigger('load')
      }

      var $target = $('#div-' + type + 'm-2')
      var scrollspy = $content.data('bs.scrollspy')

      assert.ok(scrollspy._offsets[1] === $target.offset().top, 'offset method with ' + type + ' option')
      assert.ok(scrollspy._offsets[1] !== $target.position().top, 'position method with ' + type + ' option')
      $navbar.remove()
      $content.remove()
    }

    testOffsetMethod('js')
    testOffsetMethod('data')
  })

  QUnit.test('should allow passed in option offset method: position', function (assert) {
    assert.expect(4)

    var testOffsetMethod = function (type) {
      var $navbar = $(
          '<nav class="navbar"' + (type === 'data' ? ' id="navbar-offset-method-menu"' : '') + '>'
        + '<ul class="nav">'
        + '<li class="nav-item"><a class="nav-link" id="li-' + type + 'm-1" href="#div-' + type + 'm-1">div 1</a></li>'
        + '<li class="nav-item"><a class="nav-link" id="li-' + type + 'm-2" href="#div-' + type + 'm-2">div 2</a></li>'
        + '<li class="nav-item"><a class="nav-link" id="li-' + type + 'm-3" href="#div-' + type + 'm-3">div 3</a></li>'
        + '</ul>'
        + '</nav>'
      )
      var $content = $(
          '<div class="content"' + (type === 'data' ? ' data-spy="scroll" data-target="#navbar-offset-method-menu" data-offset="0" data-method="position"' : '') + ' style="position: relative; overflow: auto; height: 100px">'
        + '<div id="div-' + type + 'm-1" style="position: relative; height: 200px; padding: 0; margin: 0">div 1</div>'
        + '<div id="div-' + type + 'm-2" style="position: relative; height: 150px; padding: 0; margin: 0">div 2</div>'
        + '<div id="div-' + type + 'm-3" style="position: relative; height: 250px; padding: 0; margin: 0">div 3</div>'
        + '</div>'
      )

      $navbar.appendTo('#qunit-fixture')
      $content.appendTo('#qunit-fixture')

      if (type === 'js') { $content.bootstrapScrollspy({ target: '.navbar', offset: 0, method: 'position' }) }
      else if (type === 'data') { $(window).trigger('load') }

      var $target = $('#div-' + type + 'm-2')
      var scrollspy = $content.data('bs.scrollspy')

      assert.ok(scrollspy._offsets[1] !== $target.offset().top, 'offset method with ' + type + ' option')
      assert.ok(scrollspy._offsets[1] === $target.position().top, 'position method with ' + type + ' option')
      $navbar.remove()
      $content.remove()
    }

    testOffsetMethod('js')
    testOffsetMethod('data')
  })

})
;$(function () {
  'use strict'

  QUnit.module('tabs plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).tab, 'tabs method is defined')
  })

  QUnit.module('tabs', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapTab = $.fn.tab.noConflict()
    },
    afterEach: function () {
      $.fn.tab = $.fn.bootstrapTab
      delete $.fn.bootstrapTab
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.tab, undefined, 'tab was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapTab()
    try {
      $el.bootstrapTab('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $tab = $el.bootstrapTab()
    assert.ok($tab instanceof $, 'returns jquery collection')
    assert.strictEqual($tab[0], $el[0], 'collection contains element')
  })

  QUnit.test('should activate element by tab id', function (assert) {
    assert.expect(2)
    var tabsHTML = '<ul class="nav">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ul>'

    $('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

    $(tabsHTML).find('li:last a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('li:first a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id', function (assert) {
    assert.expect(2)
    var pillsHTML = '<ul class="nav nav-pills">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ul>'

    $('<ul><li id="home"/><li id="profile"/></ul>').appendTo('#qunit-fixture')

    $(pillsHTML).find('li:last a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(pillsHTML).find('li:first a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in ordered list', function (assert) {
    assert.expect(2)
    var pillsHTML = '<ol class="nav nav-pills">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ol>'

    $('<ol><li id="home"/><li id="profile"/></ol>').appendTo('#qunit-fixture')

    $(pillsHTML).find('li:last a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(pillsHTML).find('li:first a').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in nav list', function (assert) {
    assert.expect(2)
    var tabsHTML =  '<nav class="nav">' +
                      '<a href="#home">Home</a>' +
                      '<a href="#profile">Profile</a>' +
                    '</nav>'

    $('<nav><div id="home"></div><div id="profile"></div></nav>').appendTo('#qunit-fixture')

    $(tabsHTML).find('a:last').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('a:first').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should activate element by tab id in list group', function (assert) {
    assert.expect(2)
    var tabsHTML =  '<div class="list-group">' +
                      '<a href="#home">Home</a>' +
                      '<a href="#profile">Profile</a>' +
                    '</div>'

    $('<nav><div id="home"></div><div id="profile"></div></nav>').appendTo('#qunit-fixture')

    $(tabsHTML).find('a:last').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'profile')

    $(tabsHTML).find('a:first').bootstrapTab('show')
    assert.strictEqual($('#qunit-fixture').find('.active').attr('id'), 'home')
  })

  QUnit.test('should not fire shown when show is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div class="nav"/>')
      .on('show.bs.tab', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.tab', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('should not fire shown when tab is already active', function (assert) {
    assert.expect(0)
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">'
      + '<li class="nav-item"><a href="#home" class="nav-link active" role="tab">Home</a></li>'
      + '<li class="nav-item"><a href="#profile" class="nav-link" role="tab">Profile</a></li>'
      + '</ul>'
      + '<div class="tab-content">'
      + '<div class="tab-pane active" id="home" role="tabpanel"></div>'
      + '<div class="tab-pane" id="profile" role="tabpanel"></div>'
      + '</div>'

    $(tabsHTML)
      .find('a.active')
      .on('shown.bs.tab', function () {
        assert.ok(true, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('should not fire shown when tab is disabled', function (assert) {
    assert.expect(0)
    var tabsHTML = '<ul class="nav nav-tabs" role="tablist">'
      + '<li class="nav-item"><a href="#home" class="nav-link active" role="tab">Home</a></li>'
      + '<li class="nav-item"><a href="#profile" class="nav-link disabled" role="tab">Profile</a></li>'
      + '</ul>'
      + '<div class="tab-content">'
      + '<div class="tab-pane active" id="home" role="tabpanel"></div>'
      + '<div class="tab-pane" id="profile" role="tabpanel"></div>'
      + '</div>'

    $(tabsHTML)
      .find('a.disabled')
      .on('shown.bs.tab', function () {
        assert.ok(true, 'shown event fired')
      })
      .bootstrapTab('show')
  })

  QUnit.test('show and shown events should reference correct relatedTarget', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var dropHTML = '<ul class="drop nav">'
        + '<li class="dropdown"><a data-toggle="dropdown" href="#">1</a>'
        + '<ul class="dropdown-menu">'
        + '<li><a href="#1-1" data-toggle="tab">1-1</a></li>'
        + '<li><a href="#1-2" data-toggle="tab">1-2</a></li>'
        + '</ul>'
        + '</li>'
        + '</ul>'

    $(dropHTML)
      .find('ul > li:first a')
        .bootstrapTab('show')
      .end()
      .find('ul > li:last a')
        .on('show.bs.tab', function (e) {
          assert.strictEqual(e.relatedTarget.hash, '#1-1', 'references correct element as relatedTarget')
        })
        .on('shown.bs.tab', function (e) {
          assert.strictEqual(e.relatedTarget.hash, '#1-1', 'references correct element as relatedTarget')
          done()
        })
        .bootstrapTab('show')
  })

  QUnit.test('should fire hide and hidden events', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ul>'

    $(tabsHTML)
      .find('li:first a')
        .on('hide.bs.tab', function () {
          assert.ok(true, 'hide event fired')
        })
        .bootstrapTab('show')
      .end()
      .find('li:last a')
        .bootstrapTab('show')

    $(tabsHTML)
      .find('li:first a')
        .on('hidden.bs.tab', function () {
          assert.ok(true, 'hidden event fired')
          done()
        })
        .bootstrapTab('show')
      .end()
      .find('li:last a')
        .bootstrapTab('show')
  })

  QUnit.test('should not fire hidden when hide is prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ul>'

    $(tabsHTML)
      .find('li:first a')
        .on('hide.bs.tab', function (e) {
          e.preventDefault()
          assert.ok(true, 'hide event fired')
          done()
        })
        .on('hidden.bs.tab', function () {
          assert.ok(false, 'hidden event fired')
        })
        .bootstrapTab('show')
      .end()
      .find('li:last a')
        .bootstrapTab('show')
  })

  QUnit.test('hide and hidden events contain correct relatedTarget', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var tabsHTML = '<ul class="nav">'
        + '<li><a href="#home">Home</a></li>'
        + '<li><a href="#profile">Profile</a></li>'
        + '</ul>'

    $(tabsHTML)
      .find('li:first a')
        .on('hide.bs.tab', function (e) {
          assert.strictEqual(e.relatedTarget.hash, '#profile', 'references correct element as relatedTarget')
        })
        .on('hidden.bs.tab', function (e) {
          assert.strictEqual(e.relatedTarget.hash, '#profile', 'references correct element as relatedTarget')
          done()
        })
        .bootstrapTab('show')
      .end()
      .find('li:last a')
        .bootstrapTab('show')
  })

  QUnit.test('selected tab should have aria-expanded', function (assert) {
    assert.expect(8)
    var tabsHTML = '<ul class="nav nav-tabs">'
        + '<li><a class="nav-item active" href="#home" toggle="tab" aria-expanded="true">Home</a></li>'
        + '<li><a class="nav-item" href="#profile" toggle="tab" aria-expanded="false">Profile</a></li>'
        + '</ul>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    $tabs.find('li:first a').bootstrapTab('show')
    assert.strictEqual($tabs.find('.active').attr('aria-expanded'), 'true', 'shown tab has aria-expanded = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-expanded'), 'false', 'hidden tab has aria-expanded = false')

    $tabs.find('li:last a').trigger('click')
    assert.strictEqual($tabs.find('.active').attr('aria-expanded'), 'true', 'after click, shown tab has aria-expanded = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-expanded'), 'false', 'after click, hidden tab has aria-expanded = false')

    $tabs.find('li:first a').bootstrapTab('show')
    assert.strictEqual($tabs.find('.active').attr('aria-expanded'), 'true', 'shown tab has aria-expanded = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-expanded'), 'false', 'hidden tab has aria-expanded = false')

    $tabs.find('li:first a').trigger('click')
    assert.strictEqual($tabs.find('.active').attr('aria-expanded'), 'true', 'after second show event, shown tab still has aria-expanded = true')
    assert.strictEqual($tabs.find('a:not(.active)').attr('aria-expanded'), 'false', 'after second show event, hidden tab has aria-expanded = false')
  })

  QUnit.test('selected tab should deactivate previous selected tab', function (assert) {
    assert.expect(2)
    var tabsHTML = '<ul class="nav nav-tabs">'
        + '<li class="nav-item"><a class="nav-link active" href="#home" data-toggle="tab">Home</a></li>'
        + '<li class="nav-item"><a class="nav-link" href="#profile" data-toggle="tab">Profile</a></li>'
        + '</ul>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    $tabs.find('li:last a').trigger('click')
    assert.notOk($tabs.find('li:first a').hasClass('active'))
    assert.ok($tabs.find('li:last a').hasClass('active'))
  })

  QUnit.test('selected tab should deactivate previous selected link in dropdown', function (assert) {
    assert.expect(3)
    var tabsHTML = '<ul class="nav nav-tabs">'
        + '<li class="nav-item"><a class="nav-link" href="#home" data-toggle="tab">Home</a></li>'
        + '<li class="nav-item"><a class="nav-link" href="#profile" data-toggle="tab">Profile</a></li>'
        + '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle active" data-toggle="dropdown" href="#">Dropdown</a>'
        + '<div class="dropdown-menu">'
        + '<a class="dropdown-item active" href="#dropdown1" id="dropdown1-tab" data-toggle="tab">@fat</a>'
        + '<a class="dropdown-item" href="#dropdown2" id="dropdown2-tab" data-toggle="tab">@mdo</a>'
        + '</div>'
        + '</li>'
        + '</ul>'
    var $tabs = $(tabsHTML).appendTo('#qunit-fixture')

    $tabs.find('li:first > a').trigger('click')
    assert.ok($tabs.find('li:first a').hasClass('active'))
    assert.notOk($tabs.find('li:last > a').hasClass('active'))
    assert.notOk($tabs.find('li:last > .dropdown-menu > a:first').hasClass('active'))
  })
})
;$(function () {
  'use strict'

  QUnit.module('tooltip plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).tooltip, 'tooltip method is defined')
  })

  QUnit.module('tooltip', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapTooltip = $.fn.tooltip.noConflict()
    },
    afterEach: function () {
      $.fn.tooltip = $.fn.bootstrapTooltip
      delete $.fn.bootstrapTooltip
      $('.tooltip').remove()
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.tooltip, undefined, 'tooltip was set back to undefined (org value)')
  })

  QUnit.test('should throw explicit error on undefined method', function (assert) {
    assert.expect(1)
    var $el = $('<div/>')
    $el.bootstrapTooltip()
    try {
      $el.bootstrapTooltip('noMethod')
    }
    catch (err) {
      assert.strictEqual(err.message, 'No method named "noMethod"')
    }
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $tooltip = $el.bootstrapTooltip()
    assert.ok($tooltip instanceof $, 'returns jquery collection')
    assert.strictEqual($tooltip[0], $el[0], 'collection contains element')
  })

  QUnit.test('should expose default settings', function (assert) {
    assert.expect(1)
    assert.ok($.fn.bootstrapTooltip.Constructor.Default, 'defaults is defined')
  })

  QUnit.test('should empty title attribute', function (assert) {
    assert.expect(1)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>').bootstrapTooltip()
    assert.strictEqual($trigger.attr('title'), '', 'title attribute was emptied')
  })

  QUnit.test('should add data attribute for referencing original title', function (assert) {
    assert.expect(1)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>').bootstrapTooltip()
    assert.strictEqual($trigger.attr('data-original-title'), 'Another tooltip', 'original title preserved in data attribute')
  })

  QUnit.test('should add aria-describedby to the trigger on show', function (assert) {
    assert.expect(3)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .bootstrapTooltip()
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')

    var id = $('.tooltip').attr('id')

    assert.strictEqual($('#' + id).length, 1, 'has a unique id')
    assert.strictEqual($('.tooltip').attr('aria-describedby'), $trigger.attr('id'), 'tooltip id and aria-describedby on trigger match')
    assert.ok($trigger[0].hasAttribute('aria-describedby'), 'trigger has aria-describedby')
  })

  QUnit.test('should remove aria-describedby from trigger on hide', function (assert) {
    assert.expect(2)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .bootstrapTooltip()
      .appendTo('#qunit-fixture')

    $trigger.bootstrapTooltip('show')
    assert.ok($trigger[0].hasAttribute('aria-describedby'), 'trigger has aria-describedby')

    $trigger.bootstrapTooltip('hide')
    assert.ok(!$trigger[0].hasAttribute('aria-describedby'), 'trigger does not have aria-describedby')
  })

  QUnit.test('should assign a unique id tooltip element', function (assert) {
    assert.expect(2)
    $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')

    var id = $('.tooltip').attr('id')

    assert.strictEqual($('#' + id).length, 1, 'tooltip has unique id')
    assert.strictEqual(id.indexOf('tooltip'), 0, 'tooltip id has prefix')
  })

  QUnit.test('should place tooltips relative to placement option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ placement: 'bottom' })

    $tooltip.bootstrapTooltip('show')

    assert
      .ok($('.tooltip')
      .is('.fade.bs-tooltip-bottom.show'), 'has correct classes applied')

    $tooltip.bootstrapTooltip('hide')

    assert.strictEqual($tooltip.data('bs.tooltip').tip.parentNode, null, 'tooltip removed')
  })

  QUnit.test('should allow html entities', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="&lt;b&gt;@fat&lt;/b&gt;"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ html: true })

    $tooltip.bootstrapTooltip('show')
    assert.notEqual($('.tooltip b').length, 0, 'b tag was inserted')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($tooltip.data('bs.tooltip').tip.parentNode, null, 'tooltip removed')
  })

  QUnit.test('should allow DOMElement title (html: false)', function (assert) {
    assert.expect(3)
    var title = document.createTextNode('<3 writing tests')
    var $tooltip = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ title: title })

    $tooltip.bootstrapTooltip('show')

    assert.notEqual($('.tooltip').length, 0, 'tooltip inserted')
    assert.strictEqual($('.tooltip').text(), '<3 writing tests', 'title inserted')
    assert.ok(!$.contains($('.tooltip').get(0), title), 'title node copied, not moved')
  })

  QUnit.test('should allow DOMElement title (html: true)', function (assert) {
    assert.expect(3)
    var title = document.createTextNode('<3 writing tests')
    var $tooltip = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ html: true, title: title })

    $tooltip.bootstrapTooltip('show')

    assert.notEqual($('.tooltip').length, 0, 'tooltip inserted')
    assert.strictEqual($('.tooltip').text(), '<3 writing tests', 'title inserted')
    assert.ok($.contains($('.tooltip').get(0), title), 'title node moved, not copied')
  })


  QUnit.test('should respect custom classes', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ template: '<div class="tooltip some-class"><div class="tooltip-arrow"/><div class="tooltip-inner"/></div>' })

    $tooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').hasClass('some-class'), 'custom class is present')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($tooltip.data('bs.tooltip').tip.parentNode, null, 'tooltip removed')
  })

  QUnit.test('should fire show event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .on('show.bs.tooltip', function () {
        assert.ok(true, 'show event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should throw an error when show is called on hidden elements', function (assert) {
    assert.expect(1)
    var done = assert.async()

    try {
      $('<div title="tooltip title" style="display: none"/>').bootstrapTooltip('show')
    }
    catch (err) {
      assert.strictEqual(err.message, 'Please use show on visible elements')
      done()
    }
  })

  QUnit.test('should fire inserted event', function (assert) {
    assert.expect(2)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('inserted.bs.tooltip', function () {
        assert.notEqual($('.tooltip').length, 0, 'tooltip was inserted')
        assert.ok(true, 'inserted event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire shown event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"></div>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        assert.ok(true, 'shown was called')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should not fire shown event when show was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .on('show.bs.tooltip', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.tooltip', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire hide event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hide.bs.tooltip', function () {
        assert.ok(true, 'hide event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire hidden event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hidden.bs.tooltip', function () {
        assert.ok(true, 'hidden event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should not fire hidden event when hide was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hide.bs.tooltip', function (e) {
        e.preventDefault()
        assert.ok(true, 'hide event fired')
        done()
      })
      .on('hidden.bs.tooltip', function () {
        assert.ok(false, 'hidden event fired')
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should destroy tooltip', function (assert) {
    assert.expect(7)
    var $tooltip = $('<div/>')
      .bootstrapTooltip()
      .on('click.foo', function () {})

    assert.ok($tooltip.data('bs.tooltip'), 'tooltip has data')
    assert.ok($._data($tooltip[0], 'events').mouseover && $._data($tooltip[0], 'events').mouseout, 'tooltip has hover events')
    assert.strictEqual($._data($tooltip[0], 'events').click[0].namespace, 'foo', 'tooltip has extra click.foo event')

    $tooltip.bootstrapTooltip('show')
    $tooltip.bootstrapTooltip('dispose')

    assert.ok(!$tooltip.hasClass('show'), 'tooltip is hidden')
    assert.ok(!$._data($tooltip[0], 'bs.tooltip'), 'tooltip does not have data')
    assert.strictEqual($._data($tooltip[0], 'events').click[0].namespace, 'foo', 'tooltip still has click.foo')
    assert.ok(!$._data($tooltip[0], 'events').mouseover && !$._data($tooltip[0], 'events').mouseout, 'tooltip does not have hover events')
  })

  // QUnit.test('should show tooltip with delegate selector on click', function (assert) {
  //   assert.expect(2)
  //   var $div = $('<div><a href="#" rel="tooltip" title="Another tooltip"/></div>')
  //     .appendTo('#qunit-fixture')
  //     .bootstrapTooltip({
  //       selector: 'a[rel="tooltip"]',
  //       trigger: 'click'
  //     })

  //   $div.find('a').trigger('click')
  //   assert.ok($('.tooltip').is('.fade.in'), 'tooltip is faded in')

  //   $div.find('a').trigger('click')
  //   assert.strictEqual($div.data('bs.tooltip').tip.parentNode, null, 'tooltip removed')
  // })

  QUnit.test('should show tooltip when toggle is called', function (assert) {
    assert.expect(1)
    $('<a href="#" rel="tooltip" title="tooltip on toggle"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'manual' })
      .bootstrapTooltip('toggle')

    assert.ok($('.tooltip').is('.fade.show'), 'tooltip is faded active')
  })

  QUnit.test('should hide previously shown tooltip when toggle is called on tooltip', function (assert) {
    assert.expect(1)
    $('<a href="#" rel="tooltip" title="tooltip on toggle">@ResentedHook</a>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'manual' })
      .bootstrapTooltip('show')

    $('.tooltip').bootstrapTooltip('toggle')
    assert.ok($('.tooltip').not('.fade.show'), 'tooltip was faded out')
  })

  QUnit.test('should place tooltips inside body when container is body', function (assert) {
    assert.expect(3)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ container: 'body' })
      .bootstrapTooltip('show')

    assert.notEqual($('body > .tooltip').length, 0, 'tooltip is direct descendant of body')
    assert.strictEqual($('#qunit-fixture > .tooltip').length, 0, 'tooltip is not in parent')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('body > .tooltip').length, 0, 'tooltip was removed from dom')
  })

  QUnit.test('should add position class before positioning so that position-specific styles are taken into account', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var styles = '<style>'
      + '.bs-tooltip-right { white-space: nowrap; }'
      + '.bs-tooltip-right .tooltip-inner { max-width: none; }'
      + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('#qunit-fixture')
    $('<a href="#" rel="tooltip" title="very very very very very very very very long tooltip in one line"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'right',
        trigger: 'manual'
      })
      .on('inserted.bs.tooltip', function () {
        var $tooltip = $($(this).data('bs.tooltip').tip)
        assert.ok($tooltip.hasClass('bs-tooltip-right'))
        assert.ok($tooltip.attr('style') === undefined)
        $styles.remove()
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should use title attribute for tooltip text', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Simple tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip()

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'Simple tooltip', 'title from title attribute is set')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should prefer title attribute over title option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Simple tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({
        title: 'This is a tooltip with some content'
      })

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'Simple tooltip', 'title is set from title attribute while preferred over title option')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should use title option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({
        title: 'This is a tooltip with some content'
      })

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'This is a tooltip with some content', 'title from title option is set')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should not error when trying to show an top-placed tooltip that has been removed from the dom', function (assert) {
    assert.expect(1)
    var passed = true
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .one('show.bs.tooltip', function () {
        $(this).remove()
      })
      .bootstrapTooltip({ placement: 'top' })

    try {
      $tooltip.bootstrapTooltip('show')
    } catch (err) {
      passed = false
      console.log(err)
    }

    assert.ok(passed, '.tooltip(\'show\') should not throw an error if element no longer is in dom')
  })

  QUnit.test('should place tooltip on top of element', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var containerHTML = '<div id="test">'
        + '<p style="margin-top: 200px">'
        + '<a href="#" title="very very very very very very very long tooltip">Hover me</a>'
        + '</p>'
        + '</div>'

    var $container = $(containerHTML)
      .css({
        position: 'absolute',
        bottom: 0,
        left: 0,
        textAlign: 'right',
        width: 300,
        height: 300
      })
      .appendTo('#qunit-fixture')

    $container
      .find('a')
      .css('margin-top', 200)
      .bootstrapTooltip({
        placement: 'top',
        animate: false
      })
      .on('shown.bs.tooltip', function () {
        var $tooltip = $($(this).data('bs.tooltip').tip)
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          assert.ok(Math.round($tooltip.offset().top + $tooltip.outerHeight()) <= Math.round($(this).offset().top))
        }
        else {
          assert.ok(Math.round($tooltip.offset().top + $tooltip.outerHeight()) >= Math.round($(this).offset().top))
        }
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should show tooltip if leave event hasn\'t occurred before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '100ms: tooltip is not faded active')
    }, 100)

    setTimeout(function () {
      assert.ok($('.tooltip').is('.fade.show'), '200ms: tooltip is faded active')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '100ms: tooltip not faded active')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '200ms: tooltip not faded active')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 0, hide: 150 } })

    setTimeout(function () {
      assert.ok($('.tooltip').is('.fade.show'), '1ms: tooltip faded active')
      $tooltip.trigger('mouseout')

      setTimeout(function () {
        assert.ok($('.tooltip').is('.fade.show'), '100ms: tooltip still faded active')
        $tooltip.trigger('mouseenter')
      }, 100)

      setTimeout(function () {
        assert.ok($('.tooltip').is('.fade.show'), '200ms: tooltip still faded active')
        done()
      }, 200)
    }, 0)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '100ms: tooltip not faded active')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '200ms: tooltip not faded active')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires, even if hide delay is 0', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 150, hide: 0 } })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '100ms: tooltip not faded active')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.show'), '250ms: tooltip not faded active')
      done()
    }, 250)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should wait 200ms before hiding the tooltip', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 0, hide: 150 } })

    setTimeout(function () {
      assert.ok($($tooltip.data('bs.tooltip').tip).is('.fade.show'), '1ms: tooltip faded active')

      $tooltip.trigger('mouseout')

      setTimeout(function () {
        assert.ok($($tooltip.data('bs.tooltip').tip).is('.fade.show'), '100ms: tooltip still faded active')
      }, 100)

      setTimeout(function () {
        assert.ok(!$($tooltip.data('bs.tooltip').tip).is('.show'), '200ms: tooltip removed')
        done()
      }, 200)

    }, 0)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not reload the tooltip on subsequent mouseenter events', function (assert) {
    assert.expect(1)
    var titleHtml = function () {
      var uid = Util.getUID('tooltip')
      return '<p id="tt-content">' + uid + '</p><p>' + uid + '</p><p>' + uid + '</p>'
    }

    var $tooltip = $('<span id="tt-outer" rel="tooltip" data-trigger="hover" data-placement="top">some text</span>')
      .appendTo('#qunit-fixture')

    $tooltip.bootstrapTooltip({
      html: true,
      animation: false,
      trigger: 'hover',
      delay: { show: 0, hide: 500 },
      container: $tooltip,
      title: titleHtml
    })

    $('#tt-outer').trigger('mouseenter')

    var currentUid = $('#tt-content').text()

    $('#tt-content').trigger('mouseenter')
    assert.strictEqual(currentUid, $('#tt-content').text())
  })

  QUnit.test('should not reload the tooltip if the mouse leaves and re-enters before hiding', function (assert) {
    assert.expect(4)

    var titleHtml = function () {
      var uid = Util.getUID('tooltip')
      return '<p id="tt-content">' + uid + '</p><p>' + uid + '</p><p>' + uid + '</p>'
    }

    var $tooltip = $('<span id="tt-outer" rel="tooltip" data-trigger="hover" data-placement="top">some text</span>')
      .appendTo('#qunit-fixture')

    $tooltip.bootstrapTooltip({
      html: true,
      animation: false,
      trigger: 'hover',
      delay: { show: 0, hide: 500 },
      title: titleHtml
    })

    var obj = $tooltip.data('bs.tooltip')

    $('#tt-outer').trigger('mouseenter')

    var currentUid = $('#tt-content').text()

    $('#tt-outer').trigger('mouseleave')
    assert.strictEqual(currentUid, $('#tt-content').text())

    assert.ok(obj._hoverState === 'out', 'the tooltip hoverState should be set to "out"')

    $('#tt-outer').trigger('mouseenter')
    assert.ok(obj._hoverState === 'show', 'the tooltip hoverState should be set to "show"')

    assert.strictEqual(currentUid, $('#tt-content').text())
  })

  QUnit.test('should do nothing when an attempt is made to hide an uninitialized tooltip', function (assert) {
    assert.expect(1)

    var $tooltip = $('<span data-toggle="tooltip" title="some tip">some text</span>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.tooltip shown.bs.tooltip', function () {
        assert.ok(false, 'should not fire any tooltip events')
      })
      .bootstrapTooltip('hide')
    assert.strictEqual($tooltip.data('bs.tooltip'), undefined, 'should not initialize the tooltip')
  })

  QUnit.test('should not remove tooltip if multiple triggers are set and one is still active', function (assert) {
    assert.expect(41)
    var $el = $('<button>Trigger</button>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'click hover focus', animation: false })
    var tooltip = $el.data('bs.tooltip')
    var $tooltip = $(tooltip.getTipElement())

    function showingTooltip() { return $tooltip.hasClass('show') || tooltip._hoverState === 'show' }

    var tests = [
        ['mouseenter', 'mouseleave'],

        ['focusin', 'focusout'],

        ['click', 'click'],

        ['mouseenter', 'focusin', 'focusout', 'mouseleave'],
        ['mouseenter', 'focusin', 'mouseleave', 'focusout'],

        ['focusin', 'mouseenter', 'mouseleave', 'focusout'],
        ['focusin', 'mouseenter', 'focusout', 'mouseleave'],

        ['click', 'focusin', 'mouseenter', 'focusout', 'mouseleave', 'click'],
        ['mouseenter', 'click', 'focusin', 'focusout', 'mouseleave', 'click'],
        ['mouseenter', 'focusin', 'click', 'click', 'mouseleave', 'focusout']
    ]

    assert.ok(!showingTooltip())

    $.each(tests, function (idx, triggers) {
      for (var i = 0, len = triggers.length; i < len; i++) {
        $el.trigger(triggers[i])
        assert.equal(i < len - 1, showingTooltip())
      }
    })
  })

  QUnit.test('should show on first trigger after hide', function (assert) {
    assert.expect(3)
    var $el = $('<a href="#" rel="tooltip" title="Test tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'click hover focus', animation: false })

    var tooltip = $el.data('bs.tooltip')
    var $tooltip = $(tooltip.getTipElement())

    function showingTooltip() { return $tooltip.hasClass('show') || tooltip._hoverState === 'show' }

    $el.trigger('click')
    assert.ok(showingTooltip(), 'tooltip is faded in')

    $el.bootstrapTooltip('hide')
    assert.ok(!showingTooltip(), 'tooltip was faded out')

    $el.trigger('click')
    assert.ok(showingTooltip(), 'tooltip is faded in again')
  })

  QUnit.test('should hide tooltip when their containing modal is closed', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var templateHTML = '<div id="modal-test" class="modal">' +
                          '<div class="modal-dialog" role="document">' +
                            '<div class="modal-content">' +
                              '<div class="modal-body">' +
                                '<a id="tooltipTest" href="#" data-toggle="tooltip" title="Some tooltip text!">Tooltip</a>' +
                              '</div>' +
                            '</div>' +
                          '</div>' +
                        '</div>'

    $(templateHTML).appendTo('#qunit-fixture')
    $('#tooltipTest')
      .bootstrapTooltip({ trigger: 'manuel' })
      .on('shown.bs.tooltip', function () {
        $('#modal-test').modal('hide')
      })
      .on('hide.bs.tooltip', function () {
        assert.ok(true, 'tooltip hide')
        done()
      })

    $('#modal-test')
      .on('shown.bs.modal', function () {
        $('#tooltipTest').bootstrapTooltip('show')
      })
      .modal('show')
  })

  QUnit.test('should reset tip classes when hidden event triggered', function (assert) {
    assert.expect(2)
    var done = assert.async()
    var $el = $('<a href="#" rel="tooltip" title="Test tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')
      .on('hidden.bs.tooltip', function () {
        var tooltip = $el.data('bs.tooltip')
        var $tooltip = $(tooltip.getTipElement())
        assert.ok($tooltip.hasClass('tooltip'))
        assert.ok($tooltip.hasClass('fade'))
        done()
      })

    $el.bootstrapTooltip('hide')
  })

  QUnit.test('should convert number in title to string', function (assert) {
    assert.expect(1)
    var done = assert.async()
    var $el = $('<a href="#" rel="tooltip" title="7"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')
      .on('shown.bs.tooltip', function () {
        var tooltip = $el.data('bs.tooltip')
        var $tooltip = $(tooltip.getTipElement())
        assert.strictEqual($tooltip.children().text(), '7')
        done()
      })

    $el.bootstrapTooltip('show')
  })
})
;/*!
 * QUnit 2.4.0
 * https://qunitjs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-07-08T15:20Z
 */
(function (global$1) {
  'use strict';

  global$1 = global$1 && 'default' in global$1 ? global$1['default'] : global$1;

  var window = global$1.window;
  var self$1 = global$1.self;
  var console = global$1.console;
  var setTimeout = global$1.setTimeout;
  var clearTimeout = global$1.clearTimeout;

  var document = window && window.document;
  var navigator = window && window.navigator;

  var localSessionStorage = function () {
  	var x = "qunit-test-string";
  	try {
  		global$1.sessionStorage.setItem(x, x);
  		global$1.sessionStorage.removeItem(x);
  		return global$1.sessionStorage;
  	} catch (e) {
  		return undefined;
  	}
  }();

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };











  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();









































  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var toString = Object.prototype.toString;
  var hasOwn = Object.prototype.hasOwnProperty;
  var now = Date.now || function () {
  	return new Date().getTime();
  };

  var defined = {
  	document: window && window.document !== undefined,
  	setTimeout: setTimeout !== undefined
  };

  // Returns a new Array with the elements that are in a but not in b
  function diff(a, b) {
  	var i,
  	    j,
  	    result = a.slice();

  	for (i = 0; i < result.length; i++) {
  		for (j = 0; j < b.length; j++) {
  			if (result[i] === b[j]) {
  				result.splice(i, 1);
  				i--;
  				break;
  			}
  		}
  	}
  	return result;
  }

  /**
   * Determines whether an element exists in a given array or not.
   *
   * @method inArray
   * @param {Any} elem
   * @param {Array} array
   * @return {Boolean}
   */
  function inArray(elem, array) {
  	return array.indexOf(elem) !== -1;
  }

  /**
   * Makes a clone of an object using only Array or Object as base,
   * and copies over the own enumerable properties.
   *
   * @param {Object} obj
   * @return {Object} New object with only the own properties (recursively).
   */
  function objectValues(obj) {
  	var key,
  	    val,
  	    vals = is("array", obj) ? [] : {};
  	for (key in obj) {
  		if (hasOwn.call(obj, key)) {
  			val = obj[key];
  			vals[key] = val === Object(val) ? objectValues(val) : val;
  		}
  	}
  	return vals;
  }

  function extend(a, b, undefOnly) {
  	for (var prop in b) {
  		if (hasOwn.call(b, prop)) {
  			if (b[prop] === undefined) {
  				delete a[prop];
  			} else if (!(undefOnly && typeof a[prop] !== "undefined")) {
  				a[prop] = b[prop];
  			}
  		}
  	}

  	return a;
  }

  function objectType(obj) {
  	if (typeof obj === "undefined") {
  		return "undefined";
  	}

  	// Consider: typeof null === object
  	if (obj === null) {
  		return "null";
  	}

  	var match = toString.call(obj).match(/^\[object\s(.*)\]$/),
  	    type = match && match[1];

  	switch (type) {
  		case "Number":
  			if (isNaN(obj)) {
  				return "nan";
  			}
  			return "number";
  		case "String":
  		case "Boolean":
  		case "Array":
  		case "Set":
  		case "Map":
  		case "Date":
  		case "RegExp":
  		case "Function":
  		case "Symbol":
  			return type.toLowerCase();
  		default:
  			return typeof obj === "undefined" ? "undefined" : _typeof(obj);
  	}
  }

  // Safe object type checking
  function is(type, obj) {
  	return objectType(obj) === type;
  }

  // Based on Java's String.hashCode, a simple but not
  // rigorously collision resistant hashing function
  function generateHash(module, testName) {
  	var str = module + "\x1C" + testName;
  	var hash = 0;

  	for (var i = 0; i < str.length; i++) {
  		hash = (hash << 5) - hash + str.charCodeAt(i);
  		hash |= 0;
  	}

  	// Convert the possibly negative integer hash code into an 8 character hex string, which isn't
  	// strictly necessary but increases user understanding that the id is a SHA-like hash
  	var hex = (0x100000000 + hash).toString(16);
  	if (hex.length < 8) {
  		hex = "0000000" + hex;
  	}

  	return hex.slice(-8);
  }

  // Test for equality any JavaScript type.
  // Authors: Philippe Rathé <prathe@gmail.com>, David Chan <david@troi.org>
  var equiv = (function () {

  	// Value pairs queued for comparison. Used for breadth-first processing order, recursion
  	// detection and avoiding repeated comparison (see below for details).
  	// Elements are { a: val, b: val }.
  	var pairs = [];

  	var getProto = Object.getPrototypeOf || function (obj) {
  		return obj.__proto__;
  	};

  	function useStrictEquality(a, b) {

  		// This only gets called if a and b are not strict equal, and is used to compare on
  		// the primitive values inside object wrappers. For example:
  		// `var i = 1;`
  		// `var j = new Number(1);`
  		// Neither a nor b can be null, as a !== b and they have the same type.
  		if ((typeof a === "undefined" ? "undefined" : _typeof(a)) === "object") {
  			a = a.valueOf();
  		}
  		if ((typeof b === "undefined" ? "undefined" : _typeof(b)) === "object") {
  			b = b.valueOf();
  		}

  		return a === b;
  	}

  	function compareConstructors(a, b) {
  		var protoA = getProto(a);
  		var protoB = getProto(b);

  		// Comparing constructors is more strict than using `instanceof`
  		if (a.constructor === b.constructor) {
  			return true;
  		}

  		// Ref #851
  		// If the obj prototype descends from a null constructor, treat it
  		// as a null prototype.
  		if (protoA && protoA.constructor === null) {
  			protoA = null;
  		}
  		if (protoB && protoB.constructor === null) {
  			protoB = null;
  		}

  		// Allow objects with no prototype to be equivalent to
  		// objects with Object as their constructor.
  		if (protoA === null && protoB === Object.prototype || protoB === null && protoA === Object.prototype) {
  			return true;
  		}

  		return false;
  	}

  	function getRegExpFlags(regexp) {
  		return "flags" in regexp ? regexp.flags : regexp.toString().match(/[gimuy]*$/)[0];
  	}

  	function isContainer(val) {
  		return ["object", "array", "map", "set"].indexOf(objectType(val)) !== -1;
  	}

  	function breadthFirstCompareChild(a, b) {

  		// If a is a container not reference-equal to b, postpone the comparison to the
  		// end of the pairs queue -- unless (a, b) has been seen before, in which case skip
  		// over the pair.
  		if (a === b) {
  			return true;
  		}
  		if (!isContainer(a)) {
  			return typeEquiv(a, b);
  		}
  		if (pairs.every(function (pair) {
  			return pair.a !== a || pair.b !== b;
  		})) {

  			// Not yet started comparing this pair
  			pairs.push({ a: a, b: b });
  		}
  		return true;
  	}

  	var callbacks = {
  		"string": useStrictEquality,
  		"boolean": useStrictEquality,
  		"number": useStrictEquality,
  		"null": useStrictEquality,
  		"undefined": useStrictEquality,
  		"symbol": useStrictEquality,
  		"date": useStrictEquality,

  		"nan": function nan() {
  			return true;
  		},

  		"regexp": function regexp(a, b) {
  			return a.source === b.source &&

  			// Include flags in the comparison
  			getRegExpFlags(a) === getRegExpFlags(b);
  		},

  		// abort (identical references / instance methods were skipped earlier)
  		"function": function _function() {
  			return false;
  		},

  		"array": function array(a, b) {
  			var i, len;

  			len = a.length;
  			if (len !== b.length) {

  				// Safe and faster
  				return false;
  			}

  			for (i = 0; i < len; i++) {

  				// Compare non-containers; queue non-reference-equal containers
  				if (!breadthFirstCompareChild(a[i], b[i])) {
  					return false;
  				}
  			}
  			return true;
  		},

  		// Define sets a and b to be equivalent if for each element aVal in a, there
  		// is some element bVal in b such that aVal and bVal are equivalent. Element
  		// repetitions are not counted, so these are equivalent:
  		// a = new Set( [ {}, [], [] ] );
  		// b = new Set( [ {}, {}, [] ] );
  		"set": function set$$1(a, b) {
  			var innerEq,
  			    outerEq = true;

  			if (a.size !== b.size) {

  				// This optimization has certain quirks because of the lack of
  				// repetition counting. For instance, adding the same
  				// (reference-identical) element to two equivalent sets can
  				// make them non-equivalent.
  				return false;
  			}

  			a.forEach(function (aVal) {

  				// Short-circuit if the result is already known. (Using for...of
  				// with a break clause would be cleaner here, but it would cause
  				// a syntax error on older Javascript implementations even if
  				// Set is unused)
  				if (!outerEq) {
  					return;
  				}

  				innerEq = false;

  				b.forEach(function (bVal) {
  					var parentPairs;

  					// Likewise, short-circuit if the result is already known
  					if (innerEq) {
  						return;
  					}

  					// Swap out the global pairs list, as the nested call to
  					// innerEquiv will clobber its contents
  					parentPairs = pairs;
  					if (innerEquiv(bVal, aVal)) {
  						innerEq = true;
  					}

  					// Replace the global pairs list
  					pairs = parentPairs;
  				});

  				if (!innerEq) {
  					outerEq = false;
  				}
  			});

  			return outerEq;
  		},

  		// Define maps a and b to be equivalent if for each key-value pair (aKey, aVal)
  		// in a, there is some key-value pair (bKey, bVal) in b such that
  		// [ aKey, aVal ] and [ bKey, bVal ] are equivalent. Key repetitions are not
  		// counted, so these are equivalent:
  		// a = new Map( [ [ {}, 1 ], [ {}, 1 ], [ [], 1 ] ] );
  		// b = new Map( [ [ {}, 1 ], [ [], 1 ], [ [], 1 ] ] );
  		"map": function map(a, b) {
  			var innerEq,
  			    outerEq = true;

  			if (a.size !== b.size) {

  				// This optimization has certain quirks because of the lack of
  				// repetition counting. For instance, adding the same
  				// (reference-identical) key-value pair to two equivalent maps
  				// can make them non-equivalent.
  				return false;
  			}

  			a.forEach(function (aVal, aKey) {

  				// Short-circuit if the result is already known. (Using for...of
  				// with a break clause would be cleaner here, but it would cause
  				// a syntax error on older Javascript implementations even if
  				// Map is unused)
  				if (!outerEq) {
  					return;
  				}

  				innerEq = false;

  				b.forEach(function (bVal, bKey) {
  					var parentPairs;

  					// Likewise, short-circuit if the result is already known
  					if (innerEq) {
  						return;
  					}

  					// Swap out the global pairs list, as the nested call to
  					// innerEquiv will clobber its contents
  					parentPairs = pairs;
  					if (innerEquiv([bVal, bKey], [aVal, aKey])) {
  						innerEq = true;
  					}

  					// Replace the global pairs list
  					pairs = parentPairs;
  				});

  				if (!innerEq) {
  					outerEq = false;
  				}
  			});

  			return outerEq;
  		},

  		"object": function object(a, b) {
  			var i,
  			    aProperties = [],
  			    bProperties = [];

  			if (compareConstructors(a, b) === false) {
  				return false;
  			}

  			// Be strict: don't ensure hasOwnProperty and go deep
  			for (i in a) {

  				// Collect a's properties
  				aProperties.push(i);

  				// Skip OOP methods that look the same
  				if (a.constructor !== Object && typeof a.constructor !== "undefined" && typeof a[i] === "function" && typeof b[i] === "function" && a[i].toString() === b[i].toString()) {
  					continue;
  				}

  				// Compare non-containers; queue non-reference-equal containers
  				if (!breadthFirstCompareChild(a[i], b[i])) {
  					return false;
  				}
  			}

  			for (i in b) {

  				// Collect b's properties
  				bProperties.push(i);
  			}

  			// Ensures identical properties name
  			return typeEquiv(aProperties.sort(), bProperties.sort());
  		}
  	};

  	function typeEquiv(a, b) {
  		var type = objectType(a);

  		// Callbacks for containers will append to the pairs queue to achieve breadth-first
  		// search order. The pairs queue is also used to avoid reprocessing any pair of
  		// containers that are reference-equal to a previously visited pair (a special case
  		// this being recursion detection).
  		//
  		// Because of this approach, once typeEquiv returns a false value, it should not be
  		// called again without clearing the pair queue else it may wrongly report a visited
  		// pair as being equivalent.
  		return objectType(b) === type && callbacks[type](a, b);
  	}

  	function innerEquiv(a, b) {
  		var i, pair;

  		// We're done when there's nothing more to compare
  		if (arguments.length < 2) {
  			return true;
  		}

  		// Clear the global pair queue and add the top-level values being compared
  		pairs = [{ a: a, b: b }];

  		for (i = 0; i < pairs.length; i++) {
  			pair = pairs[i];

  			// Perform type-specific comparison on any pairs that are not strictly
  			// equal. For container types, that comparison will postpone comparison
  			// of any sub-container pair to the end of the pair queue. This gives
  			// breadth-first search order. It also avoids the reprocessing of
  			// reference-equal siblings, cousins etc, which can have a significant speed
  			// impact when comparing a container of small objects each of which has a
  			// reference to the same (singleton) large object.
  			if (pair.a !== pair.b && !typeEquiv(pair.a, pair.b)) {
  				return false;
  			}
  		}

  		// ...across all consecutive argument pairs
  		return arguments.length === 2 || innerEquiv.apply(this, [].slice.call(arguments, 1));
  	}

  	return function () {
  		var result = innerEquiv.apply(undefined, arguments);

  		// Release any retained objects
  		pairs.length = 0;
  		return result;
  	};
  })();

  /**
   * Config object: Maintain internal state
   * Later exposed as QUnit.config
   * `config` initialized at top of scope
   */
  var config = {

  	// The queue of tests to run
  	queue: [],

  	// Block until document ready
  	blocking: true,

  	// By default, run previously failed tests first
  	// very useful in combination with "Hide passed tests" checked
  	reorder: true,

  	// By default, modify document.title when suite is done
  	altertitle: true,

  	// HTML Reporter: collapse every test except the first failing test
  	// If false, all failing tests will be expanded
  	collapse: true,

  	// By default, scroll to top of the page when suite is done
  	scrolltop: true,

  	// Depth up-to which object will be dumped
  	maxDepth: 5,

  	// When enabled, all tests must call expect()
  	requireExpects: false,

  	// Placeholder for user-configurable form-exposed URL parameters
  	urlConfig: [],

  	// Set of all modules.
  	modules: [],

  	// The first unnamed module
  	currentModule: {
  		name: "",
  		tests: [],
  		childModules: [],
  		testsRun: 0,
  		unskippedTestsRun: 0,
  		hooks: {
  			before: [],
  			beforeEach: [],
  			afterEach: [],
  			after: []
  		}
  	},

  	callbacks: {},

  	// The storage module to use for reordering tests
  	storage: localSessionStorage
  };

  // take a predefined QUnit.config and extend the defaults
  var globalConfig = window && window.QUnit && window.QUnit.config;

  // only extend the global config if there is no QUnit overload
  if (window && window.QUnit && !window.QUnit.version) {
  	extend(config, globalConfig);
  }

  // Push a loose unnamed module to the modules collection
  config.modules.push(config.currentModule);

  // Based on jsDump by Ariel Flesler
  // http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html
  var dump = (function () {
  	function quote(str) {
  		return "\"" + str.toString().replace(/\\/g, "\\\\").replace(/"/g, "\\\"") + "\"";
  	}
  	function literal(o) {
  		return o + "";
  	}
  	function join(pre, arr, post) {
  		var s = dump.separator(),
  		    base = dump.indent(),
  		    inner = dump.indent(1);
  		if (arr.join) {
  			arr = arr.join("," + s + inner);
  		}
  		if (!arr) {
  			return pre + post;
  		}
  		return [pre, inner + arr, base + post].join(s);
  	}
  	function array(arr, stack) {
  		var i = arr.length,
  		    ret = new Array(i);

  		if (dump.maxDepth && dump.depth > dump.maxDepth) {
  			return "[object Array]";
  		}

  		this.up();
  		while (i--) {
  			ret[i] = this.parse(arr[i], undefined, stack);
  		}
  		this.down();
  		return join("[", ret, "]");
  	}

  	function isArray(obj) {
  		return (

  			//Native Arrays
  			toString.call(obj) === "[object Array]" ||

  			// NodeList objects
  			typeof obj.length === "number" && obj.item !== undefined && (obj.length ? obj.item(0) === obj[0] : obj.item(0) === null && obj[0] === undefined)
  		);
  	}

  	var reName = /^function (\w+)/,
  	    dump = {

  		// The objType is used mostly internally, you can fix a (custom) type in advance
  		parse: function parse(obj, objType, stack) {
  			stack = stack || [];
  			var res,
  			    parser,
  			    parserType,
  			    objIndex = stack.indexOf(obj);

  			if (objIndex !== -1) {
  				return "recursion(" + (objIndex - stack.length) + ")";
  			}

  			objType = objType || this.typeOf(obj);
  			parser = this.parsers[objType];
  			parserType = typeof parser === "undefined" ? "undefined" : _typeof(parser);

  			if (parserType === "function") {
  				stack.push(obj);
  				res = parser.call(this, obj, stack);
  				stack.pop();
  				return res;
  			}
  			return parserType === "string" ? parser : this.parsers.error;
  		},
  		typeOf: function typeOf(obj) {
  			var type;

  			if (obj === null) {
  				type = "null";
  			} else if (typeof obj === "undefined") {
  				type = "undefined";
  			} else if (is("regexp", obj)) {
  				type = "regexp";
  			} else if (is("date", obj)) {
  				type = "date";
  			} else if (is("function", obj)) {
  				type = "function";
  			} else if (obj.setInterval !== undefined && obj.document !== undefined && obj.nodeType === undefined) {
  				type = "window";
  			} else if (obj.nodeType === 9) {
  				type = "document";
  			} else if (obj.nodeType) {
  				type = "node";
  			} else if (isArray(obj)) {
  				type = "array";
  			} else if (obj.constructor === Error.prototype.constructor) {
  				type = "error";
  			} else {
  				type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
  			}
  			return type;
  		},

  		separator: function separator() {
  			if (this.multiline) {
  				return this.HTML ? "<br />" : "\n";
  			} else {
  				return this.HTML ? "&#160;" : " ";
  			}
  		},

  		// Extra can be a number, shortcut for increasing-calling-decreasing
  		indent: function indent(extra) {
  			if (!this.multiline) {
  				return "";
  			}
  			var chr = this.indentChar;
  			if (this.HTML) {
  				chr = chr.replace(/\t/g, "   ").replace(/ /g, "&#160;");
  			}
  			return new Array(this.depth + (extra || 0)).join(chr);
  		},
  		up: function up(a) {
  			this.depth += a || 1;
  		},
  		down: function down(a) {
  			this.depth -= a || 1;
  		},
  		setParser: function setParser(name, parser) {
  			this.parsers[name] = parser;
  		},

  		// The next 3 are exposed so you can use them
  		quote: quote,
  		literal: literal,
  		join: join,
  		depth: 1,
  		maxDepth: config.maxDepth,

  		// This is the list of parsers, to modify them, use dump.setParser
  		parsers: {
  			window: "[Window]",
  			document: "[Document]",
  			error: function error(_error) {
  				return "Error(\"" + _error.message + "\")";
  			},
  			unknown: "[Unknown]",
  			"null": "null",
  			"undefined": "undefined",
  			"function": function _function(fn) {
  				var ret = "function",


  				// Functions never have name in IE
  				name = "name" in fn ? fn.name : (reName.exec(fn) || [])[1];

  				if (name) {
  					ret += " " + name;
  				}
  				ret += "(";

  				ret = [ret, dump.parse(fn, "functionArgs"), "){"].join("");
  				return join(ret, dump.parse(fn, "functionCode"), "}");
  			},
  			array: array,
  			nodelist: array,
  			"arguments": array,
  			object: function object(map, stack) {
  				var keys,
  				    key,
  				    val,
  				    i,
  				    nonEnumerableProperties,
  				    ret = [];

  				if (dump.maxDepth && dump.depth > dump.maxDepth) {
  					return "[object Object]";
  				}

  				dump.up();
  				keys = [];
  				for (key in map) {
  					keys.push(key);
  				}

  				// Some properties are not always enumerable on Error objects.
  				nonEnumerableProperties = ["message", "name"];
  				for (i in nonEnumerableProperties) {
  					key = nonEnumerableProperties[i];
  					if (key in map && !inArray(key, keys)) {
  						keys.push(key);
  					}
  				}
  				keys.sort();
  				for (i = 0; i < keys.length; i++) {
  					key = keys[i];
  					val = map[key];
  					ret.push(dump.parse(key, "key") + ": " + dump.parse(val, undefined, stack));
  				}
  				dump.down();
  				return join("{", ret, "}");
  			},
  			node: function node(_node) {
  				var len,
  				    i,
  				    val,
  				    open = dump.HTML ? "&lt;" : "<",
  				    close = dump.HTML ? "&gt;" : ">",
  				    tag = _node.nodeName.toLowerCase(),
  				    ret = open + tag,
  				    attrs = _node.attributes;

  				if (attrs) {
  					for (i = 0, len = attrs.length; i < len; i++) {
  						val = attrs[i].nodeValue;

  						// IE6 includes all attributes in .attributes, even ones not explicitly
  						// set. Those have values like undefined, null, 0, false, "" or
  						// "inherit".
  						if (val && val !== "inherit") {
  							ret += " " + attrs[i].nodeName + "=" + dump.parse(val, "attribute");
  						}
  					}
  				}
  				ret += close;

  				// Show content of TextNode or CDATASection
  				if (_node.nodeType === 3 || _node.nodeType === 4) {
  					ret += _node.nodeValue;
  				}

  				return ret + open + "/" + tag + close;
  			},

  			// Function calls it internally, it's the arguments part of the function
  			functionArgs: function functionArgs(fn) {
  				var args,
  				    l = fn.length;

  				if (!l) {
  					return "";
  				}

  				args = new Array(l);
  				while (l--) {

  					// 97 is 'a'
  					args[l] = String.fromCharCode(97 + l);
  				}
  				return " " + args.join(", ") + " ";
  			},

  			// Object calls it internally, the key part of an item in a map
  			key: quote,

  			// Function calls it internally, it's the content of the function
  			functionCode: "[code]",

  			// Node calls it internally, it's a html attribute value
  			attribute: quote,
  			string: quote,
  			date: quote,
  			regexp: literal,
  			number: literal,
  			"boolean": literal,
  			symbol: function symbol(sym) {
  				return sym.toString();
  			}
  		},

  		// If true, entities are escaped ( <, >, \t, space and \n )
  		HTML: false,

  		// Indentation unit
  		indentChar: "  ",

  		// If true, items in a collection, are separated by a \n, else just a space.
  		multiline: true
  	};

  	return dump;
  })();

  var LISTENERS = Object.create(null);
  var SUPPORTED_EVENTS = ["runStart", "suiteStart", "testStart", "assertion", "testEnd", "suiteEnd", "runEnd"];

  /**
   * Emits an event with the specified data to all currently registered listeners.
   * Callbacks will fire in the order in which they are registered (FIFO). This
   * function is not exposed publicly; it is used by QUnit internals to emit
   * logging events.
   *
   * @private
   * @method emit
   * @param {String} eventName
   * @param {Object} data
   * @return {Void}
   */
  function emit(eventName, data) {
  	if (objectType(eventName) !== "string") {
  		throw new TypeError("eventName must be a string when emitting an event");
  	}

  	// Clone the callbacks in case one of them registers a new callback
  	var originalCallbacks = LISTENERS[eventName];
  	var callbacks = originalCallbacks ? [].concat(toConsumableArray(originalCallbacks)) : [];

  	for (var i = 0; i < callbacks.length; i++) {
  		callbacks[i](data);
  	}
  }

  /**
   * Registers a callback as a listener to the specified event.
   *
   * @public
   * @method on
   * @param {String} eventName
   * @param {Function} callback
   * @return {Void}
   */
  function on(eventName, callback) {
  	if (objectType(eventName) !== "string") {
  		throw new TypeError("eventName must be a string when registering a listener");
  	} else if (!inArray(eventName, SUPPORTED_EVENTS)) {
  		var events = SUPPORTED_EVENTS.join(", ");
  		throw new Error("\"" + eventName + "\" is not a valid event; must be one of: " + events + ".");
  	} else if (objectType(callback) !== "function") {
  		throw new TypeError("callback must be a function when registering a listener");
  	}

  	if (!LISTENERS[eventName]) {
  		LISTENERS[eventName] = [];
  	}

  	// Don't register the same callback more than once
  	if (!inArray(callback, LISTENERS[eventName])) {
  		LISTENERS[eventName].push(callback);
  	}
  }

  // Register logging callbacks
  function registerLoggingCallbacks(obj) {
  	var i,
  	    l,
  	    key,
  	    callbackNames = ["begin", "done", "log", "testStart", "testDone", "moduleStart", "moduleDone"];

  	function registerLoggingCallback(key) {
  		var loggingCallback = function loggingCallback(callback) {
  			if (objectType(callback) !== "function") {
  				throw new Error("QUnit logging methods require a callback function as their first parameters.");
  			}

  			config.callbacks[key].push(callback);
  		};

  		return loggingCallback;
  	}

  	for (i = 0, l = callbackNames.length; i < l; i++) {
  		key = callbackNames[i];

  		// Initialize key collection of logging callback
  		if (objectType(config.callbacks[key]) === "undefined") {
  			config.callbacks[key] = [];
  		}

  		obj[key] = registerLoggingCallback(key);
  	}
  }

  function runLoggingCallbacks(key, args) {
  	var i, l, callbacks;

  	callbacks = config.callbacks[key];
  	for (i = 0, l = callbacks.length; i < l; i++) {
  		callbacks[i](args);
  	}
  }

  // Doesn't support IE9, it will return undefined on these browsers
  // See also https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error/Stack
  var fileName = (sourceFromStacktrace(0) || "").replace(/(:\d+)+\)?/, "").replace(/.+\//, "");

  function extractStacktrace(e, offset) {
  	offset = offset === undefined ? 4 : offset;

  	var stack, include, i;

  	if (e && e.stack) {
  		stack = e.stack.split("\n");
  		if (/^error$/i.test(stack[0])) {
  			stack.shift();
  		}
  		if (fileName) {
  			include = [];
  			for (i = offset; i < stack.length; i++) {
  				if (stack[i].indexOf(fileName) !== -1) {
  					break;
  				}
  				include.push(stack[i]);
  			}
  			if (include.length) {
  				return include.join("\n");
  			}
  		}
  		return stack[offset];
  	}
  }

  function sourceFromStacktrace(offset) {
  	var error = new Error();

  	// Support: Safari <=7 only, IE <=10 - 11 only
  	// Not all browsers generate the `stack` property for `new Error()`, see also #636
  	if (!error.stack) {
  		try {
  			throw error;
  		} catch (err) {
  			error = err;
  		}
  	}

  	return extractStacktrace(error, offset);
  }

  var priorityCount = 0;
  var unitSampler = void 0;

  /**
   * Advances the ProcessingQueue to the next item if it is ready.
   * @param {Boolean} last
   */
  function advance() {
  	var start = now();
  	config.depth = (config.depth || 0) + 1;

  	while (config.queue.length && !config.blocking) {
  		var elapsedTime = now() - start;

  		if (!defined.setTimeout || config.updateRate <= 0 || elapsedTime < config.updateRate) {
  			if (priorityCount > 0) {
  				priorityCount--;
  			}

  			config.queue.shift()();
  		} else {
  			setTimeout(advance, 13);
  			break;
  		}
  	}

  	config.depth--;

  	if (!config.blocking && !config.queue.length && config.depth === 0) {
  		done();
  	}
  }

  function addToQueueImmediate(callback) {
  	if (objectType(callback) === "array") {
  		while (callback.length) {
  			addToQueueImmediate(callback.pop());
  		}

  		return;
  	}

  	config.queue.unshift(callback);
  	priorityCount++;
  }

  /**
   * Adds a function to the ProcessingQueue for execution.
   * @param {Function|Array} callback
   * @param {Boolean} priority
   * @param {String} seed
   */
  function addToQueue(callback, prioritize, seed) {
  	if (prioritize) {
  		config.queue.splice(priorityCount++, 0, callback);
  	} else if (seed) {
  		if (!unitSampler) {
  			unitSampler = unitSamplerGenerator(seed);
  		}

  		// Insert into a random position after all prioritized items
  		var index = Math.floor(unitSampler() * (config.queue.length - priorityCount + 1));
  		config.queue.splice(priorityCount + index, 0, callback);
  	} else {
  		config.queue.push(callback);
  	}
  }

  /**
   * Creates a seeded "sample" generator which is used for randomizing tests.
   */
  function unitSamplerGenerator(seed) {

  	// 32-bit xorshift, requires only a nonzero seed
  	// http://excamera.com/sphinx/article-xorshift.html
  	var sample = parseInt(generateHash(seed), 16) || -1;
  	return function () {
  		sample ^= sample << 13;
  		sample ^= sample >>> 17;
  		sample ^= sample << 5;

  		// ECMAScript has no unsigned number type
  		if (sample < 0) {
  			sample += 0x100000000;
  		}

  		return sample / 0x100000000;
  	};
  }

  /**
   * This function is called when the ProcessingQueue is done processing all
   * items. It handles emitting the final run events.
   */
  function done() {
  	var storage = config.storage;

  	ProcessingQueue.finished = true;

  	var runtime = now() - config.started;
  	var passed = config.stats.all - config.stats.bad;

  	emit("runEnd", globalSuite.end(true));
  	runLoggingCallbacks("done", {
  		passed: passed,
  		failed: config.stats.bad,
  		total: config.stats.all,
  		runtime: runtime
  	});

  	// Clear own storage items if all tests passed
  	if (storage && config.stats.bad === 0) {
  		for (var i = storage.length - 1; i >= 0; i--) {
  			var key = storage.key(i);

  			if (key.indexOf("qunit-test-") === 0) {
  				storage.removeItem(key);
  			}
  		}
  	}
  }

  var ProcessingQueue = {
  	finished: false,
  	add: addToQueue,
  	addImmediate: addToQueueImmediate,
  	advance: advance
  };

  var TestReport = function () {
  	function TestReport(name, suite, options) {
  		classCallCheck(this, TestReport);

  		this.name = name;
  		this.suiteName = suite.name;
  		this.fullName = suite.fullName.concat(name);
  		this.runtime = 0;
  		this.assertions = [];

  		this.skipped = !!options.skip;
  		this.todo = !!options.todo;

  		this.valid = options.valid;

  		this._startTime = 0;
  		this._endTime = 0;

  		suite.pushTest(this);
  	}

  	createClass(TestReport, [{
  		key: "start",
  		value: function start(recordTime) {
  			if (recordTime) {
  				this._startTime = Date.now();
  			}

  			return {
  				name: this.name,
  				suiteName: this.suiteName,
  				fullName: this.fullName.slice()
  			};
  		}
  	}, {
  		key: "end",
  		value: function end(recordTime) {
  			if (recordTime) {
  				this._endTime = Date.now();
  			}

  			return extend(this.start(), {
  				runtime: this.getRuntime(),
  				status: this.getStatus(),
  				errors: this.getFailedAssertions(),
  				assertions: this.getAssertions()
  			});
  		}
  	}, {
  		key: "pushAssertion",
  		value: function pushAssertion(assertion) {
  			this.assertions.push(assertion);
  		}
  	}, {
  		key: "getRuntime",
  		value: function getRuntime() {
  			return this._endTime - this._startTime;
  		}
  	}, {
  		key: "getStatus",
  		value: function getStatus() {
  			if (this.skipped) {
  				return "skipped";
  			}

  			var testPassed = this.getFailedAssertions().length > 0 ? this.todo : !this.todo;

  			if (!testPassed) {
  				return "failed";
  			} else if (this.todo) {
  				return "todo";
  			} else {
  				return "passed";
  			}
  		}
  	}, {
  		key: "getFailedAssertions",
  		value: function getFailedAssertions() {
  			return this.assertions.filter(function (assertion) {
  				return !assertion.passed;
  			});
  		}
  	}, {
  		key: "getAssertions",
  		value: function getAssertions() {
  			return this.assertions.slice();
  		}

  		// Remove actual and expected values from assertions. This is to prevent
  		// leaking memory throughout a test suite.

  	}, {
  		key: "slimAssertions",
  		value: function slimAssertions() {
  			this.assertions = this.assertions.map(function (assertion) {
  				delete assertion.actual;
  				delete assertion.expected;
  				return assertion;
  			});
  		}
  	}]);
  	return TestReport;
  }();

  var focused$1 = false;

  function Test(settings) {
  	var i, l;

  	++Test.count;

  	this.expected = null;
  	this.assertions = [];
  	this.semaphore = 0;
  	this.module = config.currentModule;
  	this.stack = sourceFromStacktrace(3);
  	this.steps = [];
  	this.timeout = undefined;

  	// If a module is skipped, all its tests and the tests of the child suites
  	// should be treated as skipped even if they are defined as `only` or `todo`.
  	// As for `todo` module, all its tests will be treated as `todo` except for
  	// tests defined as `skip` which will be left intact.
  	//
  	// So, if a test is defined as `todo` and is inside a skipped module, we should
  	// then treat that test as if was defined as `skip`.
  	if (this.module.skip) {
  		settings.skip = true;
  		settings.todo = false;

  		// Skipped tests should be left intact
  	} else if (this.module.todo && !settings.skip) {
  		settings.todo = true;
  	}

  	extend(this, settings);

  	this.testReport = new TestReport(settings.testName, this.module.suiteReport, {
  		todo: settings.todo,
  		skip: settings.skip,
  		valid: this.valid()
  	});

  	// Register unique strings
  	for (i = 0, l = this.module.tests; i < l.length; i++) {
  		if (this.module.tests[i].name === this.testName) {
  			this.testName += " ";
  		}
  	}

  	this.testId = generateHash(this.module.name, this.testName);

  	this.module.tests.push({
  		name: this.testName,
  		testId: this.testId,
  		skip: !!settings.skip
  	});

  	if (settings.skip) {

  		// Skipped tests will fully ignore any sent callback
  		this.callback = function () {};
  		this.async = false;
  		this.expected = 0;
  	} else {
  		this.assert = new Assert(this);
  	}
  }

  Test.count = 0;

  function getNotStartedModules(startModule) {
  	var module = startModule,
  	    modules = [];

  	while (module && module.testsRun === 0) {
  		modules.push(module);
  		module = module.parentModule;
  	}

  	return modules;
  }

  Test.prototype = {
  	before: function before() {
  		var i,
  		    startModule,
  		    module = this.module,
  		    notStartedModules = getNotStartedModules(module);

  		for (i = notStartedModules.length - 1; i >= 0; i--) {
  			startModule = notStartedModules[i];
  			startModule.stats = { all: 0, bad: 0, started: now() };
  			emit("suiteStart", startModule.suiteReport.start(true));
  			runLoggingCallbacks("moduleStart", {
  				name: startModule.name,
  				tests: startModule.tests
  			});
  		}

  		config.current = this;

  		this.testEnvironment = extend({}, module.testEnvironment);

  		this.started = now();
  		emit("testStart", this.testReport.start(true));
  		runLoggingCallbacks("testStart", {
  			name: this.testName,
  			module: module.name,
  			testId: this.testId,
  			previousFailure: this.previousFailure
  		});

  		if (!config.pollution) {
  			saveGlobal();
  		}
  	},

  	run: function run() {
  		var promise;

  		config.current = this;

  		this.callbackStarted = now();

  		if (config.notrycatch) {
  			runTest(this);
  			return;
  		}

  		try {
  			runTest(this);
  		} catch (e) {
  			this.pushFailure("Died on test #" + (this.assertions.length + 1) + " " + this.stack + ": " + (e.message || e), extractStacktrace(e, 0));

  			// Else next test will carry the responsibility
  			saveGlobal();

  			// Restart the tests if they're blocking
  			if (config.blocking) {
  				internalRecover(this);
  			}
  		}

  		function runTest(test) {
  			promise = test.callback.call(test.testEnvironment, test.assert);
  			test.resolvePromise(promise);

  			// If the test has a "lock" on it, but the timeout is 0, then we push a
  			// failure as the test should be synchronous.
  			if (test.timeout === 0 && test.semaphore !== 0) {
  				pushFailure("Test did not finish synchronously even though assert.timeout( 0 ) was used.", sourceFromStacktrace(2));
  			}
  		}
  	},

  	after: function after() {
  		checkPollution();
  	},

  	queueHook: function queueHook(hook, hookName, hookOwner) {
  		var _this = this;

  		var callHook = function callHook() {
  			var promise = hook.call(_this.testEnvironment, _this.assert);
  			_this.resolvePromise(promise, hookName);
  		};

  		var runHook = function runHook() {
  			if (hookName === "before") {
  				if (hookOwner.unskippedTestsRun !== 0) {
  					return;
  				}

  				_this.preserveEnvironment = true;
  			}

  			if (hookName === "after" && hookOwner.unskippedTestsRun !== numberOfUnskippedTests(hookOwner) - 1 && config.queue.length > 2) {
  				return;
  			}

  			config.current = _this;
  			if (config.notrycatch) {
  				callHook();
  				return;
  			}
  			try {
  				callHook();
  			} catch (error) {
  				_this.pushFailure(hookName + " failed on " + _this.testName + ": " + (error.message || error), extractStacktrace(error, 0));
  			}
  		};

  		return runHook;
  	},


  	// Currently only used for module level hooks, can be used to add global level ones
  	hooks: function hooks(handler) {
  		var hooks = [];

  		function processHooks(test, module) {
  			if (module.parentModule) {
  				processHooks(test, module.parentModule);
  			}

  			if (module.hooks[handler].length) {
  				for (var i = 0; i < module.hooks[handler].length; i++) {
  					hooks.push(test.queueHook(module.hooks[handler][i], handler, module));
  				}
  			}
  		}

  		// Hooks are ignored on skipped tests
  		if (!this.skip) {
  			processHooks(this, this.module);
  		}

  		return hooks;
  	},


  	finish: function finish() {
  		config.current = this;
  		if (config.requireExpects && this.expected === null) {
  			this.pushFailure("Expected number of assertions to be defined, but expect() was " + "not called.", this.stack);
  		} else if (this.expected !== null && this.expected !== this.assertions.length) {
  			this.pushFailure("Expected " + this.expected + " assertions, but " + this.assertions.length + " were run", this.stack);
  		} else if (this.expected === null && !this.assertions.length) {
  			this.pushFailure("Expected at least one assertion, but none were run - call " + "expect(0) to accept zero assertions.", this.stack);
  		}

  		var i,
  		    module = this.module,
  		    moduleName = module.name,
  		    testName = this.testName,
  		    skipped = !!this.skip,
  		    todo = !!this.todo,
  		    bad = 0,
  		    storage = config.storage;

  		this.runtime = now() - this.started;

  		config.stats.all += this.assertions.length;
  		module.stats.all += this.assertions.length;

  		for (i = 0; i < this.assertions.length; i++) {
  			if (!this.assertions[i].result) {
  				bad++;
  				config.stats.bad++;
  				module.stats.bad++;
  			}
  		}

  		notifyTestsRan(module, skipped);

  		// Store result when possible
  		if (storage) {
  			if (bad) {
  				storage.setItem("qunit-test-" + moduleName + "-" + testName, bad);
  			} else {
  				storage.removeItem("qunit-test-" + moduleName + "-" + testName);
  			}
  		}

  		// After emitting the js-reporters event we cleanup the assertion data to
  		// avoid leaking it. It is not used by the legacy testDone callbacks.
  		emit("testEnd", this.testReport.end(true));
  		this.testReport.slimAssertions();

  		runLoggingCallbacks("testDone", {
  			name: testName,
  			module: moduleName,
  			skipped: skipped,
  			todo: todo,
  			failed: bad,
  			passed: this.assertions.length - bad,
  			total: this.assertions.length,
  			runtime: skipped ? 0 : this.runtime,

  			// HTML Reporter use
  			assertions: this.assertions,
  			testId: this.testId,

  			// Source of Test
  			source: this.stack
  		});

  		if (module.testsRun === numberOfTests(module)) {
  			logSuiteEnd(module);

  			// Check if the parent modules, iteratively, are done. If that the case,
  			// we emit the `suiteEnd` event and trigger `moduleDone` callback.
  			var parent = module.parentModule;
  			while (parent && parent.testsRun === numberOfTests(parent)) {
  				logSuiteEnd(parent);
  				parent = parent.parentModule;
  			}
  		}

  		config.current = undefined;

  		function logSuiteEnd(module) {
  			emit("suiteEnd", module.suiteReport.end(true));
  			runLoggingCallbacks("moduleDone", {
  				name: module.name,
  				tests: module.tests,
  				failed: module.stats.bad,
  				passed: module.stats.all - module.stats.bad,
  				total: module.stats.all,
  				runtime: now() - module.stats.started
  			});
  		}
  	},

  	preserveTestEnvironment: function preserveTestEnvironment() {
  		if (this.preserveEnvironment) {
  			this.module.testEnvironment = this.testEnvironment;
  			this.testEnvironment = extend({}, this.module.testEnvironment);
  		}
  	},

  	queue: function queue() {
  		var test = this;

  		if (!this.valid()) {
  			return;
  		}

  		function runTest() {

  			// Each of these can by async
  			ProcessingQueue.addImmediate([function () {
  				test.before();
  			}, test.hooks("before"), function () {
  				test.preserveTestEnvironment();
  			}, test.hooks("beforeEach"), function () {
  				test.run();
  			}, test.hooks("afterEach").reverse(), test.hooks("after").reverse(), function () {
  				test.after();
  			}, function () {
  				test.finish();
  			}]);
  		}

  		var previousFailCount = config.storage && +config.storage.getItem("qunit-test-" + this.module.name + "-" + this.testName);

  		// Prioritize previously failed tests, detected from storage
  		var prioritize = config.reorder && !!previousFailCount;

  		this.previousFailure = !!previousFailCount;

  		ProcessingQueue.add(runTest, prioritize, config.seed);

  		// If the queue has already finished, we manually process the new test
  		if (ProcessingQueue.finished) {
  			ProcessingQueue.advance();
  		}
  	},


  	pushResult: function pushResult(resultInfo) {
  		if (this !== config.current) {
  			throw new Error("Assertion occured after test had finished.");
  		}

  		// Destructure of resultInfo = { result, actual, expected, message, negative }
  		var source,
  		    details = {
  			module: this.module.name,
  			name: this.testName,
  			result: resultInfo.result,
  			message: resultInfo.message,
  			actual: resultInfo.actual,
  			expected: resultInfo.expected,
  			testId: this.testId,
  			negative: resultInfo.negative || false,
  			runtime: now() - this.started,
  			todo: !!this.todo
  		};

  		if (!resultInfo.result) {
  			source = resultInfo.source || sourceFromStacktrace();

  			if (source) {
  				details.source = source;
  			}
  		}

  		this.logAssertion(details);

  		this.assertions.push({
  			result: !!resultInfo.result,
  			message: resultInfo.message
  		});
  	},

  	pushFailure: function pushFailure(message, source, actual) {
  		if (!(this instanceof Test)) {
  			throw new Error("pushFailure() assertion outside test context, was " + sourceFromStacktrace(2));
  		}

  		this.pushResult({
  			result: false,
  			message: message || "error",
  			actual: actual || null,
  			expected: null,
  			source: source
  		});
  	},

  	/**
    * Log assertion details using both the old QUnit.log interface and
    * QUnit.on( "assertion" ) interface.
    *
    * @private
    */
  	logAssertion: function logAssertion(details) {
  		runLoggingCallbacks("log", details);

  		var assertion = {
  			passed: details.result,
  			actual: details.actual,
  			expected: details.expected,
  			message: details.message,
  			stack: details.source,
  			todo: details.todo
  		};
  		this.testReport.pushAssertion(assertion);
  		emit("assertion", assertion);
  	},


  	resolvePromise: function resolvePromise(promise, phase) {
  		var then,
  		    resume,
  		    message,
  		    test = this;
  		if (promise != null) {
  			then = promise.then;
  			if (objectType(then) === "function") {
  				resume = internalStop(test);
  				then.call(promise, function () {
  					resume();
  				}, function (error) {
  					message = "Promise rejected " + (!phase ? "during" : phase.replace(/Each$/, "")) + " \"" + test.testName + "\": " + (error && error.message || error);
  					test.pushFailure(message, extractStacktrace(error, 0));

  					// Else next test will carry the responsibility
  					saveGlobal();

  					// Unblock
  					resume();
  				});
  			}
  		}
  	},

  	valid: function valid() {
  		var filter = config.filter,
  		    regexFilter = /^(!?)\/([\w\W]*)\/(i?$)/.exec(filter),
  		    module = config.module && config.module.toLowerCase(),
  		    fullName = this.module.name + ": " + this.testName;

  		function moduleChainNameMatch(testModule) {
  			var testModuleName = testModule.name ? testModule.name.toLowerCase() : null;
  			if (testModuleName === module) {
  				return true;
  			} else if (testModule.parentModule) {
  				return moduleChainNameMatch(testModule.parentModule);
  			} else {
  				return false;
  			}
  		}

  		function moduleChainIdMatch(testModule) {
  			return inArray(testModule.moduleId, config.moduleId) || testModule.parentModule && moduleChainIdMatch(testModule.parentModule);
  		}

  		// Internally-generated tests are always valid
  		if (this.callback && this.callback.validTest) {
  			return true;
  		}

  		if (config.moduleId && config.moduleId.length > 0 && !moduleChainIdMatch(this.module)) {

  			return false;
  		}

  		if (config.testId && config.testId.length > 0 && !inArray(this.testId, config.testId)) {

  			return false;
  		}

  		if (module && !moduleChainNameMatch(this.module)) {
  			return false;
  		}

  		if (!filter) {
  			return true;
  		}

  		return regexFilter ? this.regexFilter(!!regexFilter[1], regexFilter[2], regexFilter[3], fullName) : this.stringFilter(filter, fullName);
  	},

  	regexFilter: function regexFilter(exclude, pattern, flags, fullName) {
  		var regex = new RegExp(pattern, flags);
  		var match = regex.test(fullName);

  		return match !== exclude;
  	},

  	stringFilter: function stringFilter(filter, fullName) {
  		filter = filter.toLowerCase();
  		fullName = fullName.toLowerCase();

  		var include = filter.charAt(0) !== "!";
  		if (!include) {
  			filter = filter.slice(1);
  		}

  		// If the filter matches, we need to honour include
  		if (fullName.indexOf(filter) !== -1) {
  			return include;
  		}

  		// Otherwise, do the opposite
  		return !include;
  	}
  };

  function pushFailure() {
  	if (!config.current) {
  		throw new Error("pushFailure() assertion outside test context, in " + sourceFromStacktrace(2));
  	}

  	// Gets current test obj
  	var currentTest = config.current;

  	return currentTest.pushFailure.apply(currentTest, arguments);
  }

  function saveGlobal() {
  	config.pollution = [];

  	if (config.noglobals) {
  		for (var key in global$1) {
  			if (hasOwn.call(global$1, key)) {

  				// In Opera sometimes DOM element ids show up here, ignore them
  				if (/^qunit-test-output/.test(key)) {
  					continue;
  				}
  				config.pollution.push(key);
  			}
  		}
  	}
  }

  function checkPollution() {
  	var newGlobals,
  	    deletedGlobals,
  	    old = config.pollution;

  	saveGlobal();

  	newGlobals = diff(config.pollution, old);
  	if (newGlobals.length > 0) {
  		pushFailure("Introduced global variable(s): " + newGlobals.join(", "));
  	}

  	deletedGlobals = diff(old, config.pollution);
  	if (deletedGlobals.length > 0) {
  		pushFailure("Deleted global variable(s): " + deletedGlobals.join(", "));
  	}
  }

  // Will be exposed as QUnit.test
  function test(testName, callback) {
  	if (focused$1) {
  		return;
  	}

  	var newTest = new Test({
  		testName: testName,
  		callback: callback
  	});

  	newTest.queue();
  }

  function todo(testName, callback) {
  	if (focused$1) {
  		return;
  	}

  	var newTest = new Test({
  		testName: testName,
  		callback: callback,
  		todo: true
  	});

  	newTest.queue();
  }

  // Will be exposed as QUnit.skip
  function skip(testName) {
  	if (focused$1) {
  		return;
  	}

  	var test = new Test({
  		testName: testName,
  		skip: true
  	});

  	test.queue();
  }

  // Will be exposed as QUnit.only
  function only(testName, callback) {
  	if (focused$1) {
  		return;
  	}

  	config.queue.length = 0;
  	focused$1 = true;

  	var newTest = new Test({
  		testName: testName,
  		callback: callback
  	});

  	newTest.queue();
  }

  // Put a hold on processing and return a function that will release it.
  function internalStop(test) {
  	test.semaphore += 1;
  	config.blocking = true;

  	// Set a recovery timeout, if so configured.
  	if (defined.setTimeout) {
  		var timeoutDuration = void 0;

  		if (typeof test.timeout === "number") {
  			timeoutDuration = test.timeout;
  		} else if (typeof config.testTimeout === "number") {
  			timeoutDuration = config.testTimeout;
  		}

  		if (typeof timeoutDuration === "number" && timeoutDuration > 0) {
  			clearTimeout(config.timeout);
  			config.timeout = setTimeout(function () {
  				pushFailure("Test took longer than " + timeoutDuration + "ms; test timed out.", sourceFromStacktrace(2));
  				internalRecover(test);
  			}, timeoutDuration);
  		}
  	}

  	var released = false;
  	return function resume() {
  		if (released) {
  			return;
  		}

  		released = true;
  		test.semaphore -= 1;
  		internalStart(test);
  	};
  }

  // Forcefully release all processing holds.
  function internalRecover(test) {
  	test.semaphore = 0;
  	internalStart(test);
  }

  // Release a processing hold, scheduling a resumption attempt if no holds remain.
  function internalStart(test) {

  	// If semaphore is non-numeric, throw error
  	if (isNaN(test.semaphore)) {
  		test.semaphore = 0;

  		pushFailure("Invalid value on test.semaphore", sourceFromStacktrace(2));
  		return;
  	}

  	// Don't start until equal number of stop-calls
  	if (test.semaphore > 0) {
  		return;
  	}

  	// Throw an Error if start is called more often than stop
  	if (test.semaphore < 0) {
  		test.semaphore = 0;

  		pushFailure("Tried to restart test while already started (test's semaphore was 0 already)", sourceFromStacktrace(2));
  		return;
  	}

  	// Add a slight delay to allow more assertions etc.
  	if (defined.setTimeout) {
  		if (config.timeout) {
  			clearTimeout(config.timeout);
  		}
  		config.timeout = setTimeout(function () {
  			if (test.semaphore > 0) {
  				return;
  			}

  			if (config.timeout) {
  				clearTimeout(config.timeout);
  			}

  			begin();
  		}, 13);
  	} else {
  		begin();
  	}
  }

  function collectTests(module) {
  	var tests = [].concat(module.tests);
  	var modules = [].concat(toConsumableArray(module.childModules));

  	// Do a breadth-first traversal of the child modules
  	while (modules.length) {
  		var nextModule = modules.shift();
  		tests.push.apply(tests, nextModule.tests);
  		modules.push.apply(modules, toConsumableArray(nextModule.childModules));
  	}

  	return tests;
  }

  function numberOfTests(module) {
  	return collectTests(module).length;
  }

  function numberOfUnskippedTests(module) {
  	return collectTests(module).filter(function (test) {
  		return !test.skip;
  	}).length;
  }

  function notifyTestsRan(module, skipped) {
  	module.testsRun++;
  	if (!skipped) {
  		module.unskippedTestsRun++;
  	}
  	while (module = module.parentModule) {
  		module.testsRun++;
  		if (!skipped) {
  			module.unskippedTestsRun++;
  		}
  	}
  }

  /**
   * Returns a function that proxies to the given method name on the globals
   * console object. The proxy will also detect if the console doesn't exist and
   * will appropriately no-op. This allows support for IE9, which doesn't have a
   * console if the developer tools are not open.
   */
  function consoleProxy(method) {
  	return function () {
  		if (console) {
  			console[method].apply(console, arguments);
  		}
  	};
  }

  var Logger = {
  	warn: consoleProxy("warn")
  };

  var Assert = function () {
  	function Assert(testContext) {
  		classCallCheck(this, Assert);

  		this.test = testContext;
  	}

  	// Assert helpers

  	createClass(Assert, [{
  		key: "timeout",
  		value: function timeout(duration) {
  			if (typeof duration !== "number") {
  				throw new Error("You must pass a number as the duration to assert.timeout");
  			}

  			this.test.timeout = duration;
  		}

  		// Documents a "step", which is a string value, in a test as a passing assertion

  	}, {
  		key: "step",
  		value: function step(message) {
  			var result = !!message;

  			this.test.steps.push(message);

  			return this.pushResult({
  				result: result,
  				message: message || "You must provide a message to assert.step"
  			});
  		}

  		// Verifies the steps in a test match a given array of string values

  	}, {
  		key: "verifySteps",
  		value: function verifySteps(steps, message) {
  			this.deepEqual(this.test.steps, steps, message);
  		}

  		// Specify the number of expected assertions to guarantee that failed test
  		// (no assertions are run at all) don't slip through.

  	}, {
  		key: "expect",
  		value: function expect(asserts) {
  			if (arguments.length === 1) {
  				this.test.expected = asserts;
  			} else {
  				return this.test.expected;
  			}
  		}

  		// Put a hold on processing and return a function that will release it a maximum of once.

  	}, {
  		key: "async",
  		value: function async(count) {
  			var test$$1 = this.test;

  			var popped = false,
  			    acceptCallCount = count;

  			if (typeof acceptCallCount === "undefined") {
  				acceptCallCount = 1;
  			}

  			var resume = internalStop(test$$1);

  			return function done() {
  				if (config.current !== test$$1) {
  					throw Error("assert.async callback called after test finished.");
  				}

  				if (popped) {
  					test$$1.pushFailure("Too many calls to the `assert.async` callback", sourceFromStacktrace(2));
  					return;
  				}

  				acceptCallCount -= 1;
  				if (acceptCallCount > 0) {
  					return;
  				}

  				popped = true;
  				resume();
  			};
  		}

  		// Exports test.push() to the user API
  		// Alias of pushResult.

  	}, {
  		key: "push",
  		value: function push(result, actual, expected, message, negative) {
  			Logger.warn("assert.push is deprecated and will be removed in QUnit 3.0." + " Please use assert.pushResult instead (https://api.qunitjs.com/assert/pushResult).");

  			var currentAssert = this instanceof Assert ? this : config.current.assert;
  			return currentAssert.pushResult({
  				result: result,
  				actual: actual,
  				expected: expected,
  				message: message,
  				negative: negative
  			});
  		}
  	}, {
  		key: "pushResult",
  		value: function pushResult(resultInfo) {

  			// Destructure of resultInfo = { result, actual, expected, message, negative }
  			var assert = this;
  			var currentTest = assert instanceof Assert && assert.test || config.current;

  			// Backwards compatibility fix.
  			// Allows the direct use of global exported assertions and QUnit.assert.*
  			// Although, it's use is not recommended as it can leak assertions
  			// to other tests from async tests, because we only get a reference to the current test,
  			// not exactly the test where assertion were intended to be called.
  			if (!currentTest) {
  				throw new Error("assertion outside test context, in " + sourceFromStacktrace(2));
  			}

  			if (!(assert instanceof Assert)) {
  				assert = currentTest.assert;
  			}

  			return assert.test.pushResult(resultInfo);
  		}
  	}, {
  		key: "ok",
  		value: function ok(result, message) {
  			if (!message) {
  				message = result ? "okay" : "failed, expected argument to be truthy, was: " + dump.parse(result);
  			}

  			this.pushResult({
  				result: !!result,
  				actual: result,
  				expected: true,
  				message: message
  			});
  		}
  	}, {
  		key: "notOk",
  		value: function notOk(result, message) {
  			if (!message) {
  				message = !result ? "okay" : "failed, expected argument to be falsy, was: " + dump.parse(result);
  			}

  			this.pushResult({
  				result: !result,
  				actual: result,
  				expected: false,
  				message: message
  			});
  		}
  	}, {
  		key: "equal",
  		value: function equal(actual, expected, message) {

  			// eslint-disable-next-line eqeqeq
  			var result = expected == actual;

  			this.pushResult({
  				result: result,
  				actual: actual,
  				expected: expected,
  				message: message
  			});
  		}
  	}, {
  		key: "notEqual",
  		value: function notEqual(actual, expected, message) {

  			// eslint-disable-next-line eqeqeq
  			var result = expected != actual;

  			this.pushResult({
  				result: result,
  				actual: actual,
  				expected: expected,
  				message: message,
  				negative: true
  			});
  		}
  	}, {
  		key: "propEqual",
  		value: function propEqual(actual, expected, message) {
  			actual = objectValues(actual);
  			expected = objectValues(expected);

  			this.pushResult({
  				result: equiv(actual, expected),
  				actual: actual,
  				expected: expected,
  				message: message
  			});
  		}
  	}, {
  		key: "notPropEqual",
  		value: function notPropEqual(actual, expected, message) {
  			actual = objectValues(actual);
  			expected = objectValues(expected);

  			this.pushResult({
  				result: !equiv(actual, expected),
  				actual: actual,
  				expected: expected,
  				message: message,
  				negative: true
  			});
  		}
  	}, {
  		key: "deepEqual",
  		value: function deepEqual(actual, expected, message) {
  			this.pushResult({
  				result: equiv(actual, expected),
  				actual: actual,
  				expected: expected,
  				message: message
  			});
  		}
  	}, {
  		key: "notDeepEqual",
  		value: function notDeepEqual(actual, expected, message) {
  			this.pushResult({
  				result: !equiv(actual, expected),
  				actual: actual,
  				expected: expected,
  				message: message,
  				negative: true
  			});
  		}
  	}, {
  		key: "strictEqual",
  		value: function strictEqual(actual, expected, message) {
  			this.pushResult({
  				result: expected === actual,
  				actual: actual,
  				expected: expected,
  				message: message
  			});
  		}
  	}, {
  		key: "notStrictEqual",
  		value: function notStrictEqual(actual, expected, message) {
  			this.pushResult({
  				result: expected !== actual,
  				actual: actual,
  				expected: expected,
  				message: message,
  				negative: true
  			});
  		}
  	}, {
  		key: "throws",
  		value: function throws(block, expected, message) {
  			var actual = void 0,
  			    result = false;

  			var currentTest = this instanceof Assert && this.test || config.current;

  			// 'expected' is optional unless doing string comparison
  			if (objectType(expected) === "string") {
  				if (message == null) {
  					message = expected;
  					expected = null;
  				} else {
  					throw new Error("throws/raises does not accept a string value for the expected argument.\n" + "Use a non-string object value (e.g. regExp) instead if it's necessary.");
  				}
  			}

  			currentTest.ignoreGlobalErrors = true;
  			try {
  				block.call(currentTest.testEnvironment);
  			} catch (e) {
  				actual = e;
  			}
  			currentTest.ignoreGlobalErrors = false;

  			if (actual) {
  				var expectedType = objectType(expected);

  				// We don't want to validate thrown error
  				if (!expected) {
  					result = true;
  					expected = null;

  					// Expected is a regexp
  				} else if (expectedType === "regexp") {
  					result = expected.test(errorString(actual));

  					// Expected is a constructor, maybe an Error constructor
  				} else if (expectedType === "function" && actual instanceof expected) {
  					result = true;

  					// Expected is an Error object
  				} else if (expectedType === "object") {
  					result = actual instanceof expected.constructor && actual.name === expected.name && actual.message === expected.message;

  					// Expected is a validation function which returns true if validation passed
  				} else if (expectedType === "function" && expected.call({}, actual) === true) {
  					expected = null;
  					result = true;
  				}
  			}

  			currentTest.assert.pushResult({
  				result: result,
  				actual: actual,
  				expected: expected,
  				message: message
  			});
  		}
  	}]);
  	return Assert;
  }();

  // Provide an alternative to assert.throws(), for environments that consider throws a reserved word
  // Known to us are: Closure Compiler, Narwhal
  // eslint-disable-next-line dot-notation


  Assert.prototype.raises = Assert.prototype["throws"];

  /**
   * Converts an error into a simple string for comparisons.
   *
   * @param {Error} error
   * @return {String}
   */
  function errorString(error) {
  	var resultErrorString = error.toString();

  	if (resultErrorString.substring(0, 7) === "[object") {
  		var name = error.name ? error.name.toString() : "Error";
  		var message = error.message ? error.message.toString() : "";

  		if (name && message) {
  			return name + ": " + message;
  		} else if (name) {
  			return name;
  		} else if (message) {
  			return message;
  		} else {
  			return "Error";
  		}
  	} else {
  		return resultErrorString;
  	}
  }

  /* global module, exports, define */
  function exportQUnit(QUnit) {

  	if (defined.document) {

  		// QUnit may be defined when it is preconfigured but then only QUnit and QUnit.config may be defined.
  		if (window.QUnit && window.QUnit.version) {
  			throw new Error("QUnit has already been defined.");
  		}

  		window.QUnit = QUnit;
  	}

  	// For nodejs
  	if (typeof module !== "undefined" && module && module.exports) {
  		module.exports = QUnit;

  		// For consistency with CommonJS environments' exports
  		module.exports.QUnit = QUnit;
  	}

  	// For CommonJS with exports, but without module.exports, like Rhino
  	if (typeof exports !== "undefined" && exports) {
  		exports.QUnit = QUnit;
  	}

  	if (typeof define === "function" && define.amd) {
  		define(function () {
  			return QUnit;
  		});
  		QUnit.config.autostart = false;
  	}

  	// For Web/Service Workers
  	if (self$1 && self$1.WorkerGlobalScope && self$1 instanceof self$1.WorkerGlobalScope) {
  		self$1.QUnit = QUnit;
  	}
  }

  var SuiteReport = function () {
  	function SuiteReport(name, parentSuite) {
  		classCallCheck(this, SuiteReport);

  		this.name = name;
  		this.fullName = parentSuite ? parentSuite.fullName.concat(name) : [];

  		this.tests = [];
  		this.childSuites = [];

  		if (parentSuite) {
  			parentSuite.pushChildSuite(this);
  		}
  	}

  	createClass(SuiteReport, [{
  		key: "start",
  		value: function start(recordTime) {
  			if (recordTime) {
  				this._startTime = Date.now();
  			}

  			return {
  				name: this.name,
  				fullName: this.fullName.slice(),
  				tests: this.tests.map(function (test) {
  					return test.start();
  				}),
  				childSuites: this.childSuites.map(function (suite) {
  					return suite.start();
  				}),
  				testCounts: {
  					total: this.getTestCounts().total
  				}
  			};
  		}
  	}, {
  		key: "end",
  		value: function end(recordTime) {
  			if (recordTime) {
  				this._endTime = Date.now();
  			}

  			return {
  				name: this.name,
  				fullName: this.fullName.slice(),
  				tests: this.tests.map(function (test) {
  					return test.end();
  				}),
  				childSuites: this.childSuites.map(function (suite) {
  					return suite.end();
  				}),
  				testCounts: this.getTestCounts(),
  				runtime: this.getRuntime(),
  				status: this.getStatus()
  			};
  		}
  	}, {
  		key: "pushChildSuite",
  		value: function pushChildSuite(suite) {
  			this.childSuites.push(suite);
  		}
  	}, {
  		key: "pushTest",
  		value: function pushTest(test) {
  			this.tests.push(test);
  		}
  	}, {
  		key: "getRuntime",
  		value: function getRuntime() {
  			return this._endTime - this._startTime;
  		}
  	}, {
  		key: "getTestCounts",
  		value: function getTestCounts() {
  			var counts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { passed: 0, failed: 0, skipped: 0, todo: 0, total: 0 };

  			counts = this.tests.reduce(function (counts, test) {
  				if (test.valid) {
  					counts[test.getStatus()]++;
  					counts.total++;
  				}

  				return counts;
  			}, counts);

  			return this.childSuites.reduce(function (counts, suite) {
  				return suite.getTestCounts(counts);
  			}, counts);
  		}
  	}, {
  		key: "getStatus",
  		value: function getStatus() {
  			var _getTestCounts = this.getTestCounts(),
  			    total = _getTestCounts.total,
  			    failed = _getTestCounts.failed,
  			    skipped = _getTestCounts.skipped,
  			    todo = _getTestCounts.todo;

  			if (failed) {
  				return "failed";
  			} else {
  				if (skipped === total) {
  					return "skipped";
  				} else if (todo === total) {
  					return "todo";
  				} else {
  					return "passed";
  				}
  			}
  		}
  	}]);
  	return SuiteReport;
  }();

  // Handle an unhandled exception. By convention, returns true if further
  // error handling should be suppressed and false otherwise.
  // In this case, we will only suppress further error handling if the
  // "ignoreGlobalErrors" configuration option is enabled.
  function onError(error) {
  	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
  		args[_key - 1] = arguments[_key];
  	}

  	if (config.current) {
  		if (config.current.ignoreGlobalErrors) {
  			return true;
  		}
  		pushFailure.apply(undefined, [error.message, error.fileName + ":" + error.lineNumber].concat(args));
  	} else {
  		test("global failure", extend(function () {
  			pushFailure.apply(undefined, [error.message, error.fileName + ":" + error.lineNumber].concat(args));
  		}, { validTest: true }));
  	}

  	return false;
  }

  var focused = false;
  var QUnit = {};
  var globalSuite = new SuiteReport();

  // The initial "currentModule" represents the global (or top-level) module that
  // is not explicitly defined by the user, therefore we add the "globalSuite" to
  // it since each module has a suiteReport associated with it.
  config.currentModule.suiteReport = globalSuite;

  var moduleStack = [];
  var globalStartCalled = false;
  var runStarted = false;

  // Figure out if we're running the tests from a server or not
  QUnit.isLocal = !(defined.document && window.location.protocol !== "file:");

  // Expose the current QUnit version
  QUnit.version = "2.4.0";

  function createModule(name, testEnvironment, modifiers) {
  	var parentModule = moduleStack.length ? moduleStack.slice(-1)[0] : null;
  	var moduleName = parentModule !== null ? [parentModule.name, name].join(" > ") : name;
  	var parentSuite = parentModule ? parentModule.suiteReport : globalSuite;

  	var skip$$1 = parentModule !== null && parentModule.skip || modifiers.skip;
  	var todo$$1 = parentModule !== null && parentModule.todo || modifiers.todo;

  	var module = {
  		name: moduleName,
  		parentModule: parentModule,
  		tests: [],
  		moduleId: generateHash(moduleName),
  		testsRun: 0,
  		unskippedTestsRun: 0,
  		childModules: [],
  		suiteReport: new SuiteReport(name, parentSuite),

  		// Pass along `skip` and `todo` properties from parent module, in case
  		// there is one, to childs. And use own otherwise.
  		// This property will be used to mark own tests and tests of child suites
  		// as either `skipped` or `todo`.
  		skip: skip$$1,
  		todo: skip$$1 ? false : todo$$1
  	};

  	var env = {};
  	if (parentModule) {
  		parentModule.childModules.push(module);
  		extend(env, parentModule.testEnvironment);
  	}
  	extend(env, testEnvironment);
  	module.testEnvironment = env;

  	config.modules.push(module);
  	return module;
  }

  function processModule(name, options, executeNow) {
  	var modifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  	var module = createModule(name, options, modifiers);

  	// Move any hooks to a 'hooks' object
  	var testEnvironment = module.testEnvironment;
  	var hooks = module.hooks = {};

  	setHookFromEnvironment(hooks, testEnvironment, "before");
  	setHookFromEnvironment(hooks, testEnvironment, "beforeEach");
  	setHookFromEnvironment(hooks, testEnvironment, "afterEach");
  	setHookFromEnvironment(hooks, testEnvironment, "after");

  	function setHookFromEnvironment(hooks, environment, name) {
  		var potentialHook = environment[name];
  		hooks[name] = typeof potentialHook === "function" ? [potentialHook] : [];
  		delete environment[name];
  	}

  	var moduleFns = {
  		before: setHookFunction(module, "before"),
  		beforeEach: setHookFunction(module, "beforeEach"),
  		afterEach: setHookFunction(module, "afterEach"),
  		after: setHookFunction(module, "after")
  	};

  	var currentModule = config.currentModule;
  	if (objectType(executeNow) === "function") {
  		moduleStack.push(module);
  		config.currentModule = module;
  		executeNow.call(module.testEnvironment, moduleFns);
  		moduleStack.pop();
  		module = module.parentModule || currentModule;
  	}

  	config.currentModule = module;
  }

  // TODO: extract this to a new file alongside its related functions
  function module$1(name, options, executeNow) {
  	if (focused) {
  		return;
  	}

  	if (arguments.length === 2) {
  		if (objectType(options) === "function") {
  			executeNow = options;
  			options = undefined;
  		}
  	}

  	processModule(name, options, executeNow);
  }

  module$1.only = function () {
  	if (focused) {
  		return;
  	}

  	config.modules.length = 0;
  	config.queue.length = 0;

  	module$1.apply(undefined, arguments);

  	focused = true;
  };

  module$1.skip = function (name, options, executeNow) {
  	if (focused) {
  		return;
  	}

  	if (arguments.length === 2) {
  		if (objectType(options) === "function") {
  			executeNow = options;
  			options = undefined;
  		}
  	}

  	processModule(name, options, executeNow, { skip: true });
  };

  module$1.todo = function (name, options, executeNow) {
  	if (focused) {
  		return;
  	}

  	if (arguments.length === 2) {
  		if (objectType(options) === "function") {
  			executeNow = options;
  			options = undefined;
  		}
  	}

  	processModule(name, options, executeNow, { todo: true });
  };

  extend(QUnit, {
  	on: on,

  	module: module$1,

  	test: test,

  	todo: todo,

  	skip: skip,

  	only: only,

  	start: function start(count) {
  		var globalStartAlreadyCalled = globalStartCalled;

  		if (!config.current) {
  			globalStartCalled = true;

  			if (runStarted) {
  				throw new Error("Called start() while test already started running");
  			} else if (globalStartAlreadyCalled || count > 1) {
  				throw new Error("Called start() outside of a test context too many times");
  			} else if (config.autostart) {
  				throw new Error("Called start() outside of a test context when " + "QUnit.config.autostart was true");
  			} else if (!config.pageLoaded) {

  				// The page isn't completely loaded yet, so we set autostart and then
  				// load if we're in Node or wait for the browser's load event.
  				config.autostart = true;

  				// Starts from Node even if .load was not previously called. We still return
  				// early otherwise we'll wind up "beginning" twice.
  				if (!defined.document) {
  					QUnit.load();
  				}

  				return;
  			}
  		} else {
  			throw new Error("QUnit.start cannot be called inside a test context.");
  		}

  		scheduleBegin();
  	},

  	config: config,

  	is: is,

  	objectType: objectType,

  	extend: extend,

  	load: function load() {
  		config.pageLoaded = true;

  		// Initialize the configuration options
  		extend(config, {
  			stats: { all: 0, bad: 0 },
  			started: 0,
  			updateRate: 1000,
  			autostart: true,
  			filter: ""
  		}, true);

  		if (!runStarted) {
  			config.blocking = false;

  			if (config.autostart) {
  				scheduleBegin();
  			}
  		}
  	},

  	stack: function stack(offset) {
  		offset = (offset || 0) + 2;
  		return sourceFromStacktrace(offset);
  	},

  	onError: onError
  });

  QUnit.pushFailure = pushFailure;
  QUnit.assert = Assert.prototype;
  QUnit.equiv = equiv;
  QUnit.dump = dump;

  registerLoggingCallbacks(QUnit);

  function scheduleBegin() {

  	runStarted = true;

  	// Add a slight delay to allow definition of more modules and tests.
  	if (defined.setTimeout) {
  		setTimeout(function () {
  			begin();
  		}, 13);
  	} else {
  		begin();
  	}
  }

  function begin() {
  	var i,
  	    l,
  	    modulesLog = [];

  	// If the test run hasn't officially begun yet
  	if (!config.started) {

  		// Record the time of the test run's beginning
  		config.started = now();

  		// Delete the loose unnamed module if unused.
  		if (config.modules[0].name === "" && config.modules[0].tests.length === 0) {
  			config.modules.shift();
  		}

  		// Avoid unnecessary information by not logging modules' test environments
  		for (i = 0, l = config.modules.length; i < l; i++) {
  			modulesLog.push({
  				name: config.modules[i].name,
  				tests: config.modules[i].tests
  			});
  		}

  		// The test run is officially beginning now
  		emit("runStart", globalSuite.start(true));
  		runLoggingCallbacks("begin", {
  			totalTests: Test.count,
  			modules: modulesLog
  		});
  	}

  	config.blocking = false;
  	ProcessingQueue.advance();
  }

  function setHookFunction(module, hookName) {
  	return function setHook(callback) {
  		module.hooks[hookName].push(callback);
  	};
  }

  exportQUnit(QUnit);

  (function () {

  	if (typeof window === "undefined" || typeof document === "undefined") {
  		return;
  	}

  	var config = QUnit.config,
  	    hasOwn = Object.prototype.hasOwnProperty;

  	// Stores fixture HTML for resetting later
  	function storeFixture() {

  		// Avoid overwriting user-defined values
  		if (hasOwn.call(config, "fixture")) {
  			return;
  		}

  		var fixture = document.getElementById("qunit-fixture");
  		if (fixture) {
  			config.fixture = fixture.innerHTML;
  		}
  	}

  	QUnit.begin(storeFixture);

  	// Resets the fixture DOM element if available.
  	function resetFixture() {
  		if (config.fixture == null) {
  			return;
  		}

  		var fixture = document.getElementById("qunit-fixture");
  		if (fixture) {
  			fixture.innerHTML = config.fixture;
  		}
  	}

  	QUnit.testStart(resetFixture);
  })();

  (function () {

  	// Only interact with URLs via window.location
  	var location = typeof window !== "undefined" && window.location;
  	if (!location) {
  		return;
  	}

  	var urlParams = getUrlParams();

  	QUnit.urlParams = urlParams;

  	// Match module/test by inclusion in an array
  	QUnit.config.moduleId = [].concat(urlParams.moduleId || []);
  	QUnit.config.testId = [].concat(urlParams.testId || []);

  	// Exact case-insensitive match of the module name
  	QUnit.config.module = urlParams.module;

  	// Regular expression or case-insenstive substring match against "moduleName: testName"
  	QUnit.config.filter = urlParams.filter;

  	// Test order randomization
  	if (urlParams.seed === true) {

  		// Generate a random seed if the option is specified without a value
  		QUnit.config.seed = Math.random().toString(36).slice(2);
  	} else if (urlParams.seed) {
  		QUnit.config.seed = urlParams.seed;
  	}

  	// Add URL-parameter-mapped config values with UI form rendering data
  	QUnit.config.urlConfig.push({
  		id: "hidepassed",
  		label: "Hide passed tests",
  		tooltip: "Only show tests and assertions that fail. Stored as query-strings."
  	}, {
  		id: "noglobals",
  		label: "Check for Globals",
  		tooltip: "Enabling this will test if any test introduces new properties on the " + "global object (`window` in Browsers). Stored as query-strings."
  	}, {
  		id: "notrycatch",
  		label: "No try-catch",
  		tooltip: "Enabling this will run tests outside of a try-catch block. Makes debugging " + "exceptions in IE reasonable. Stored as query-strings."
  	});

  	QUnit.begin(function () {
  		var i,
  		    option,
  		    urlConfig = QUnit.config.urlConfig;

  		for (i = 0; i < urlConfig.length; i++) {

  			// Options can be either strings or objects with nonempty "id" properties
  			option = QUnit.config.urlConfig[i];
  			if (typeof option !== "string") {
  				option = option.id;
  			}

  			if (QUnit.config[option] === undefined) {
  				QUnit.config[option] = urlParams[option];
  			}
  		}
  	});

  	function getUrlParams() {
  		var i, param, name, value;
  		var urlParams = Object.create(null);
  		var params = location.search.slice(1).split("&");
  		var length = params.length;

  		for (i = 0; i < length; i++) {
  			if (params[i]) {
  				param = params[i].split("=");
  				name = decodeQueryParam(param[0]);

  				// Allow just a key to turn on a flag, e.g., test.html?noglobals
  				value = param.length === 1 || decodeQueryParam(param.slice(1).join("="));
  				if (name in urlParams) {
  					urlParams[name] = [].concat(urlParams[name], value);
  				} else {
  					urlParams[name] = value;
  				}
  			}
  		}

  		return urlParams;
  	}

  	function decodeQueryParam(param) {
  		return decodeURIComponent(param.replace(/\+/g, "%20"));
  	}
  })();

  var stats = {
  	passedTests: 0,
  	failedTests: 0,
  	skippedTests: 0,
  	todoTests: 0
  };

  // Escape text for attribute or text content.
  function escapeText(s) {
  	if (!s) {
  		return "";
  	}
  	s = s + "";

  	// Both single quotes and double quotes (for attributes)
  	return s.replace(/['"<>&]/g, function (s) {
  		switch (s) {
  			case "'":
  				return "&#039;";
  			case "\"":
  				return "&quot;";
  			case "<":
  				return "&lt;";
  			case ">":
  				return "&gt;";
  			case "&":
  				return "&amp;";
  		}
  	});
  }

  (function () {

  	// Don't load the HTML Reporter on non-browser environments
  	if (typeof window === "undefined" || !window.document) {
  		return;
  	}

  	var config = QUnit.config,
  	    document$$1 = window.document,
  	    collapseNext = false,
  	    hasOwn = Object.prototype.hasOwnProperty,
  	    unfilteredUrl = setUrl({ filter: undefined, module: undefined,
  		moduleId: undefined, testId: undefined }),
  	    modulesList = [];

  	function addEvent(elem, type, fn) {
  		elem.addEventListener(type, fn, false);
  	}

  	function removeEvent(elem, type, fn) {
  		elem.removeEventListener(type, fn, false);
  	}

  	function addEvents(elems, type, fn) {
  		var i = elems.length;
  		while (i--) {
  			addEvent(elems[i], type, fn);
  		}
  	}

  	function hasClass(elem, name) {
  		return (" " + elem.className + " ").indexOf(" " + name + " ") >= 0;
  	}

  	function addClass(elem, name) {
  		if (!hasClass(elem, name)) {
  			elem.className += (elem.className ? " " : "") + name;
  		}
  	}

  	function toggleClass(elem, name, force) {
  		if (force || typeof force === "undefined" && !hasClass(elem, name)) {
  			addClass(elem, name);
  		} else {
  			removeClass(elem, name);
  		}
  	}

  	function removeClass(elem, name) {
  		var set = " " + elem.className + " ";

  		// Class name may appear multiple times
  		while (set.indexOf(" " + name + " ") >= 0) {
  			set = set.replace(" " + name + " ", " ");
  		}

  		// Trim for prettiness
  		elem.className = typeof set.trim === "function" ? set.trim() : set.replace(/^\s+|\s+$/g, "");
  	}

  	function id(name) {
  		return document$$1.getElementById && document$$1.getElementById(name);
  	}

  	function abortTests() {
  		var abortButton = id("qunit-abort-tests-button");
  		if (abortButton) {
  			abortButton.disabled = true;
  			abortButton.innerHTML = "Aborting...";
  		}
  		QUnit.config.queue.length = 0;
  		return false;
  	}

  	function interceptNavigation(ev) {
  		applyUrlParams();

  		if (ev && ev.preventDefault) {
  			ev.preventDefault();
  		}

  		return false;
  	}

  	function getUrlConfigHtml() {
  		var i,
  		    j,
  		    val,
  		    escaped,
  		    escapedTooltip,
  		    selection = false,
  		    urlConfig = config.urlConfig,
  		    urlConfigHtml = "";

  		for (i = 0; i < urlConfig.length; i++) {

  			// Options can be either strings or objects with nonempty "id" properties
  			val = config.urlConfig[i];
  			if (typeof val === "string") {
  				val = {
  					id: val,
  					label: val
  				};
  			}

  			escaped = escapeText(val.id);
  			escapedTooltip = escapeText(val.tooltip);

  			if (!val.value || typeof val.value === "string") {
  				urlConfigHtml += "<label for='qunit-urlconfig-" + escaped + "' title='" + escapedTooltip + "'><input id='qunit-urlconfig-" + escaped + "' name='" + escaped + "' type='checkbox'" + (val.value ? " value='" + escapeText(val.value) + "'" : "") + (config[val.id] ? " checked='checked'" : "") + " title='" + escapedTooltip + "' />" + escapeText(val.label) + "</label>";
  			} else {
  				urlConfigHtml += "<label for='qunit-urlconfig-" + escaped + "' title='" + escapedTooltip + "'>" + val.label + ": </label><select id='qunit-urlconfig-" + escaped + "' name='" + escaped + "' title='" + escapedTooltip + "'><option></option>";

  				if (QUnit.is("array", val.value)) {
  					for (j = 0; j < val.value.length; j++) {
  						escaped = escapeText(val.value[j]);
  						urlConfigHtml += "<option value='" + escaped + "'" + (config[val.id] === val.value[j] ? (selection = true) && " selected='selected'" : "") + ">" + escaped + "</option>";
  					}
  				} else {
  					for (j in val.value) {
  						if (hasOwn.call(val.value, j)) {
  							urlConfigHtml += "<option value='" + escapeText(j) + "'" + (config[val.id] === j ? (selection = true) && " selected='selected'" : "") + ">" + escapeText(val.value[j]) + "</option>";
  						}
  					}
  				}
  				if (config[val.id] && !selection) {
  					escaped = escapeText(config[val.id]);
  					urlConfigHtml += "<option value='" + escaped + "' selected='selected' disabled='disabled'>" + escaped + "</option>";
  				}
  				urlConfigHtml += "</select>";
  			}
  		}

  		return urlConfigHtml;
  	}

  	// Handle "click" events on toolbar checkboxes and "change" for select menus.
  	// Updates the URL with the new state of `config.urlConfig` values.
  	function toolbarChanged() {
  		var updatedUrl,
  		    value,
  		    tests,
  		    field = this,
  		    params = {};

  		// Detect if field is a select menu or a checkbox
  		if ("selectedIndex" in field) {
  			value = field.options[field.selectedIndex].value || undefined;
  		} else {
  			value = field.checked ? field.defaultValue || true : undefined;
  		}

  		params[field.name] = value;
  		updatedUrl = setUrl(params);

  		// Check if we can apply the change without a page refresh
  		if ("hidepassed" === field.name && "replaceState" in window.history) {
  			QUnit.urlParams[field.name] = value;
  			config[field.name] = value || false;
  			tests = id("qunit-tests");
  			if (tests) {
  				toggleClass(tests, "hidepass", value || false);
  			}
  			window.history.replaceState(null, "", updatedUrl);
  		} else {
  			window.location = updatedUrl;
  		}
  	}

  	function setUrl(params) {
  		var key,
  		    arrValue,
  		    i,
  		    querystring = "?",
  		    location = window.location;

  		params = QUnit.extend(QUnit.extend({}, QUnit.urlParams), params);

  		for (key in params) {

  			// Skip inherited or undefined properties
  			if (hasOwn.call(params, key) && params[key] !== undefined) {

  				// Output a parameter for each value of this key (but usually just one)
  				arrValue = [].concat(params[key]);
  				for (i = 0; i < arrValue.length; i++) {
  					querystring += encodeURIComponent(key);
  					if (arrValue[i] !== true) {
  						querystring += "=" + encodeURIComponent(arrValue[i]);
  					}
  					querystring += "&";
  				}
  			}
  		}
  		return location.protocol + "//" + location.host + location.pathname + querystring.slice(0, -1);
  	}

  	function applyUrlParams() {
  		var i,
  		    selectedModules = [],
  		    modulesList = id("qunit-modulefilter-dropdown-list").getElementsByTagName("input"),
  		    filter = id("qunit-filter-input").value;

  		for (i = 0; i < modulesList.length; i++) {
  			if (modulesList[i].checked) {
  				selectedModules.push(modulesList[i].value);
  			}
  		}

  		window.location = setUrl({
  			filter: filter === "" ? undefined : filter,
  			moduleId: selectedModules.length === 0 ? undefined : selectedModules,

  			// Remove module and testId filter
  			module: undefined,
  			testId: undefined
  		});
  	}

  	function toolbarUrlConfigContainer() {
  		var urlConfigContainer = document$$1.createElement("span");

  		urlConfigContainer.innerHTML = getUrlConfigHtml();
  		addClass(urlConfigContainer, "qunit-url-config");

  		addEvents(urlConfigContainer.getElementsByTagName("input"), "change", toolbarChanged);
  		addEvents(urlConfigContainer.getElementsByTagName("select"), "change", toolbarChanged);

  		return urlConfigContainer;
  	}

  	function abortTestsButton() {
  		var button = document$$1.createElement("button");
  		button.id = "qunit-abort-tests-button";
  		button.innerHTML = "Abort";
  		addEvent(button, "click", abortTests);
  		return button;
  	}

  	function toolbarLooseFilter() {
  		var filter = document$$1.createElement("form"),
  		    label = document$$1.createElement("label"),
  		    input = document$$1.createElement("input"),
  		    button = document$$1.createElement("button");

  		addClass(filter, "qunit-filter");

  		label.innerHTML = "Filter: ";

  		input.type = "text";
  		input.value = config.filter || "";
  		input.name = "filter";
  		input.id = "qunit-filter-input";

  		button.innerHTML = "Go";

  		label.appendChild(input);

  		filter.appendChild(label);
  		filter.appendChild(document$$1.createTextNode(" "));
  		filter.appendChild(button);
  		addEvent(filter, "submit", interceptNavigation);

  		return filter;
  	}

  	function moduleListHtml() {
  		var i,
  		    checked,
  		    html = "";

  		for (i = 0; i < config.modules.length; i++) {
  			if (config.modules[i].name !== "") {
  				checked = config.moduleId.indexOf(config.modules[i].moduleId) > -1;
  				html += "<li><label class='clickable" + (checked ? " checked" : "") + "'><input type='checkbox' " + "value='" + config.modules[i].moduleId + "'" + (checked ? " checked='checked'" : "") + " />" + escapeText(config.modules[i].name) + "</label></li>";
  			}
  		}

  		return html;
  	}

  	function toolbarModuleFilter() {
  		var allCheckbox,
  		    commit,
  		    reset,
  		    moduleFilter = document$$1.createElement("form"),
  		    label = document$$1.createElement("label"),
  		    moduleSearch = document$$1.createElement("input"),
  		    dropDown = document$$1.createElement("div"),
  		    actions = document$$1.createElement("span"),
  		    dropDownList = document$$1.createElement("ul"),
  		    dirty = false;

  		moduleSearch.id = "qunit-modulefilter-search";
  		addEvent(moduleSearch, "input", searchInput);
  		addEvent(moduleSearch, "input", searchFocus);
  		addEvent(moduleSearch, "focus", searchFocus);
  		addEvent(moduleSearch, "click", searchFocus);

  		label.id = "qunit-modulefilter-search-container";
  		label.innerHTML = "Module: ";
  		label.appendChild(moduleSearch);

  		actions.id = "qunit-modulefilter-actions";
  		actions.innerHTML = "<button style='display:none'>Apply</button>" + "<button type='reset' style='display:none'>Reset</button>" + "<label class='clickable" + (config.moduleId.length ? "" : " checked") + "'><input type='checkbox'" + (config.moduleId.length ? "" : " checked='checked'") + ">All modules</label>";
  		allCheckbox = actions.lastChild.firstChild;
  		commit = actions.firstChild;
  		reset = commit.nextSibling;
  		addEvent(commit, "click", applyUrlParams);

  		dropDownList.id = "qunit-modulefilter-dropdown-list";
  		dropDownList.innerHTML = moduleListHtml();

  		dropDown.id = "qunit-modulefilter-dropdown";
  		dropDown.style.display = "none";
  		dropDown.appendChild(actions);
  		dropDown.appendChild(dropDownList);
  		addEvent(dropDown, "change", selectionChange);
  		selectionChange();

  		moduleFilter.id = "qunit-modulefilter";
  		moduleFilter.appendChild(label);
  		moduleFilter.appendChild(dropDown);
  		addEvent(moduleFilter, "submit", interceptNavigation);
  		addEvent(moduleFilter, "reset", function () {

  			// Let the reset happen, then update styles
  			window.setTimeout(selectionChange);
  		});

  		// Enables show/hide for the dropdown
  		function searchFocus() {
  			if (dropDown.style.display !== "none") {
  				return;
  			}

  			dropDown.style.display = "block";
  			addEvent(document$$1, "click", hideHandler);
  			addEvent(document$$1, "keydown", hideHandler);

  			// Hide on Escape keydown or outside-container click
  			function hideHandler(e) {
  				var inContainer = moduleFilter.contains(e.target);

  				if (e.keyCode === 27 || !inContainer) {
  					if (e.keyCode === 27 && inContainer) {
  						moduleSearch.focus();
  					}
  					dropDown.style.display = "none";
  					removeEvent(document$$1, "click", hideHandler);
  					removeEvent(document$$1, "keydown", hideHandler);
  					moduleSearch.value = "";
  					searchInput();
  				}
  			}
  		}

  		// Processes module search box input
  		function searchInput() {
  			var i,
  			    item,
  			    searchText = moduleSearch.value.toLowerCase(),
  			    listItems = dropDownList.children;

  			for (i = 0; i < listItems.length; i++) {
  				item = listItems[i];
  				if (!searchText || item.textContent.toLowerCase().indexOf(searchText) > -1) {
  					item.style.display = "";
  				} else {
  					item.style.display = "none";
  				}
  			}
  		}

  		// Processes selection changes
  		function selectionChange(evt) {
  			var i,
  			    item,
  			    checkbox = evt && evt.target || allCheckbox,
  			    modulesList = dropDownList.getElementsByTagName("input"),
  			    selectedNames = [];

  			toggleClass(checkbox.parentNode, "checked", checkbox.checked);

  			dirty = false;
  			if (checkbox.checked && checkbox !== allCheckbox) {
  				allCheckbox.checked = false;
  				removeClass(allCheckbox.parentNode, "checked");
  			}
  			for (i = 0; i < modulesList.length; i++) {
  				item = modulesList[i];
  				if (!evt) {
  					toggleClass(item.parentNode, "checked", item.checked);
  				} else if (checkbox === allCheckbox && checkbox.checked) {
  					item.checked = false;
  					removeClass(item.parentNode, "checked");
  				}
  				dirty = dirty || item.checked !== item.defaultChecked;
  				if (item.checked) {
  					selectedNames.push(item.parentNode.textContent);
  				}
  			}

  			commit.style.display = reset.style.display = dirty ? "" : "none";
  			moduleSearch.placeholder = selectedNames.join(", ") || allCheckbox.parentNode.textContent;
  			moduleSearch.title = "Type to filter list. Current selection:\n" + (selectedNames.join("\n") || allCheckbox.parentNode.textContent);
  		}

  		return moduleFilter;
  	}

  	function appendToolbar() {
  		var toolbar = id("qunit-testrunner-toolbar");

  		if (toolbar) {
  			toolbar.appendChild(toolbarUrlConfigContainer());
  			toolbar.appendChild(toolbarModuleFilter());
  			toolbar.appendChild(toolbarLooseFilter());
  			toolbar.appendChild(document$$1.createElement("div")).className = "clearfix";
  		}
  	}

  	function appendHeader() {
  		var header = id("qunit-header");

  		if (header) {
  			header.innerHTML = "<a href='" + escapeText(unfilteredUrl) + "'>" + header.innerHTML + "</a> ";
  		}
  	}

  	function appendBanner() {
  		var banner = id("qunit-banner");

  		if (banner) {
  			banner.className = "";
  		}
  	}

  	function appendTestResults() {
  		var tests = id("qunit-tests"),
  		    result = id("qunit-testresult"),
  		    controls;

  		if (result) {
  			result.parentNode.removeChild(result);
  		}

  		if (tests) {
  			tests.innerHTML = "";
  			result = document$$1.createElement("p");
  			result.id = "qunit-testresult";
  			result.className = "result";
  			tests.parentNode.insertBefore(result, tests);
  			result.innerHTML = "<div id=\"qunit-testresult-display\">Running...<br />&#160;</div>" + "<div id=\"qunit-testresult-controls\"></div>" + "<div class=\"clearfix\"></div>";
  			controls = id("qunit-testresult-controls");
  		}

  		if (controls) {
  			controls.appendChild(abortTestsButton());
  		}
  	}

  	function appendFilteredTest() {
  		var testId = QUnit.config.testId;
  		if (!testId || testId.length <= 0) {
  			return "";
  		}
  		return "<div id='qunit-filteredTest'>Rerunning selected tests: " + escapeText(testId.join(", ")) + " <a id='qunit-clearFilter' href='" + escapeText(unfilteredUrl) + "'>Run all tests</a></div>";
  	}

  	function appendUserAgent() {
  		var userAgent = id("qunit-userAgent");

  		if (userAgent) {
  			userAgent.innerHTML = "";
  			userAgent.appendChild(document$$1.createTextNode("QUnit " + QUnit.version + "; " + navigator.userAgent));
  		}
  	}

  	function appendInterface() {
  		var qunit = id("qunit");

  		if (qunit) {
  			qunit.innerHTML = "<h1 id='qunit-header'>" + escapeText(document$$1.title) + "</h1>" + "<h2 id='qunit-banner'></h2>" + "<div id='qunit-testrunner-toolbar'></div>" + appendFilteredTest() + "<h2 id='qunit-userAgent'></h2>" + "<ol id='qunit-tests'></ol>";
  		}

  		appendHeader();
  		appendBanner();
  		appendTestResults();
  		appendUserAgent();
  		appendToolbar();
  	}

  	function appendTestsList(modules) {
  		var i, l, x, z, test, moduleObj;

  		for (i = 0, l = modules.length; i < l; i++) {
  			moduleObj = modules[i];

  			for (x = 0, z = moduleObj.tests.length; x < z; x++) {
  				test = moduleObj.tests[x];

  				appendTest(test.name, test.testId, moduleObj.name);
  			}
  		}
  	}

  	function appendTest(name, testId, moduleName) {
  		var title,
  		    rerunTrigger,
  		    testBlock,
  		    assertList,
  		    tests = id("qunit-tests");

  		if (!tests) {
  			return;
  		}

  		title = document$$1.createElement("strong");
  		title.innerHTML = getNameHtml(name, moduleName);

  		rerunTrigger = document$$1.createElement("a");
  		rerunTrigger.innerHTML = "Rerun";
  		rerunTrigger.href = setUrl({ testId: testId });

  		testBlock = document$$1.createElement("li");
  		testBlock.appendChild(title);
  		testBlock.appendChild(rerunTrigger);
  		testBlock.id = "qunit-test-output-" + testId;

  		assertList = document$$1.createElement("ol");
  		assertList.className = "qunit-assert-list";

  		testBlock.appendChild(assertList);

  		tests.appendChild(testBlock);
  	}

  	// HTML Reporter initialization and load
  	QUnit.begin(function (details) {
  		var i, moduleObj, tests;

  		// Sort modules by name for the picker
  		for (i = 0; i < details.modules.length; i++) {
  			moduleObj = details.modules[i];
  			if (moduleObj.name) {
  				modulesList.push(moduleObj.name);
  			}
  		}
  		modulesList.sort(function (a, b) {
  			return a.localeCompare(b);
  		});

  		// Initialize QUnit elements
  		appendInterface();
  		appendTestsList(details.modules);
  		tests = id("qunit-tests");
  		if (tests && config.hidepassed) {
  			addClass(tests, "hidepass");
  		}
  	});

  	QUnit.done(function (details) {
  		var banner = id("qunit-banner"),
  		    tests = id("qunit-tests"),
  		    abortButton = id("qunit-abort-tests-button"),
  		    totalTests = stats.passedTests + stats.skippedTests + stats.todoTests + stats.failedTests,
  		    html = [totalTests, " tests completed in ", details.runtime, " milliseconds, with ", stats.failedTests, " failed, ", stats.skippedTests, " skipped, and ", stats.todoTests, " todo.<br />", "<span class='passed'>", details.passed, "</span> assertions of <span class='total'>", details.total, "</span> passed, <span class='failed'>", details.failed, "</span> failed."].join(""),
  		    test,
  		    assertLi,
  		    assertList;

  		// Update remaing tests to aborted
  		if (abortButton && abortButton.disabled) {
  			html = "Tests aborted after " + details.runtime + " milliseconds.";

  			for (var i = 0; i < tests.children.length; i++) {
  				test = tests.children[i];
  				if (test.className === "" || test.className === "running") {
  					test.className = "aborted";
  					assertList = test.getElementsByTagName("ol")[0];
  					assertLi = document$$1.createElement("li");
  					assertLi.className = "fail";
  					assertLi.innerHTML = "Test aborted.";
  					assertList.appendChild(assertLi);
  				}
  			}
  		}

  		if (banner && (!abortButton || abortButton.disabled === false)) {
  			banner.className = stats.failedTests ? "qunit-fail" : "qunit-pass";
  		}

  		if (abortButton) {
  			abortButton.parentNode.removeChild(abortButton);
  		}

  		if (tests) {
  			id("qunit-testresult-display").innerHTML = html;
  		}

  		if (config.altertitle && document$$1.title) {

  			// Show ✖ for good, ✔ for bad suite result in title
  			// use escape sequences in case file gets loaded with non-utf-8-charset
  			document$$1.title = [stats.failedTests ? "\u2716" : "\u2714", document$$1.title.replace(/^[\u2714\u2716] /i, "")].join(" ");
  		}

  		// Scroll back to top to show results
  		if (config.scrolltop && window.scrollTo) {
  			window.scrollTo(0, 0);
  		}
  	});

  	function getNameHtml(name, module) {
  		var nameHtml = "";

  		if (module) {
  			nameHtml = "<span class='module-name'>" + escapeText(module) + "</span>: ";
  		}

  		nameHtml += "<span class='test-name'>" + escapeText(name) + "</span>";

  		return nameHtml;
  	}

  	QUnit.testStart(function (details) {
  		var running, testBlock, bad;

  		testBlock = id("qunit-test-output-" + details.testId);
  		if (testBlock) {
  			testBlock.className = "running";
  		} else {

  			// Report later registered tests
  			appendTest(details.name, details.testId, details.module);
  		}

  		running = id("qunit-testresult-display");
  		if (running) {
  			bad = QUnit.config.reorder && details.previousFailure;

  			running.innerHTML = (bad ? "Rerunning previously failed test: <br />" : "Running: <br />") + getNameHtml(details.name, details.module);
  		}
  	});

  	function stripHtml(string) {

  		// Strip tags, html entity and whitespaces
  		return string.replace(/<\/?[^>]+(>|$)/g, "").replace(/\&quot;/g, "").replace(/\s+/g, "");
  	}

  	QUnit.log(function (details) {
  		var assertList,
  		    assertLi,
  		    message,
  		    expected,
  		    actual,
  		    diff,
  		    showDiff = false,
  		    testItem = id("qunit-test-output-" + details.testId);

  		if (!testItem) {
  			return;
  		}

  		message = escapeText(details.message) || (details.result ? "okay" : "failed");
  		message = "<span class='test-message'>" + message + "</span>";
  		message += "<span class='runtime'>@ " + details.runtime + " ms</span>";

  		// The pushFailure doesn't provide details.expected
  		// when it calls, it's implicit to also not show expected and diff stuff
  		// Also, we need to check details.expected existence, as it can exist and be undefined
  		if (!details.result && hasOwn.call(details, "expected")) {
  			if (details.negative) {
  				expected = "NOT " + QUnit.dump.parse(details.expected);
  			} else {
  				expected = QUnit.dump.parse(details.expected);
  			}

  			actual = QUnit.dump.parse(details.actual);
  			message += "<table><tr class='test-expected'><th>Expected: </th><td><pre>" + escapeText(expected) + "</pre></td></tr>";

  			if (actual !== expected) {

  				message += "<tr class='test-actual'><th>Result: </th><td><pre>" + escapeText(actual) + "</pre></td></tr>";

  				if (typeof details.actual === "number" && typeof details.expected === "number") {
  					if (!isNaN(details.actual) && !isNaN(details.expected)) {
  						showDiff = true;
  						diff = details.actual - details.expected;
  						diff = (diff > 0 ? "+" : "") + diff;
  					}
  				} else if (typeof details.actual !== "boolean" && typeof details.expected !== "boolean") {
  					diff = QUnit.diff(expected, actual);

  					// don't show diff if there is zero overlap
  					showDiff = stripHtml(diff).length !== stripHtml(expected).length + stripHtml(actual).length;
  				}

  				if (showDiff) {
  					message += "<tr class='test-diff'><th>Diff: </th><td><pre>" + diff + "</pre></td></tr>";
  				}
  			} else if (expected.indexOf("[object Array]") !== -1 || expected.indexOf("[object Object]") !== -1) {
  				message += "<tr class='test-message'><th>Message: </th><td>" + "Diff suppressed as the depth of object is more than current max depth (" + QUnit.config.maxDepth + ").<p>Hint: Use <code>QUnit.dump.maxDepth</code> to " + " run with a higher max depth or <a href='" + escapeText(setUrl({ maxDepth: -1 })) + "'>" + "Rerun</a> without max depth.</p></td></tr>";
  			} else {
  				message += "<tr class='test-message'><th>Message: </th><td>" + "Diff suppressed as the expected and actual results have an equivalent" + " serialization</td></tr>";
  			}

  			if (details.source) {
  				message += "<tr class='test-source'><th>Source: </th><td><pre>" + escapeText(details.source) + "</pre></td></tr>";
  			}

  			message += "</table>";

  			// This occurs when pushFailure is set and we have an extracted stack trace
  		} else if (!details.result && details.source) {
  			message += "<table>" + "<tr class='test-source'><th>Source: </th><td><pre>" + escapeText(details.source) + "</pre></td></tr>" + "</table>";
  		}

  		assertList = testItem.getElementsByTagName("ol")[0];

  		assertLi = document$$1.createElement("li");
  		assertLi.className = details.result ? "pass" : "fail";
  		assertLi.innerHTML = message;
  		assertList.appendChild(assertLi);
  	});

  	QUnit.testDone(function (details) {
  		var testTitle,
  		    time,
  		    testItem,
  		    assertList,
  		    good,
  		    bad,
  		    testCounts,
  		    skipped,
  		    sourceName,
  		    tests = id("qunit-tests");

  		if (!tests) {
  			return;
  		}

  		testItem = id("qunit-test-output-" + details.testId);

  		assertList = testItem.getElementsByTagName("ol")[0];

  		good = details.passed;
  		bad = details.failed;

  		// This test passed if it has no unexpected failed assertions
  		var testPassed = details.failed > 0 ? details.todo : !details.todo;

  		if (testPassed) {

  			// Collapse the passing tests
  			addClass(assertList, "qunit-collapsed");
  		} else if (config.collapse) {
  			if (!collapseNext) {

  				// Skip collapsing the first failing test
  				collapseNext = true;
  			} else {

  				// Collapse remaining tests
  				addClass(assertList, "qunit-collapsed");
  			}
  		}

  		// The testItem.firstChild is the test name
  		testTitle = testItem.firstChild;

  		testCounts = bad ? "<b class='failed'>" + bad + "</b>, " + "<b class='passed'>" + good + "</b>, " : "";

  		testTitle.innerHTML += " <b class='counts'>(" + testCounts + details.assertions.length + ")</b>";

  		if (details.skipped) {
  			stats.skippedTests++;

  			testItem.className = "skipped";
  			skipped = document$$1.createElement("em");
  			skipped.className = "qunit-skipped-label";
  			skipped.innerHTML = "skipped";
  			testItem.insertBefore(skipped, testTitle);
  		} else {
  			addEvent(testTitle, "click", function () {
  				toggleClass(assertList, "qunit-collapsed");
  			});

  			testItem.className = testPassed ? "pass" : "fail";

  			if (details.todo) {
  				var todoLabel = document$$1.createElement("em");
  				todoLabel.className = "qunit-todo-label";
  				todoLabel.innerHTML = "todo";
  				testItem.className += " todo";
  				testItem.insertBefore(todoLabel, testTitle);
  			}

  			time = document$$1.createElement("span");
  			time.className = "runtime";
  			time.innerHTML = details.runtime + " ms";
  			testItem.insertBefore(time, assertList);

  			if (!testPassed) {
  				stats.failedTests++;
  			} else if (details.todo) {
  				stats.todoTests++;
  			} else {
  				stats.passedTests++;
  			}
  		}

  		// Show the source of the test when showing assertions
  		if (details.source) {
  			sourceName = document$$1.createElement("p");
  			sourceName.innerHTML = "<strong>Source: </strong>" + details.source;
  			addClass(sourceName, "qunit-source");
  			if (testPassed) {
  				addClass(sourceName, "qunit-collapsed");
  			}
  			addEvent(testTitle, "click", function () {
  				toggleClass(sourceName, "qunit-collapsed");
  			});
  			testItem.appendChild(sourceName);
  		}
  	});

  	// Avoid readyState issue with phantomjs
  	// Ref: #818
  	var notPhantom = function (p) {
  		return !(p && p.version && p.version.major > 0);
  	}(window.phantom);

  	if (notPhantom && document$$1.readyState === "complete") {
  		QUnit.load();
  	} else {
  		addEvent(window, "load", QUnit.load);
  	}

  	// Wrap window.onerror. We will call the original window.onerror to see if
  	// the existing handler fully handles the error; if not, we will call the
  	// QUnit.onError function.
  	var originalWindowOnError = window.onerror;

  	// Cover uncaught exceptions
  	// Returning true will suppress the default browser handler,
  	// returning false will let it run.
  	window.onerror = function (message, fileName, lineNumber) {
  		var ret = false;
  		if (originalWindowOnError) {
  			for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
  				args[_key - 3] = arguments[_key];
  			}

  			ret = originalWindowOnError.call.apply(originalWindowOnError, [this, message, fileName, lineNumber].concat(args));
  		}

  		// Treat return value as window.onerror itself does,
  		// Only do our handling if not suppressed.
  		if (ret !== true) {
  			var error = {
  				message: message,
  				fileName: fileName,
  				lineNumber: lineNumber
  			};

  			ret = QUnit.onError(error);
  		}

  		return ret;
  	};
  })();

  /*
   * This file is a modified version of google-diff-match-patch's JavaScript implementation
   * (https://code.google.com/p/google-diff-match-patch/source/browse/trunk/javascript/diff_match_patch_uncompressed.js),
   * modifications are licensed as more fully set forth in LICENSE.txt.
   *
   * The original source of google-diff-match-patch is attributable and licensed as follows:
   *
   * Copyright 2006 Google Inc.
   * https://code.google.com/p/google-diff-match-patch/
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * https://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * More Info:
   *  https://code.google.com/p/google-diff-match-patch/
   *
   * Usage: QUnit.diff(expected, actual)
   *
   */
  QUnit.diff = function () {
  	function DiffMatchPatch() {}

  	//  DIFF FUNCTIONS

  	/**
    * The data structure representing a diff is an array of tuples:
    * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
    * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
    */
  	var DIFF_DELETE = -1,
  	    DIFF_INSERT = 1,
  	    DIFF_EQUAL = 0;

  	/**
    * Find the differences between two texts.  Simplifies the problem by stripping
    * any common prefix or suffix off the texts before diffing.
    * @param {string} text1 Old string to be diffed.
    * @param {string} text2 New string to be diffed.
    * @param {boolean=} optChecklines Optional speedup flag. If present and false,
    *     then don't run a line-level diff first to identify the changed areas.
    *     Defaults to true, which does a faster, slightly less optimal diff.
    * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
    */
  	DiffMatchPatch.prototype.DiffMain = function (text1, text2, optChecklines) {
  		var deadline, checklines, commonlength, commonprefix, commonsuffix, diffs;

  		// The diff must be complete in up to 1 second.
  		deadline = new Date().getTime() + 1000;

  		// Check for null inputs.
  		if (text1 === null || text2 === null) {
  			throw new Error("Null input. (DiffMain)");
  		}

  		// Check for equality (speedup).
  		if (text1 === text2) {
  			if (text1) {
  				return [[DIFF_EQUAL, text1]];
  			}
  			return [];
  		}

  		if (typeof optChecklines === "undefined") {
  			optChecklines = true;
  		}

  		checklines = optChecklines;

  		// Trim off common prefix (speedup).
  		commonlength = this.diffCommonPrefix(text1, text2);
  		commonprefix = text1.substring(0, commonlength);
  		text1 = text1.substring(commonlength);
  		text2 = text2.substring(commonlength);

  		// Trim off common suffix (speedup).
  		commonlength = this.diffCommonSuffix(text1, text2);
  		commonsuffix = text1.substring(text1.length - commonlength);
  		text1 = text1.substring(0, text1.length - commonlength);
  		text2 = text2.substring(0, text2.length - commonlength);

  		// Compute the diff on the middle block.
  		diffs = this.diffCompute(text1, text2, checklines, deadline);

  		// Restore the prefix and suffix.
  		if (commonprefix) {
  			diffs.unshift([DIFF_EQUAL, commonprefix]);
  		}
  		if (commonsuffix) {
  			diffs.push([DIFF_EQUAL, commonsuffix]);
  		}
  		this.diffCleanupMerge(diffs);
  		return diffs;
  	};

  	/**
    * Reduce the number of edits by eliminating operationally trivial equalities.
    * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
    */
  	DiffMatchPatch.prototype.diffCleanupEfficiency = function (diffs) {
  		var changes, equalities, equalitiesLength, lastequality, pointer, preIns, preDel, postIns, postDel;
  		changes = false;
  		equalities = []; // Stack of indices where equalities are found.
  		equalitiesLength = 0; // Keeping our own length var is faster in JS.
  		/** @type {?string} */
  		lastequality = null;

  		// Always equal to diffs[equalities[equalitiesLength - 1]][1]
  		pointer = 0; // Index of current position.

  		// Is there an insertion operation before the last equality.
  		preIns = false;

  		// Is there a deletion operation before the last equality.
  		preDel = false;

  		// Is there an insertion operation after the last equality.
  		postIns = false;

  		// Is there a deletion operation after the last equality.
  		postDel = false;
  		while (pointer < diffs.length) {

  			// Equality found.
  			if (diffs[pointer][0] === DIFF_EQUAL) {
  				if (diffs[pointer][1].length < 4 && (postIns || postDel)) {

  					// Candidate found.
  					equalities[equalitiesLength++] = pointer;
  					preIns = postIns;
  					preDel = postDel;
  					lastequality = diffs[pointer][1];
  				} else {

  					// Not a candidate, and can never become one.
  					equalitiesLength = 0;
  					lastequality = null;
  				}
  				postIns = postDel = false;

  				// An insertion or deletion.
  			} else {

  				if (diffs[pointer][0] === DIFF_DELETE) {
  					postDel = true;
  				} else {
  					postIns = true;
  				}

  				/*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
  				if (lastequality && (preIns && preDel && postIns && postDel || lastequality.length < 2 && preIns + preDel + postIns + postDel === 3)) {

  					// Duplicate record.
  					diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

  					// Change second copy to insert.
  					diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
  					equalitiesLength--; // Throw away the equality we just deleted;
  					lastequality = null;
  					if (preIns && preDel) {

  						// No changes made which could affect previous entry, keep going.
  						postIns = postDel = true;
  						equalitiesLength = 0;
  					} else {
  						equalitiesLength--; // Throw away the previous equality.
  						pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
  						postIns = postDel = false;
  					}
  					changes = true;
  				}
  			}
  			pointer++;
  		}

  		if (changes) {
  			this.diffCleanupMerge(diffs);
  		}
  	};

  	/**
    * Convert a diff array into a pretty HTML report.
    * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
    * @param {integer} string to be beautified.
    * @return {string} HTML representation.
    */
  	DiffMatchPatch.prototype.diffPrettyHtml = function (diffs) {
  		var op,
  		    data,
  		    x,
  		    html = [];
  		for (x = 0; x < diffs.length; x++) {
  			op = diffs[x][0]; // Operation (insert, delete, equal)
  			data = diffs[x][1]; // Text of change.
  			switch (op) {
  				case DIFF_INSERT:
  					html[x] = "<ins>" + escapeText(data) + "</ins>";
  					break;
  				case DIFF_DELETE:
  					html[x] = "<del>" + escapeText(data) + "</del>";
  					break;
  				case DIFF_EQUAL:
  					html[x] = "<span>" + escapeText(data) + "</span>";
  					break;
  			}
  		}
  		return html.join("");
  	};

  	/**
    * Determine the common prefix of two strings.
    * @param {string} text1 First string.
    * @param {string} text2 Second string.
    * @return {number} The number of characters common to the start of each
    *     string.
    */
  	DiffMatchPatch.prototype.diffCommonPrefix = function (text1, text2) {
  		var pointermid, pointermax, pointermin, pointerstart;

  		// Quick check for common null cases.
  		if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
  			return 0;
  		}

  		// Binary search.
  		// Performance analysis: https://neil.fraser.name/news/2007/10/09/
  		pointermin = 0;
  		pointermax = Math.min(text1.length, text2.length);
  		pointermid = pointermax;
  		pointerstart = 0;
  		while (pointermin < pointermid) {
  			if (text1.substring(pointerstart, pointermid) === text2.substring(pointerstart, pointermid)) {
  				pointermin = pointermid;
  				pointerstart = pointermin;
  			} else {
  				pointermax = pointermid;
  			}
  			pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  		}
  		return pointermid;
  	};

  	/**
    * Determine the common suffix of two strings.
    * @param {string} text1 First string.
    * @param {string} text2 Second string.
    * @return {number} The number of characters common to the end of each string.
    */
  	DiffMatchPatch.prototype.diffCommonSuffix = function (text1, text2) {
  		var pointermid, pointermax, pointermin, pointerend;

  		// Quick check for common null cases.
  		if (!text1 || !text2 || text1.charAt(text1.length - 1) !== text2.charAt(text2.length - 1)) {
  			return 0;
  		}

  		// Binary search.
  		// Performance analysis: https://neil.fraser.name/news/2007/10/09/
  		pointermin = 0;
  		pointermax = Math.min(text1.length, text2.length);
  		pointermid = pointermax;
  		pointerend = 0;
  		while (pointermin < pointermid) {
  			if (text1.substring(text1.length - pointermid, text1.length - pointerend) === text2.substring(text2.length - pointermid, text2.length - pointerend)) {
  				pointermin = pointermid;
  				pointerend = pointermin;
  			} else {
  				pointermax = pointermid;
  			}
  			pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  		}
  		return pointermid;
  	};

  	/**
    * Find the differences between two texts.  Assumes that the texts do not
    * have any common prefix or suffix.
    * @param {string} text1 Old string to be diffed.
    * @param {string} text2 New string to be diffed.
    * @param {boolean} checklines Speedup flag.  If false, then don't run a
    *     line-level diff first to identify the changed areas.
    *     If true, then run a faster, slightly less optimal diff.
    * @param {number} deadline Time when the diff should be complete by.
    * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
    * @private
    */
  	DiffMatchPatch.prototype.diffCompute = function (text1, text2, checklines, deadline) {
  		var diffs, longtext, shorttext, i, hm, text1A, text2A, text1B, text2B, midCommon, diffsA, diffsB;

  		if (!text1) {

  			// Just add some text (speedup).
  			return [[DIFF_INSERT, text2]];
  		}

  		if (!text2) {

  			// Just delete some text (speedup).
  			return [[DIFF_DELETE, text1]];
  		}

  		longtext = text1.length > text2.length ? text1 : text2;
  		shorttext = text1.length > text2.length ? text2 : text1;
  		i = longtext.indexOf(shorttext);
  		if (i !== -1) {

  			// Shorter text is inside the longer text (speedup).
  			diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]];

  			// Swap insertions for deletions if diff is reversed.
  			if (text1.length > text2.length) {
  				diffs[0][0] = diffs[2][0] = DIFF_DELETE;
  			}
  			return diffs;
  		}

  		if (shorttext.length === 1) {

  			// Single character string.
  			// After the previous speedup, the character can't be an equality.
  			return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  		}

  		// Check to see if the problem can be split in two.
  		hm = this.diffHalfMatch(text1, text2);
  		if (hm) {

  			// A half-match was found, sort out the return data.
  			text1A = hm[0];
  			text1B = hm[1];
  			text2A = hm[2];
  			text2B = hm[3];
  			midCommon = hm[4];

  			// Send both pairs off for separate processing.
  			diffsA = this.DiffMain(text1A, text2A, checklines, deadline);
  			diffsB = this.DiffMain(text1B, text2B, checklines, deadline);

  			// Merge the results.
  			return diffsA.concat([[DIFF_EQUAL, midCommon]], diffsB);
  		}

  		if (checklines && text1.length > 100 && text2.length > 100) {
  			return this.diffLineMode(text1, text2, deadline);
  		}

  		return this.diffBisect(text1, text2, deadline);
  	};

  	/**
    * Do the two texts share a substring which is at least half the length of the
    * longer text?
    * This speedup can produce non-minimal diffs.
    * @param {string} text1 First string.
    * @param {string} text2 Second string.
    * @return {Array.<string>} Five element Array, containing the prefix of
    *     text1, the suffix of text1, the prefix of text2, the suffix of
    *     text2 and the common middle.  Or null if there was no match.
    * @private
    */
  	DiffMatchPatch.prototype.diffHalfMatch = function (text1, text2) {
  		var longtext, shorttext, dmp, text1A, text2B, text2A, text1B, midCommon, hm1, hm2, hm;

  		longtext = text1.length > text2.length ? text1 : text2;
  		shorttext = text1.length > text2.length ? text2 : text1;
  		if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
  			return null; // Pointless.
  		}
  		dmp = this; // 'this' becomes 'window' in a closure.

  		/**
     * Does a substring of shorttext exist within longtext such that the substring
     * is at least half the length of longtext?
     * Closure, but does not reference any external variables.
     * @param {string} longtext Longer string.
     * @param {string} shorttext Shorter string.
     * @param {number} i Start index of quarter length substring within longtext.
     * @return {Array.<string>} Five element Array, containing the prefix of
     *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
     *     of shorttext and the common middle.  Or null if there was no match.
     * @private
     */
  		function diffHalfMatchI(longtext, shorttext, i) {
  			var seed, j, bestCommon, prefixLength, suffixLength, bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;

  			// Start with a 1/4 length substring at position i as a seed.
  			seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
  			j = -1;
  			bestCommon = "";
  			while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
  				prefixLength = dmp.diffCommonPrefix(longtext.substring(i), shorttext.substring(j));
  				suffixLength = dmp.diffCommonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
  				if (bestCommon.length < suffixLength + prefixLength) {
  					bestCommon = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
  					bestLongtextA = longtext.substring(0, i - suffixLength);
  					bestLongtextB = longtext.substring(i + prefixLength);
  					bestShorttextA = shorttext.substring(0, j - suffixLength);
  					bestShorttextB = shorttext.substring(j + prefixLength);
  				}
  			}
  			if (bestCommon.length * 2 >= longtext.length) {
  				return [bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB, bestCommon];
  			} else {
  				return null;
  			}
  		}

  		// First check if the second quarter is the seed for a half-match.
  		hm1 = diffHalfMatchI(longtext, shorttext, Math.ceil(longtext.length / 4));

  		// Check again based on the third quarter.
  		hm2 = diffHalfMatchI(longtext, shorttext, Math.ceil(longtext.length / 2));
  		if (!hm1 && !hm2) {
  			return null;
  		} else if (!hm2) {
  			hm = hm1;
  		} else if (!hm1) {
  			hm = hm2;
  		} else {

  			// Both matched.  Select the longest.
  			hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  		}

  		// A half-match was found, sort out the return data.
  		if (text1.length > text2.length) {
  			text1A = hm[0];
  			text1B = hm[1];
  			text2A = hm[2];
  			text2B = hm[3];
  		} else {
  			text2A = hm[0];
  			text2B = hm[1];
  			text1A = hm[2];
  			text1B = hm[3];
  		}
  		midCommon = hm[4];
  		return [text1A, text1B, text2A, text2B, midCommon];
  	};

  	/**
    * Do a quick line-level diff on both strings, then rediff the parts for
    * greater accuracy.
    * This speedup can produce non-minimal diffs.
    * @param {string} text1 Old string to be diffed.
    * @param {string} text2 New string to be diffed.
    * @param {number} deadline Time when the diff should be complete by.
    * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
    * @private
    */
  	DiffMatchPatch.prototype.diffLineMode = function (text1, text2, deadline) {
  		var a, diffs, linearray, pointer, countInsert, countDelete, textInsert, textDelete, j;

  		// Scan the text on a line-by-line basis first.
  		a = this.diffLinesToChars(text1, text2);
  		text1 = a.chars1;
  		text2 = a.chars2;
  		linearray = a.lineArray;

  		diffs = this.DiffMain(text1, text2, false, deadline);

  		// Convert the diff back to original text.
  		this.diffCharsToLines(diffs, linearray);

  		// Eliminate freak matches (e.g. blank lines)
  		this.diffCleanupSemantic(diffs);

  		// Rediff any replacement blocks, this time character-by-character.
  		// Add a dummy entry at the end.
  		diffs.push([DIFF_EQUAL, ""]);
  		pointer = 0;
  		countDelete = 0;
  		countInsert = 0;
  		textDelete = "";
  		textInsert = "";
  		while (pointer < diffs.length) {
  			switch (diffs[pointer][0]) {
  				case DIFF_INSERT:
  					countInsert++;
  					textInsert += diffs[pointer][1];
  					break;
  				case DIFF_DELETE:
  					countDelete++;
  					textDelete += diffs[pointer][1];
  					break;
  				case DIFF_EQUAL:

  					// Upon reaching an equality, check for prior redundancies.
  					if (countDelete >= 1 && countInsert >= 1) {

  						// Delete the offending records and add the merged ones.
  						diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert);
  						pointer = pointer - countDelete - countInsert;
  						a = this.DiffMain(textDelete, textInsert, false, deadline);
  						for (j = a.length - 1; j >= 0; j--) {
  							diffs.splice(pointer, 0, a[j]);
  						}
  						pointer = pointer + a.length;
  					}
  					countInsert = 0;
  					countDelete = 0;
  					textDelete = "";
  					textInsert = "";
  					break;
  			}
  			pointer++;
  		}
  		diffs.pop(); // Remove the dummy entry at the end.

  		return diffs;
  	};

  	/**
    * Find the 'middle snake' of a diff, split the problem in two
    * and return the recursively constructed diff.
    * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
    * @param {string} text1 Old string to be diffed.
    * @param {string} text2 New string to be diffed.
    * @param {number} deadline Time at which to bail if not yet complete.
    * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
    * @private
    */
  	DiffMatchPatch.prototype.diffBisect = function (text1, text2, deadline) {
  		var text1Length, text2Length, maxD, vOffset, vLength, v1, v2, x, delta, front, k1start, k1end, k2start, k2end, k2Offset, k1Offset, x1, x2, y1, y2, d, k1, k2;

  		// Cache the text lengths to prevent multiple calls.
  		text1Length = text1.length;
  		text2Length = text2.length;
  		maxD = Math.ceil((text1Length + text2Length) / 2);
  		vOffset = maxD;
  		vLength = 2 * maxD;
  		v1 = new Array(vLength);
  		v2 = new Array(vLength);

  		// Setting all elements to -1 is faster in Chrome & Firefox than mixing
  		// integers and undefined.
  		for (x = 0; x < vLength; x++) {
  			v1[x] = -1;
  			v2[x] = -1;
  		}
  		v1[vOffset + 1] = 0;
  		v2[vOffset + 1] = 0;
  		delta = text1Length - text2Length;

  		// If the total number of characters is odd, then the front path will collide
  		// with the reverse path.
  		front = delta % 2 !== 0;

  		// Offsets for start and end of k loop.
  		// Prevents mapping of space beyond the grid.
  		k1start = 0;
  		k1end = 0;
  		k2start = 0;
  		k2end = 0;
  		for (d = 0; d < maxD; d++) {

  			// Bail out if deadline is reached.
  			if (new Date().getTime() > deadline) {
  				break;
  			}

  			// Walk the front path one step.
  			for (k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
  				k1Offset = vOffset + k1;
  				if (k1 === -d || k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1]) {
  					x1 = v1[k1Offset + 1];
  				} else {
  					x1 = v1[k1Offset - 1] + 1;
  				}
  				y1 = x1 - k1;
  				while (x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1)) {
  					x1++;
  					y1++;
  				}
  				v1[k1Offset] = x1;
  				if (x1 > text1Length) {

  					// Ran off the right of the graph.
  					k1end += 2;
  				} else if (y1 > text2Length) {

  					// Ran off the bottom of the graph.
  					k1start += 2;
  				} else if (front) {
  					k2Offset = vOffset + delta - k1;
  					if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {

  						// Mirror x2 onto top-left coordinate system.
  						x2 = text1Length - v2[k2Offset];
  						if (x1 >= x2) {

  							// Overlap detected.
  							return this.diffBisectSplit(text1, text2, x1, y1, deadline);
  						}
  					}
  				}
  			}

  			// Walk the reverse path one step.
  			for (k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
  				k2Offset = vOffset + k2;
  				if (k2 === -d || k2 !== d && v2[k2Offset - 1] < v2[k2Offset + 1]) {
  					x2 = v2[k2Offset + 1];
  				} else {
  					x2 = v2[k2Offset - 1] + 1;
  				}
  				y2 = x2 - k2;
  				while (x2 < text1Length && y2 < text2Length && text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1)) {
  					x2++;
  					y2++;
  				}
  				v2[k2Offset] = x2;
  				if (x2 > text1Length) {

  					// Ran off the left of the graph.
  					k2end += 2;
  				} else if (y2 > text2Length) {

  					// Ran off the top of the graph.
  					k2start += 2;
  				} else if (!front) {
  					k1Offset = vOffset + delta - k2;
  					if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
  						x1 = v1[k1Offset];
  						y1 = vOffset + x1 - k1Offset;

  						// Mirror x2 onto top-left coordinate system.
  						x2 = text1Length - x2;
  						if (x1 >= x2) {

  							// Overlap detected.
  							return this.diffBisectSplit(text1, text2, x1, y1, deadline);
  						}
  					}
  				}
  			}
  		}

  		// Diff took too long and hit the deadline or
  		// number of diffs equals number of characters, no commonality at all.
  		return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  	};

  	/**
    * Given the location of the 'middle snake', split the diff in two parts
    * and recurse.
    * @param {string} text1 Old string to be diffed.
    * @param {string} text2 New string to be diffed.
    * @param {number} x Index of split point in text1.
    * @param {number} y Index of split point in text2.
    * @param {number} deadline Time at which to bail if not yet complete.
    * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
    * @private
    */
  	DiffMatchPatch.prototype.diffBisectSplit = function (text1, text2, x, y, deadline) {
  		var text1a, text1b, text2a, text2b, diffs, diffsb;
  		text1a = text1.substring(0, x);
  		text2a = text2.substring(0, y);
  		text1b = text1.substring(x);
  		text2b = text2.substring(y);

  		// Compute both diffs serially.
  		diffs = this.DiffMain(text1a, text2a, false, deadline);
  		diffsb = this.DiffMain(text1b, text2b, false, deadline);

  		return diffs.concat(diffsb);
  	};

  	/**
    * Reduce the number of edits by eliminating semantically trivial equalities.
    * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
    */
  	DiffMatchPatch.prototype.diffCleanupSemantic = function (diffs) {
  		var changes, equalities, equalitiesLength, lastequality, pointer, lengthInsertions2, lengthDeletions2, lengthInsertions1, lengthDeletions1, deletion, insertion, overlapLength1, overlapLength2;
  		changes = false;
  		equalities = []; // Stack of indices where equalities are found.
  		equalitiesLength = 0; // Keeping our own length var is faster in JS.
  		/** @type {?string} */
  		lastequality = null;

  		// Always equal to diffs[equalities[equalitiesLength - 1]][1]
  		pointer = 0; // Index of current position.

  		// Number of characters that changed prior to the equality.
  		lengthInsertions1 = 0;
  		lengthDeletions1 = 0;

  		// Number of characters that changed after the equality.
  		lengthInsertions2 = 0;
  		lengthDeletions2 = 0;
  		while (pointer < diffs.length) {
  			if (diffs[pointer][0] === DIFF_EQUAL) {
  				// Equality found.
  				equalities[equalitiesLength++] = pointer;
  				lengthInsertions1 = lengthInsertions2;
  				lengthDeletions1 = lengthDeletions2;
  				lengthInsertions2 = 0;
  				lengthDeletions2 = 0;
  				lastequality = diffs[pointer][1];
  			} else {
  				// An insertion or deletion.
  				if (diffs[pointer][0] === DIFF_INSERT) {
  					lengthInsertions2 += diffs[pointer][1].length;
  				} else {
  					lengthDeletions2 += diffs[pointer][1].length;
  				}

  				// Eliminate an equality that is smaller or equal to the edits on both
  				// sides of it.
  				if (lastequality && lastequality.length <= Math.max(lengthInsertions1, lengthDeletions1) && lastequality.length <= Math.max(lengthInsertions2, lengthDeletions2)) {

  					// Duplicate record.
  					diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

  					// Change second copy to insert.
  					diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;

  					// Throw away the equality we just deleted.
  					equalitiesLength--;

  					// Throw away the previous equality (it needs to be reevaluated).
  					equalitiesLength--;
  					pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;

  					// Reset the counters.
  					lengthInsertions1 = 0;
  					lengthDeletions1 = 0;
  					lengthInsertions2 = 0;
  					lengthDeletions2 = 0;
  					lastequality = null;
  					changes = true;
  				}
  			}
  			pointer++;
  		}

  		// Normalize the diff.
  		if (changes) {
  			this.diffCleanupMerge(diffs);
  		}

  		// Find any overlaps between deletions and insertions.
  		// e.g: <del>abcxxx</del><ins>xxxdef</ins>
  		//   -> <del>abc</del>xxx<ins>def</ins>
  		// e.g: <del>xxxabc</del><ins>defxxx</ins>
  		//   -> <ins>def</ins>xxx<del>abc</del>
  		// Only extract an overlap if it is as big as the edit ahead or behind it.
  		pointer = 1;
  		while (pointer < diffs.length) {
  			if (diffs[pointer - 1][0] === DIFF_DELETE && diffs[pointer][0] === DIFF_INSERT) {
  				deletion = diffs[pointer - 1][1];
  				insertion = diffs[pointer][1];
  				overlapLength1 = this.diffCommonOverlap(deletion, insertion);
  				overlapLength2 = this.diffCommonOverlap(insertion, deletion);
  				if (overlapLength1 >= overlapLength2) {
  					if (overlapLength1 >= deletion.length / 2 || overlapLength1 >= insertion.length / 2) {

  						// Overlap found.  Insert an equality and trim the surrounding edits.
  						diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlapLength1)]);
  						diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlapLength1);
  						diffs[pointer + 1][1] = insertion.substring(overlapLength1);
  						pointer++;
  					}
  				} else {
  					if (overlapLength2 >= deletion.length / 2 || overlapLength2 >= insertion.length / 2) {

  						// Reverse overlap found.
  						// Insert an equality and swap and trim the surrounding edits.
  						diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlapLength2)]);

  						diffs[pointer - 1][0] = DIFF_INSERT;
  						diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlapLength2);
  						diffs[pointer + 1][0] = DIFF_DELETE;
  						diffs[pointer + 1][1] = deletion.substring(overlapLength2);
  						pointer++;
  					}
  				}
  				pointer++;
  			}
  			pointer++;
  		}
  	};

  	/**
    * Determine if the suffix of one string is the prefix of another.
    * @param {string} text1 First string.
    * @param {string} text2 Second string.
    * @return {number} The number of characters common to the end of the first
    *     string and the start of the second string.
    * @private
    */
  	DiffMatchPatch.prototype.diffCommonOverlap = function (text1, text2) {
  		var text1Length, text2Length, textLength, best, length, pattern, found;

  		// Cache the text lengths to prevent multiple calls.
  		text1Length = text1.length;
  		text2Length = text2.length;

  		// Eliminate the null case.
  		if (text1Length === 0 || text2Length === 0) {
  			return 0;
  		}

  		// Truncate the longer string.
  		if (text1Length > text2Length) {
  			text1 = text1.substring(text1Length - text2Length);
  		} else if (text1Length < text2Length) {
  			text2 = text2.substring(0, text1Length);
  		}
  		textLength = Math.min(text1Length, text2Length);

  		// Quick check for the worst case.
  		if (text1 === text2) {
  			return textLength;
  		}

  		// Start by looking for a single character match
  		// and increase length until no match is found.
  		// Performance analysis: https://neil.fraser.name/news/2010/11/04/
  		best = 0;
  		length = 1;
  		while (true) {
  			pattern = text1.substring(textLength - length);
  			found = text2.indexOf(pattern);
  			if (found === -1) {
  				return best;
  			}
  			length += found;
  			if (found === 0 || text1.substring(textLength - length) === text2.substring(0, length)) {
  				best = length;
  				length++;
  			}
  		}
  	};

  	/**
    * Split two texts into an array of strings.  Reduce the texts to a string of
    * hashes where each Unicode character represents one line.
    * @param {string} text1 First string.
    * @param {string} text2 Second string.
    * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
    *     An object containing the encoded text1, the encoded text2 and
    *     the array of unique strings.
    *     The zeroth element of the array of unique strings is intentionally blank.
    * @private
    */
  	DiffMatchPatch.prototype.diffLinesToChars = function (text1, text2) {
  		var lineArray, lineHash, chars1, chars2;
  		lineArray = []; // E.g. lineArray[4] === 'Hello\n'
  		lineHash = {}; // E.g. lineHash['Hello\n'] === 4

  		// '\x00' is a valid character, but various debuggers don't like it.
  		// So we'll insert a junk entry to avoid generating a null character.
  		lineArray[0] = "";

  		/**
     * Split a text into an array of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * Modifies linearray and linehash through being a closure.
     * @param {string} text String to encode.
     * @return {string} Encoded string.
     * @private
     */
  		function diffLinesToCharsMunge(text) {
  			var chars, lineStart, lineEnd, lineArrayLength, line;
  			chars = "";

  			// Walk the text, pulling out a substring for each line.
  			// text.split('\n') would would temporarily double our memory footprint.
  			// Modifying text would create many large strings to garbage collect.
  			lineStart = 0;
  			lineEnd = -1;

  			// Keeping our own length variable is faster than looking it up.
  			lineArrayLength = lineArray.length;
  			while (lineEnd < text.length - 1) {
  				lineEnd = text.indexOf("\n", lineStart);
  				if (lineEnd === -1) {
  					lineEnd = text.length - 1;
  				}
  				line = text.substring(lineStart, lineEnd + 1);
  				lineStart = lineEnd + 1;

  				if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== undefined) {
  					chars += String.fromCharCode(lineHash[line]);
  				} else {
  					chars += String.fromCharCode(lineArrayLength);
  					lineHash[line] = lineArrayLength;
  					lineArray[lineArrayLength++] = line;
  				}
  			}
  			return chars;
  		}

  		chars1 = diffLinesToCharsMunge(text1);
  		chars2 = diffLinesToCharsMunge(text2);
  		return {
  			chars1: chars1,
  			chars2: chars2,
  			lineArray: lineArray
  		};
  	};

  	/**
    * Rehydrate the text in a diff from a string of line hashes to real lines of
    * text.
    * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
    * @param {!Array.<string>} lineArray Array of unique strings.
    * @private
    */
  	DiffMatchPatch.prototype.diffCharsToLines = function (diffs, lineArray) {
  		var x, chars, text, y;
  		for (x = 0; x < diffs.length; x++) {
  			chars = diffs[x][1];
  			text = [];
  			for (y = 0; y < chars.length; y++) {
  				text[y] = lineArray[chars.charCodeAt(y)];
  			}
  			diffs[x][1] = text.join("");
  		}
  	};

  	/**
    * Reorder and merge like edit sections.  Merge equalities.
    * Any edit section can move as long as it doesn't cross an equality.
    * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
    */
  	DiffMatchPatch.prototype.diffCleanupMerge = function (diffs) {
  		var pointer, countDelete, countInsert, textInsert, textDelete, commonlength, changes, diffPointer, position;
  		diffs.push([DIFF_EQUAL, ""]); // Add a dummy entry at the end.
  		pointer = 0;
  		countDelete = 0;
  		countInsert = 0;
  		textDelete = "";
  		textInsert = "";

  		while (pointer < diffs.length) {
  			switch (diffs[pointer][0]) {
  				case DIFF_INSERT:
  					countInsert++;
  					textInsert += diffs[pointer][1];
  					pointer++;
  					break;
  				case DIFF_DELETE:
  					countDelete++;
  					textDelete += diffs[pointer][1];
  					pointer++;
  					break;
  				case DIFF_EQUAL:

  					// Upon reaching an equality, check for prior redundancies.
  					if (countDelete + countInsert > 1) {
  						if (countDelete !== 0 && countInsert !== 0) {

  							// Factor out any common prefixes.
  							commonlength = this.diffCommonPrefix(textInsert, textDelete);
  							if (commonlength !== 0) {
  								if (pointer - countDelete - countInsert > 0 && diffs[pointer - countDelete - countInsert - 1][0] === DIFF_EQUAL) {
  									diffs[pointer - countDelete - countInsert - 1][1] += textInsert.substring(0, commonlength);
  								} else {
  									diffs.splice(0, 0, [DIFF_EQUAL, textInsert.substring(0, commonlength)]);
  									pointer++;
  								}
  								textInsert = textInsert.substring(commonlength);
  								textDelete = textDelete.substring(commonlength);
  							}

  							// Factor out any common suffixies.
  							commonlength = this.diffCommonSuffix(textInsert, textDelete);
  							if (commonlength !== 0) {
  								diffs[pointer][1] = textInsert.substring(textInsert.length - commonlength) + diffs[pointer][1];
  								textInsert = textInsert.substring(0, textInsert.length - commonlength);
  								textDelete = textDelete.substring(0, textDelete.length - commonlength);
  							}
  						}

  						// Delete the offending records and add the merged ones.
  						if (countDelete === 0) {
  							diffs.splice(pointer - countInsert, countDelete + countInsert, [DIFF_INSERT, textInsert]);
  						} else if (countInsert === 0) {
  							diffs.splice(pointer - countDelete, countDelete + countInsert, [DIFF_DELETE, textDelete]);
  						} else {
  							diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert, [DIFF_DELETE, textDelete], [DIFF_INSERT, textInsert]);
  						}
  						pointer = pointer - countDelete - countInsert + (countDelete ? 1 : 0) + (countInsert ? 1 : 0) + 1;
  					} else if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {

  						// Merge this equality with the previous one.
  						diffs[pointer - 1][1] += diffs[pointer][1];
  						diffs.splice(pointer, 1);
  					} else {
  						pointer++;
  					}
  					countInsert = 0;
  					countDelete = 0;
  					textDelete = "";
  					textInsert = "";
  					break;
  			}
  		}
  		if (diffs[diffs.length - 1][1] === "") {
  			diffs.pop(); // Remove the dummy entry at the end.
  		}

  		// Second pass: look for single edits surrounded on both sides by equalities
  		// which can be shifted sideways to eliminate an equality.
  		// e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  		changes = false;
  		pointer = 1;

  		// Intentionally ignore the first and last element (don't need checking).
  		while (pointer < diffs.length - 1) {
  			if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {

  				diffPointer = diffs[pointer][1];
  				position = diffPointer.substring(diffPointer.length - diffs[pointer - 1][1].length);

  				// This is a single edit surrounded by equalities.
  				if (position === diffs[pointer - 1][1]) {

  					// Shift the edit over the previous equality.
  					diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
  					diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
  					diffs.splice(pointer - 1, 1);
  					changes = true;
  				} else if (diffPointer.substring(0, diffs[pointer + 1][1].length) === diffs[pointer + 1][1]) {

  					// Shift the edit over the next equality.
  					diffs[pointer - 1][1] += diffs[pointer + 1][1];
  					diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
  					diffs.splice(pointer + 1, 1);
  					changes = true;
  				}
  			}
  			pointer++;
  		}

  		// If shifts were made, the diff needs reordering and another shift sweep.
  		if (changes) {
  			this.diffCleanupMerge(diffs);
  		}
  	};

  	return function (o, n) {
  		var diff, output, text;
  		diff = new DiffMatchPatch();
  		output = diff.DiffMain(o, n);
  		diff.diffCleanupEfficiency(output);
  		text = diff.diffPrettyHtml(output);

  		return text;
  	};
  }();

}((function() { return this; }())));
