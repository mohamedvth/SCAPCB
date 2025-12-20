// Browser snippet to paste into the console when your index.html (that contains data2025 array) is open.
// It will create readings_2025.csv to download.

(function downloadData2025AsCSV() {
  if (typeof data2025 === 'undefined') {
    console.error('data2025 not found on this page.');
    return;
  }

  const headers = [
    'date', 'time',
    'forage1_index', 'forage1_consumption',
    'forage2_index', 'forage2_consumption',
    'forage3_index', 'forage3_consumption',
    'total_consumption', 'col10', 'col11'
  ];

  function sanitize(v) {
    if (v === null || v === undefined) return '';
    return String(v).replace(/"/g, '""');
  }

  const rows = data2025.map(row => headers.map((_, i) => sanitize(row[i] || '')).join(','));
  const csv = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'readings_2025.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  console.log('CSV download started: readings_2025.csv');
})();