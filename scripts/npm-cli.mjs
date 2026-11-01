/* global console, process */

import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ownPackage = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'))

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} terminó con código ${code}`)),
    )
  })
}

function packageManager() {
  const userAgent = process.env.npm_config_user_agent
  if (userAgent?.startsWith('pnpm')) return 'pnpm'
  if (userAgent?.startsWith('yarn')) return 'yarn'
  if (userAgent?.startsWith('bun')) return 'bun'
  return 'npm'
}

export async function init(options = {}) {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  const manager = packageManager()
  const add = manager === 'npm' ? 'install' : 'add'
  const packageName = options.packageName ?? ownPackage.name
  const packageSpec = `${packageName}@${ownPackage.version}`

  console.log(`\nInicializando ${packageSpec} en ${cwd}\n`)
  if (!options.skipInstall) {
    await run(manager, [add, packageSpec], cwd)
    await run(manager, [add, '-D', 'tailwindcss', '@tailwindcss/vite'], cwd)
  }

  console.log(`Importa los estilos globales:
  import '${packageName}/style.css'

Importa componentes desde:
  import { Button } from '${packageName}/components/Button'
`)
}
