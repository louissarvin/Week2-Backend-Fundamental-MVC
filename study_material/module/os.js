const os = require('os');

setInterval(() => {
  const stats = {
    cpuUsage: os.loadavg(), // Load average 1, 5, 15 menit
    freeMem: os.freemem(), // Memory tersedia dalam bytes
    uptime: os.uptime() // Dalam detik
  };
  
  if (stats.freeMem < 100 * 1024 * 1024) { // < 100MB
    console.warn('Memory kritis!');
    // Trigger cleanup process
  }
}, 5000); // Check setiap 5 detik