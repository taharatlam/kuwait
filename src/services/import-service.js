import { saveAs } from "file-saver";

export function importFromJson(file, onSuccess, onError) {
  if (!file) {
    if (onError) onError(new Error("No file provided"));
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);

      if (onSuccess) onSuccess(json);
    } catch (e) {
      if (onError) onError(e);
    }
  };

  reader.onerror = (event) => {
    if (onError) onError(event.target.error);
  };

  reader.readAsText(file);
}
