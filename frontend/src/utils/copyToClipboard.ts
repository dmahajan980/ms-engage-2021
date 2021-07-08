const copyToClipboard = async (text: string, callback: Function) => {
  if (!navigator.clipboard) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    callback();
  } catch (error) {}
};

export default copyToClipboard;
