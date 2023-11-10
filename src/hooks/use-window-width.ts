import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(900);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  return width;
};
