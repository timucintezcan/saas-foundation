import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { runBootstrap } from './bootstrap';

type AuthMode = 'none' | 'basic';
type BillingMode = 'none' | 'stripe';
type BackendCloud = 'none' | 'gcp' | 'aws' | 'azure';
type FrontendCloud = 'none' | 'firebase' | 'vercel' | 'netlify' | 'gcp' | 'aws' | 'azure';
type MobileRelease = 'none' | 'expo-eas' | 'firebase-app-distribution';
type ThemePreset = 'clean' | 'bold' | 'minimal';
type ColorMode = 'dark' | 'light';
type RadiusStyle = 'sharp' | 'soft' | 'rounded';
type ButtonStyle = 'solid' | 'outline' | 'ghost';
type Density = 'compact' | 'comfortable';
type MotionLevel = 'none' | 'subtle' | 'expressive';

type CliArgs = {
  projectName: string;
  packageScope: string;
  web: boolean;
  mobile: boolean;
  auth: AuthMode;
  billing: BillingMode;
  backendCloud: BackendCloud;
  frontendCloud: FrontendCloud;
  useObjectStorage: boolean;
  mobileRelease: MobileRelease;
  region: string;
  themePreset: ThemePreset;
  colorMode: ColorMode;
  accentColor: string;
  radiusStyle: RadiusStyle;
  buttonStyle: ButtonStyle;
  density: Density;
  motionLevel: MotionLevel;
};

const EXCLUDED_ROOT_ENTRIES = new Set(['.git', 'node_modules', '.turbo', '.pnpm-store', '.DS_Store']);

function parseArgs(argv: string[]): CliArgs {
  const defaults: Omit<CliArgs, 'packageScope' | 'projectName'> & { projectName: string } = {
    projectName: 'my-saas',
    web: true,
    mobile: true,
    auth: 'none',
    billing: 'none',
    backendCloud: 'none',
    frontendCloud: 'none',
    useObjectStorage: true,
    mobileRelease: 'none',
    region: 'europe-west1',
    themePreset: 'clean',
    colorMode: 'dark',
    accentColor: '#3f8cff',
    radiusStyle: 'soft',
    buttonStyle: 'solid',
    density: 'comfortable',
    motionLevel: 'subtle',
  };

  const positional: string[] = [];
  const map = new Map<string, string>();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--') {
      continue;
    }
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[index + 1];
      if (next && !next.startsWith('--')) {
        map.set(key, next);
        index += 1;
      } else {
        map.set(key, 'true');
      }
    } else {
      positional.push(token);
    }
  }

  const projectName = positional[0] ?? defaults.projectName;
  const normalizedProjectName = toKebab(projectName) || defaults.projectName;
  const packageScopeInput = map.get('package-scope') ?? `@${normalizedProjectName}`;

  return {
    ...defaults,
    projectName,
    packageScope: normalizeScope(packageScopeInput),
    web: parseBoolean(map.get('web'), defaults.web),
    mobile: parseBoolean(map.get('mobile'), defaults.mobile),
    auth: (map.get('auth') as CliArgs['auth']) ?? defaults.auth,
    billing: (map.get('billing') as CliArgs['billing']) ?? defaults.billing,
    backendCloud: (map.get('backend-cloud') as CliArgs['backendCloud']) ?? defaults.backendCloud,
    frontendCloud: (map.get('frontend-cloud') as CliArgs['frontendCloud']) ?? defaults.frontendCloud,
    useObjectStorage: parseBoolean(map.get('use-object-storage'), defaults.useObjectStorage),
    mobileRelease: (map.get('mobile-release') as CliArgs['mobileRelease']) ?? defaults.mobileRelease,
    region: map.get('region') ?? defaults.region,
    themePreset: (map.get('theme-preset') as CliArgs['themePreset']) ?? defaults.themePreset,
    colorMode: (map.get('color-mode') as CliArgs['colorMode']) ?? defaults.colorMode,
    accentColor: map.get('accent-color') ?? defaults.accentColor,
    radiusStyle: (map.get('radius-style') as CliArgs['radiusStyle']) ?? defaults.radiusStyle,
    buttonStyle: (map.get('button-style') as CliArgs['buttonStyle']) ?? defaults.buttonStyle,
    density: (map.get('density') as CliArgs['density']) ?? defaults.density,
    motionLevel: (map.get('motion-level') as CliArgs['motionLevel']) ?? defaults.motionLevel,
  };
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function toKebab(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeScope(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return '@my-saas';
  }
  if (trimmed.startsWith('@')) {
    return trimmed;
  }
  return `@${trimmed}`;
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  const normalizedName = toKebab(args.projectName) || 'my-saas';

  const currentFile = fileURLToPath(import.meta.url);
  const templateRoot = resolve(dirname(currentFile), '..');
  const outputDir = resolve(process.cwd(), normalizedName);
  const rootEntries = readdirSync(templateRoot);

  if (existsSync(outputDir)) {
    throw new Error(`Target directory already exists: ${outputDir}`);
  }

  mkdirSync(outputDir, { recursive: true });

  for (const entry of rootEntries) {
    if (EXCLUDED_ROOT_ENTRIES.has(entry)) {
      continue;
    }
    if (entry === normalizedName) {
      continue;
    }

    const source = join(templateRoot, entry);
    const target = join(outputDir, entry);
    cpSync(source, target, { recursive: true });
  }

  runBootstrap({
    projectName: normalizedName,
    packageScope: args.packageScope,
    workdir: outputDir,
    web: args.web,
    mobile: args.mobile,
    auth: args.auth,
    billing: args.billing,
    backendCloud: args.backendCloud,
    frontendCloud: args.frontendCloud,
    useObjectStorage: args.useObjectStorage,
    mobileRelease: args.mobileRelease,
    region: args.region,
    themePreset: args.themePreset,
    colorMode: args.colorMode,
    accentColor: args.accentColor,
    radiusStyle: args.radiusStyle,
    buttonStyle: args.buttonStyle,
    density: args.density,
    motionLevel: args.motionLevel,
  });

  // eslint-disable-next-line no-console
  console.log(`Created ${normalizedName} at ${outputDir}`);
  // eslint-disable-next-line no-console
  console.log('Next steps:');
  // eslint-disable-next-line no-console
  console.log(`  cd ${normalizedName}`);
  // eslint-disable-next-line no-console
  console.log('  pnpm install');
  // eslint-disable-next-line no-console
  console.log('  pnpm dev');
}

main();
