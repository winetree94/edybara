export const classes = (...args: string[]) => {
  return args.filter(Boolean).join(' ');
};
