type EnvMap = Record<string, string | undefined>;

export function getRuntimeEnv(key: string): string | undefined {
  const env = (globalThis as { process?: { env?: EnvMap } }).process?.env;
  return env?.[key];
}

