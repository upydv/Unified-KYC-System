const today = new Date().toISOString().split('T')[0];
document.getElementById('signupDOB').setAttribute('max', today);
