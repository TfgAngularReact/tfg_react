// CargaTiempoService.js
const cargaTiempoService = () => {
    const tiempos = {};
  
    const startTimer = (componente) => {
      tiempos[componente] = performance.now();
    };
  
    const stopTimer = (componente) => {
      const startTime = tiempos[componente];
      if (startTime !== undefined) {
        const endTime = performance.now();
        const tiempoCarga = endTime - startTime;
        delete tiempos[componente];
        return tiempoCarga;
      }
      return 0;
    };
  
    return { startTimer, stopTimer };
  };
  
  export default cargaTiempoService();
  