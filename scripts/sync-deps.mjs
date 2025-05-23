import { execSync } from 'node:child_process';
import { readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const manager = detectPackageManager();
const lockfiles = {
  npm: 'package-lock.json',
  yarn: 'yarn.lock',
  pnpm: 'pnpm-lock.yaml',
};

console.log(`🔍 Detected package manager: ${manager}`);

function findWorkspaces(dir) {
  return readdirSync(dir)
    .map((f) => join(dir, f))
    .filter((p) => {
      try {
        return statSync(p).isDirectory() && existsSync(join(p, 'package.json'));
      } catch {
        return false;
      }
    });
}

function cleanNodeModulesAndLockfile(dir) {
  const nodeModulesPath = join(dir, 'node_modules');
  const lockfilePath = join(dir, lockfiles[manager]);

  if (existsSync(lockfilePath)) {
    console.log(`🧹 Removing lockfile in ${dir}`);
    rmSync(lockfilePath);
  }

  if (existsSync(nodeModulesPath)) {
    console.log(`🧹 Removing node_modules in ${dir}`);
    rmSync(nodeModulesPath, { recursive: true, force: true });
  }
}

function installDeps(dir) {
  console.log(`📦 Installing dependencies in ${dir}`);
  execSync(`${manager} install`, { cwd: dir, stdio: 'inherit' });
}

const workspaces = findWorkspaces(root);
cleanNodeModulesAndLockfile(root);
workspaces.forEach(cleanNodeModulesAndLockfile);

installDeps(root);
workspaces.forEach(installDeps);

console.log('✅ Dependencies resynced across monorepo!');

function detectPackageManager() {
  if (existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (existsSync('yarn.lock')) return 'yarn';
  if (existsSync('package-lock.json')) return 'npm';
  return 'npm'; // fallback
}
