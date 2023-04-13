export const dragHandler = (event, setIsDrag) => {
  event.preventDefault();
  event.stopPropagation();

  setIsDrag(event.type === "dragover" || event.type === "dragover");
  if (event.type === "drop") return [...event.dataTransfer.files];
  return [];
};
