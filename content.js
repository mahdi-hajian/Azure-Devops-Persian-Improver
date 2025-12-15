chrome.storage.sync.get(["enabled"], (res) => {
  if (res.enabled === false) return;

  const azureDevopsIdentifier = document.querySelector("span.suite-image.commandbar-icon.justify-center.flex-noshrink.fabric-icon.ms-Icon--VSTSLogo")
  if (!azureDevopsIdentifier) return;

  const currentYear = new Date().getFullYear();
  const monthMap = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
  };
  const jalaaliMonthNames = {
    1: 'فروردین', 2: 'اردیبهشت', 3: 'خرداد', 4: 'تیر',
    5: 'مرداد', 6: 'شهریور', 7: 'مهر', 8: 'آبان',
    9: 'آذر', 10: 'دی', 11: 'بهمن', 12: 'اسفند'
  };

  // Track processed nodes to avoid double conversion
  const processedNodes = new WeakSet();

  function convertText(text) {
    // Check if text already contains converted dates (has pattern like "Nov 26 (آذر 5)" or "Nov 26, 2025 (آذر 5, 1404)")
    // to avoid double conversion
    if (/[A-Za-z]{3}\s+\d{1,2}(,\s+\d{4})?\s+\([آ-ی]+\s+\d{1,2}(,\s+\d{4})?\)/.test(text)) {
      return text;
    }

    text = text.replace(/\b([A-Za-z]{3}) (\d{1,2}), (\d{4})\b/g, (match, mon, day, year) => {
      const gMonth = monthMap[mon];
      if (!gMonth) return match;
      const { jy, jm, jd } = jalaali.toJalaali(parseInt(year), gMonth, parseInt(day));
      const jalaaliMonthName = jalaaliMonthNames[jm];
      return `${match} (${jalaaliMonthName} ${jd}, ${jy})`;
    });
  
    text = text.replace(/\b([A-Za-z]{3}) (\d{1,2})(?!, \d{4})\b/g, (match, mon, day) => {
      const gMonth = monthMap[mon];
      if (!gMonth) return match;
      const { jy, jm, jd } = jalaali.toJalaali(currentYear, gMonth, parseInt(day));
      const jalaaliMonthName = jalaaliMonthNames[jm];
      return `${match} (${jalaaliMonthName} ${jd})`;
    });

    return text;
  }

  function convertNodeText(node) {
    // Skip if node was already processed
    if (processedNodes.has(node)) {
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.textContent;
      const convertedText = convertText(originalText);
      if (convertedText !== originalText) {
        node.textContent = convertedText;
        processedNodes.add(node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      processedNodes.add(node);
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
