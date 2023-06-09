export function appendClassNames(
  ...classes: (string | Record<string, boolean>)[]
): string {
  return classes
    .map((classItem) => {
      if (typeof classItem === "string") {
        return classItem;
      } else {
        return Object.entries(classItem)
          .filter(([, condition]) => condition)
          .map(([className]) => className)
          .join(" ");
      }
    })
    .join(" ");
}
