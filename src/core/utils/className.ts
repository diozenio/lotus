export function appendClassNames(styles: Array<string>): string {
  let appendedStyle = "";
  for (let i = 0; i < styles.length; i++) {
    appendedStyle += " " + styles[i];
  }

  return appendedStyle;
}
