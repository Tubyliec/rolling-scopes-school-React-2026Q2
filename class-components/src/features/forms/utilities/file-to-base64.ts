export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (): void => {
      const result = reader.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as base64'));
      }
    };
    reader.onerror = (): void => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });
}
