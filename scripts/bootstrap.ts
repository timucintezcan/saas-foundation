import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

type AuthMode = 'none' | 'basic';
type BillingMode = 'none' | 'stripe';
type BackendCloud = 'none' | 'gcp' | 'aws' | 'azure';
type FrontendCloud = 'none' | 'firebase' | 'vercel' | 'netlify' | 'gcp' | 'aws' | 'azure';
type ObjectStorageProvider = 'local' | 'gcs' | 'aws-s3' | 'azure-blob';
type PrimaryDataStore = 'relational';
type MobileRelease = 'none' | 'expo-eas' | 'firebase-app-distribution';
type ThemePreset = 'clean' | 'bold' | 'minimal';
type ColorMode = 'dark' | 'light';
type RadiusStyle = 'sharp' | 'soft' | 'rounded';
type ButtonStyle = 'solid' | 'outline' | 'ghost';
type Density = 'compact' | 'comfortable';
type MotionLevel = 'none' | 'subtle' | 'expressive';

type BootstrapOptions = {
  projectName: string;
  packageScope: string;
  workdir: string;
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

type TemplateConfig = {
  projectName: string;
  packageScope: string;
  features: {
    web: boolean;
    mobile: boolean;
    auth: AuthMode;
    billing: BillingMode;
  };
  infra: {
    backendCloud: BackendCloud;
    frontendCloud: FrontendCloud;
    useObjectStorage: boolean;
    primaryDataStore: PrimaryDataStore;
    objectStorageProvider: ObjectStorageProvider;
    mobileRelease: MobileRelease;
    region: string;
  };
  ui: {
    themePreset: ThemePreset;
    colorMode: ColorMode;
    accentColor: string;
    radiusStyle: RadiusStyle;
    buttonStyle: ButtonStyle;
    density: Density;
    motionLevel: MotionLevel;
  };
};

const TEXT_FILE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.mjs',
  '.cjs',
  '.json',
  '.yaml',
  '.yml',
  '.md',
  '.css',
  '.env',
]);

const IGNORED_DIRS = new Set(['node_modules', '.git', '.turbo', '.pnpm-store', '.next', 'dist']);

export function runBootstrap(options: BootstrapOptions): void {
  const normalizedScope = normalizeScope(options.packageScope);
  const normalizedProjectName = normalizeKebab(options.projectName);
  const objectStorageProvider = inferObjectStorageProvider(options.backendCloud, options.useObjectStorage);

  writeTemplateConfig(
    {
      projectName: normalizedProjectName,
      packageScope: normalizedScope,
      features: {
        web: options.web,
        mobile: options.mobile,
        auth: options.auth,
        billing: options.billing,
      },
      infra: {
        backendCloud: options.backendCloud,
        frontendCloud: options.frontendCloud,
        useObjectStorage: options.useObjectStorage,
        primaryDataStore: 'relational',
        objectStorageProvider,
        mobileRelease: options.mobileRelease,
        region: options.region,
      },
      ui: {
        themePreset: options.themePreset,
        colorMode: options.colorMode,
        accentColor: options.accentColor,
        radiusStyle: options.radiusStyle,
        buttonStyle: options.buttonStyle,
        density: options.density,
        motionLevel: options.motionLevel,
      },
    },
    options.workdir,
  );

  replaceTemplateStrings(options.workdir, {
    'saas-foundation': normalizedProjectName,
    '@saas-foundation': normalizedScope,
    'SaaS Foundation': toTitle(normalizedProjectName),
  });

  if (!options.web) {
    removePath(options.workdir, 'apps/web');
  }

  if (!options.mobile) {
    removePath(options.workdir, 'apps/mobile');
  }

  updateRootPackageScripts(options.workdir, { web: options.web, mobile: options.mobile });
}

function inferObjectStorageProvider(
  backendCloud: BackendCloud,
  useObjectStorage: boolean,
): ObjectStorageProvider {
  if (!useObjectStorage) {
    return 'local';
  }

  if (backendCloud === 'gcp') {
    return 'gcs';
  }

  if (backendCloud === 'aws') {
    return 'aws-s3';
  }

  if (backendCloud === 'azure') {
    return 'azure-blob';
  }

  return 'local';
}

function writeTemplateConfig(config: TemplateConfig, workdir: string): void {
  const targetPath = join(workdir, 'template.config.json');
  writeFileSync(targetPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
}

function replaceTemplateStrings(rootDir: string, replacements: Record<string, string>): void {
  const files = listTextFiles(rootDir);

  for (const filePath of files) {
    const relativePath = relative(rootDir, filePath);

    if (relativePath === 'template.config.example.json') {
      continue;
    }

    let content = readFileSync(filePath, 'utf8');
    let changed = false;

    for (const [from, to] of Object.entries(replacements)) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filePath, content, 'utf8');
    }
  }
}

function listTextFiles(rootDir: string): string[] {
  const result: string[] = [];

  const walk = (currentDir: string): void => {
    for (const entry of readdirSync(currentDir)) {
      const fullPath = join(currentDir, entry);
      const stats = statSync(fullPath);

      if (stats.isDirectory()) {
        if (!IGNORED_DIRS.has(entry)) {
          walk(fullPath);
        }
        continue;
      }

      const extension = getExtension(entry);
      if (TEXT_FILE_EXTENSIONS.has(extension) || entry === 'Dockerfile') {
        result.push(fullPath);
      }
    }
  };

  walk(rootDir);
  return result;
}

function getExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex >= 0 ? fileName.slice(dotIndex) : '';
}

function removePath(rootDir: string, relativePath: string): void {
  const target = join(rootDir, relativePath);
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }
}

function updateRootPackageScripts(rootDir: string, opts: { web: boolean; mobile: boolean }): void {
  const packageJsonPath = join(rootDir, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    scripts?: Record<string, string>;
  };

  if (!packageJson.scripts) {
    return;
  }

  if (!opts.web) {
    delete packageJson.scripts['dev:web'];
    delete packageJson.scripts['build:web'];
    delete packageJson.scripts['lint:web'];
  }

  if (!opts.mobile) {
    delete packageJson.scripts['dev:mobile'];
    delete packageJson.scripts['build:mobile'];
    delete packageJson.scripts['lint:mobile'];
  }

  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
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

function normalizeKebab(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitle(kebab: string): string {
  return kebab
    .split('-')
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

function parseArgs(argv: string[]): BootstrapOptions {
  const defaults: Omit<BootstrapOptions, 'packageScope' | 'projectName'> & { projectName: string } = {
    projectName: 'my-saas',
    workdir: process.cwd(),
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

  const argMap = new Map<string, string>();
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith('--')) {
      argMap.set(key, next);
      index += 1;
    } else {
      argMap.set(key, 'true');
    }
  }

  const projectName = argMap.get('project-name') ?? defaults.projectName;
  const normalizedProjectName = normalizeKebab(projectName) || defaults.projectName;
  const packageScopeInput = argMap.get('package-scope') ?? `@${normalizedProjectName}`;
  const backendCloud =
    (argMap.get('backend-cloud') as BootstrapOptions['backendCloud']) ?? defaults.backendCloud;
  const frontendCloud =
    (argMap.get('frontend-cloud') as BootstrapOptions['frontendCloud']) ?? defaults.frontendCloud;

  const parsed: BootstrapOptions = {
    ...defaults,
    projectName,
    packageScope: normalizeScope(packageScopeInput),
    workdir: resolve(argMap.get('workdir') ?? defaults.workdir),
    web: parseBoolean(argMap.get('web'), defaults.web),
    mobile: parseBoolean(argMap.get('mobile'), defaults.mobile),
    auth: (argMap.get('auth') as BootstrapOptions['auth']) ?? defaults.auth,
    billing: (argMap.get('billing') as BootstrapOptions['billing']) ?? defaults.billing,
    backendCloud,
    frontendCloud,
    useObjectStorage: parseBoolean(argMap.get('use-object-storage'), defaults.useObjectStorage),
    mobileRelease: (argMap.get('mobile-release') as BootstrapOptions['mobileRelease']) ?? defaults.mobileRelease,
    region: argMap.get('region') ?? defaults.region,
    themePreset: (argMap.get('theme-preset') as BootstrapOptions['themePreset']) ?? defaults.themePreset,
    colorMode: (argMap.get('color-mode') as BootstrapOptions['colorMode']) ?? defaults.colorMode,
    accentColor: argMap.get('accent-color') ?? defaults.accentColor,
    radiusStyle: (argMap.get('radius-style') as BootstrapOptions['radiusStyle']) ?? defaults.radiusStyle,
    buttonStyle: (argMap.get('button-style') as BootstrapOptions['buttonStyle']) ?? defaults.buttonStyle,
    density: (argMap.get('density') as BootstrapOptions['density']) ?? defaults.density,
    motionLevel: (argMap.get('motion-level') as BootstrapOptions['motionLevel']) ?? defaults.motionLevel,
  };

  return parsed;
}

function parseBoolean(value: string | undefined, fallback: boolean): boolean {
  if (!value) {
    return fallback;
  }
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs(process.argv.slice(2));
  runBootstrap(options);
  // eslint-disable-next-line no-console
  console.log(`Bootstrap completed for ${options.projectName} in ${options.workdir}`);
}
