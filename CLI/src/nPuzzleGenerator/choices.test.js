const choices = require("./choices")
// @ponicode
describe("choices", () => {
    test("0", () => {
        let callFunction = () => {
            choices()
        }
    
        expect(callFunction).not.toThrow()
    })
})
