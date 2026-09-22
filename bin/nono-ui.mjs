#!/usr/bin/env node
/* global console, process */

import { init } from '../scripts/npm-cli.mjs'

const args = process.argv.slice(2)
const command = args.shift()

function option(name) {
  const index = args.indexOf(name)
  if (index === -1) return undefined
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`Falta el valor de ${name}.`)
  return value
}

function help() {
  console.log(`Uso:
  nono-ui init [opciones]

Opciones:
  --cwd <directorio>       Proyecto consumidor
  --package <nombre>       Paquete real (por defecto: @nono-ui)
  --skip-install           Muestra la configuración sin instalar dependencias`)
}

try {
  if (!command || command === '--help' || command === '-h') {
    help()
    process.exit(0)
  }

  if (command !== 'init') {
    throw new Error(`Comando desconocido: ${command}`)
  }

  const options = {
    cwd: option('--cwd'),
    packageName: option('--package'),
    skipInstall: args.includes('--skip-install'),
  }

  await init(options)
} catch (error) {
  console.error(`\nError: ${error.message}`)
  process.exit(1)
}
