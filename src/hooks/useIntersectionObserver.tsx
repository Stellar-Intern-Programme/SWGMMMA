import {useRef, useEffect, useState} from 'react';
import 'intersection-observer';

const useIntersectionObserver = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const observer = new IntersectionObserver(
      (entries: any) => {
        entries.forEach((entry: any) => {
          setVisible(entry.isIntersecting);
        });
      },
      {threshold: 1, rootMargin: '0px'},
    );

    if (ref.current) {
      console.log(ref?._internalFiberInstanceHandleDEV);
      // observer.observe(ref.current);
    }

    //
    // return () => {
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   if (ref.current) observer.unobserve(ref.current);
    // };
  }, [ref]);

  return {ref, visible};
};

export default useIntersectionObserver;
