import * as yup from 'yup'

export const rePhoneNumber = /^[0-9]{2,3}-? ?[0-9]{6,7}$/

yup.addMethod(yup.string, 'phone', function () {
  return this.test('phone', 'Phone number is not valid', value =>
    rePhoneNumber.test(value)
  )
})
