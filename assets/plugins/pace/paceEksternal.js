// Script ini adalah untuk menunjukan loading saat POST atau GET oleh $http disetiap request
// Rizki Fachrulroji
// rizkifac2204@gmail.com
window.paceOptions = {
  document: true,
  eventLag: true,
  restartOnPushState: true,
  restartOnRequestAfter: true,
  ajax: {
      trackMethods: ['POST', 'GET']
  }
};
