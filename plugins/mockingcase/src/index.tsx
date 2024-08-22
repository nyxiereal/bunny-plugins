import { ReactNative as RN } from "@vendetta/metro/common";
import { before } from "@vendetta/patcher";

const mockingStyles = {
  textDecoration: 'underline',
  fontStyle: 'italic',
  fontWeight: 'bold',
  color: '#ff8000' // Orange color for mocking
};

const exclamationMarks = () => Math.random() < 0.5 ? '!' : '!!!!'; // Randomly add exclamation marks

const unpatchText = before("render", RN.Text, ([x]) => {
  const existingStyle = RN.StyleSheet.flatten(x.style) ?? {};
  const newStyle = {
    ...existingStyle,
    ...mockingStyles, // Apply mocking styles
    text: `${x.text}${exclamationMarks()}` // Add random exclamation marks
  };
  x.style = newStyle;
});

export function onUnload() {
  unpatchText();
}
