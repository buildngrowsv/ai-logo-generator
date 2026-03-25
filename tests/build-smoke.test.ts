import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

describe('build smoke', () => {
  it('package.json has build script', () => {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
    expect(pkg.scripts.build).toBeDefined()
    expect(pkg.name).toBeTruthy()
  })

  it('next.config.ts exists', () => {
    const fs = require('fs')
    expect(fs.existsSync(join(process.cwd(), 'next.config.ts'))).toBe(true)
  })
})
