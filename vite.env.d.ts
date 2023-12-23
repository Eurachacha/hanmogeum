interface ImportMetaEnv {
  // 환경 변수들에 대한 타입 정의
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DEVELOPMENT_OPTIONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
