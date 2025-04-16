import { useState, useEffect } from "react";

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkIsTablet = () => {
      // Vérification côté client uniquement
      if (typeof window === "undefined") return false;

      // Détection via User Agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isAppleTablet = /ipad/.test(userAgent);
      const isAndroidTablet =
        /android/.test(userAgent) && !/mobile/.test(userAgent);

      // Détection via taille d'écran
      const screenWidth = window.innerWidth;
      const isScreenSizeTablet = screenWidth >= 600 && screenWidth <= 1024;

      return isAppleTablet || isAndroidTablet || isScreenSizeTablet;
    };

    const handleResize = () => {
      setIsTablet(checkIsTablet());
    };

    // Vérification initiale
    handleResize();

    // Écouteur de redimensionnement
    window.addEventListener("resize", handleResize);

    // Nettoyage
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isTablet;
};

export default useIsTablet;
