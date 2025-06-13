declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.json' {
  const value: any;
  export default value;
}