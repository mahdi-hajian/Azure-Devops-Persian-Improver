chrome.storage.sync.get(["enabled"], (res) => {
  if (res.enabled === false) return;

  const azureDevopsIdentifier = document.querySelector("span.suite-image.commandbar-icon.justify-center.flex-noshrink.fabric-icon.ms-Icon--VSTSLogo")
  if (!azureDevopsIdentifier) return;

  const currentYear = new Date().getFullYear();
  const monthMap = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  };

  function convertText(text) {
    text = text.replace(/\b([A-Za-z]{3}) (\d{1,2}), (\d{4})\b/g, (match, mon, day, year) => {
      const gMonth = monthMap[mon];
      if (!gMonth) return match;
      const { jy, jm, jd } = jalaali.toJalaali(parseInt(year), gMonth, parseInt(day));
      return `${match} (${jy}/${jm}/${jd})`;
    });
  
    text = text.replace(/\b([A-Za-z]{3}) (\d{1,2})(?!, \d{4})\b/g, (match, mon, day) => {
      const gMonth = monthMap[mon];
      if (!gMonth) return match;
      const { jy, jm, jd } = jalaali.toJalaali(currentYear, gMonth, parseInt(day));
      return `${match} (${jy}/${jm}/${jd})`;
    });

    return text;
  }

  function convertNodeText(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = convertText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (const child of node.childNodes) {
        convertNodeText(child);
      }
    }
  }

  convertNodeText(document.body);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        convertNodeText(node);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
