import { classes } from '../../cdk/utils/core';
import { html } from '../../cdk/render';
import emojiDataJson from 'emoji-datasource/emoji.json';
import { EdybaraButton } from '../button';
import { useState } from 'preact/hooks';

export interface EdybaraEmoji {
  name: string;
  unified: string;
  non_qualified: string;
  docomo: string;
  au: string;
  softbank: string;
  google: string;
  image: string;
  sheet_x: number;
  sheet_y: number;
  short_name: string;
  short_names: string[];
  text: string | null;
  texts: string[] | null;
  category: string;
  subcategory: string;
  sort_order: number;
  added_in: string;
  has_img_apple: boolean;
  has_img_google: boolean;
  has_img_twitter: boolean;
  has_img_facebook: boolean;
}

const emojis = emojiDataJson as EdybaraEmoji[];

const categories = Object.entries(
  emojis.reduce<{
    [key: string]: EdybaraEmoji[];
  }>((result, emoji) => {
    if (!result[emoji.category]) {
      result[emoji.category] = [];
    }
    result[emoji.category].push(emoji);
    return result;
  }, {}),
);

const categoryMap = categories.reduce<{
  [key: string]: EdybaraEmoji[];
}>((result, [category, emojis]) => {
  result[category] = emojis;
  return result;
}, {});

export interface EdybaraEmojiPickerProps {
  size: number;
  gap: number;
}

const CategoryIcons = {
  Symbols: 'ri-character-recognition-fill',
  Activities: 'ri-basketball-line',
  Flags: 'ri-flag-line',
  'Travel & Places': 'ri-plane-fill',
  'Food & Drink': 'ri-restaurant-2-fill',
  'Animals & Nature': 'ri-bug-fill',
  'People & Body': 'ri-user-fill',
  Objects: 'ri-umbrella-fill',
  Components: 'ri-cpu-fill',
  'Smileys & Emotion': 'ri-smile-2-fill',
};

export const EdybaraEmojiPicker = (props: EdybaraEmojiPickerProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>(
    categories[0][0],
  );

  return html`
    <div
      className=${classes('edybara-view-emoji-picker')}
      style=${{ width: (props.size + props.gap + props.gap) * 8 + 1 }}
    >
      <div className=${classes('edybara-view-emoji-category-group')}>
        ${categories.map(([category]) => {
          return html`
            <${EdybaraButton}
              className=${classes('edybara-view-emoji-category-button')}
              onClick=${() => setCurrentCategory(category)}> 
              ${category}
            </${EdybaraButton}>
          `;
        })}
      </div>
      <div className=${classes('edybara-view-emoji-view')}>
        ${categoryMap[currentCategory].map((emoji) => {
          return html`
            <${EdybaraButton} 
              className=${classes('edybara-view-emoji-picker-emoji')}
              style=${{
                width: props.size,
                height: props.size,
                backgroundImage: 'url(/img/emoji/apple/sheets/32.png)',
                backgroundPosition: `${
                  emoji.sheet_x * -(props.size + props.gap + props.gap)
                }px ${emoji.sheet_y * -(props.size + props.gap + props.gap)}px`,
              }}
              data-emoji-name=${emoji.name}  
            >
            </${EdybaraButton}>
          `;
        })}
      </div>
    </div>
  `;
};
