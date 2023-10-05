let isCapturing = false;
let capturedData = [];

document.addEventListener('DOMContentLoaded', (event) => {
  const pressureValueElement = document.getElementById('pressure-value');
  const captureButton = document.getElementById('capture-button');

  captureButton.addEventListener('click', () => {
    isCapturing = !isCapturing;
    captureButton.innerText = isCapturing ? 'Stop Capture' : 'Start Capture';

    if (!isCapturing) {
      // Convert to JSON and download
      const dataStr = JSON.stringify(capturedData);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'captured_data.json';
      link.click();
      URL.revokeObjectURL(url);
    }
  });

  // Simulate receiving data from Arduino. Replace this with your actual data retrieval logic.
  setInterval(() => {
    const pressure = Math.random() * 5; // Replace with actual pressure value
    pressureValueElement.innerText = pressure.toFixed(2);

    if (isCapturing) {
      const timestamp = new Date().toISOString();
      capturedData.push({ pressure, timestamp });
    }
  }, 1000);
});
