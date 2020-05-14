/* eslint-env jasmine */
var utils = require('./utils-loader')
var { expect } = require('chai')

describe('utils', function () {
  // ------ calculateDiscount ------ //

  it('should calculate amount discount', function () {
    var basePrice = 50
    var voucher = {
      discount: {
        type: 'AMOUNT',
        amount_off: 1000 // 10.00
      }
    }
    var discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).to.equal(10.00)
  })

  it('should calculate percent discount', function () {
    var basePrice = 50
    var voucher = {
      discount: {
        type: 'PERCENT',
        percent_off: 10.00
      }
    }
    var discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).to.equal(5.00)
  })

  it('should calculate unit discount', function () {
    var basePrice = 50
    var unitPrice = 20
    var voucher = {
      discount: {
        type: 'UNIT',
        unit_off: 1.00
      }
    }
    var discount = utils.calculateDiscount(basePrice, voucher, unitPrice)

    expect(discount).to.equal(20.00)
  })

  it('should calculate discount for gift voucher when balance is less than base price', function () {
    var basePrice = 75
    var voucher = {
      gift: {
        amount: 10000,
        balance: 5000
      }
    }

    var discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).to.equal(50.00)
  })

  it('should calculate discount for gift voucher when balance is greater than base price', function () {
    var basePrice = 75.00
    var voucher = {
      gift: {
        amount: 10000,
        balance: 10000
      }
    }

    var discount = utils.calculateDiscount(basePrice, voucher)

    expect(discount).to.equal(75.00)
  })

  // ------ calculatePrice ------ //

  it('should calculate new price with amount discount', function () {
    var basePrice = 50.00
    var voucher = {
      discount: {
        type: 'AMOUNT',
        amount_off: 1000 // 10.00
      }
    }
    var discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).to.equal(40.00)
  })

  it('should calculate new price with percent discount', function () {
    var basePrice = 50
    var voucher = {
      discount: {
        type: 'PERCENT',
        percent_off: 10.00
      }
    }
    var discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).to.equal(45.00)
  })

  it('should calculate new price with unit discount', function () {
    var basePrice = 50
    var unitPrice = 20
    var voucher = {
      discount: {
        type: 'UNIT',
        unit_off: 1.00
      }
    }
    var discount = utils.calculatePrice(basePrice, voucher, unitPrice)

    expect(discount).to.equal(30.00)
  })

  it('should calculate new price for gift voucher when balance is less than base price', function () {
    var basePrice = 75.00
    var voucher = {
      gift: {
        amount: 10000,
        balance: 5000
      }
    }

    var discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).to.equal(25.00)
  })

  it('should calculate new price for gift voucher when balance is greater than base price', function () {
    var basePrice = 75.00
    var voucher = {
      gift: {
        amount: 10000,
        balance: 10000
      }
    }

    var discount = utils.calculatePrice(basePrice, voucher)

    expect(discount).to.equal(0.00)
  })

  describe('webhooks', function () {
    it('should accept valid signature', function () {
      var signature = '5547d4d07430a2d1b77649564c68d80afe591f7cc61ca110bccb442e3205eeec'
      var message = { test: 'test1' }
      var secretKey = 'secret-signature-key'

      var isVerified = utils.webhooks.verifySignature(signature, message, secretKey)

      expect(isVerified).to.be.true
    })

    it('should reject invalid signature', function () {
      var signature = '8ebb38af093d81c3ac7ae4bc035f16080d23dd9c204511d287de611d3a0948be'
      var message = { test: 'test1' }
      var secretKey = 'secret-signature-key'

      var isVerified = utils.webhooks.verifySignature(signature, message, secretKey)

      expect(isVerified).to.be.false
    })
  })
})
