import { dropCursor } from '@edybara/pm/dropcursor';

export interface EdybaraDropCursorPluginConfigs {
  /**
    The color of the cursor. Defaults to `black`. Use `false` to apply no color and rely only on class.
    */
  color?: string | false;
  /**
    The precise width of the cursor in pixels. Defaults to 1.
    */
  width?: number;
  /**
    A CSS class name to add to the cursor element.
    */
  class?: string;
}

export const edybaraDropCursorPlugins = (
  configs?: EdybaraDropCursorPluginConfigs,
) => {
  return [dropCursor(configs)];
};
