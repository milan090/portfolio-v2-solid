/// <reference types="@solidjs/start/env" />

// WebGL global declarations
interface Window {
  GlslCanvas?: any;
}

declare module '*.frag' {
  const content: string
  export default content
}

declare module '*.vert' {
  const content: string
  export default content
}