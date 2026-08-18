import { formatCurrency } from '../scripts/utils/price.js'

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars ', () => {
        expect(formatCurrency(2099)).toEqual('20.99')
    })

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    })
})