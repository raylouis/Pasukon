const Result = require('../result')
const Evaluator = require('../evaluator')

module.exports = class Many1 {
  constructor (parser, code) {
    this.parser = parser
    this.code = code
  }

  parse (tokens) {
    if (tokens.length === 0) return Result.fail(tokens)

    let remaining = tokens
    let matched = []
    while (remaining.length > 0) {
      const result = this.parser.parse(remaining)
      matched = matched.concat(result.matched)

      if (result.failed) {
        if (matched.length === 0) {
          return Result.fail(tokens)
        } else {
          return Result.ok(remaining, this.code ? Evaluator.eval(this.code, matched) : matched)
        }
      }

      remaining = result.remaining
    }
  }
}