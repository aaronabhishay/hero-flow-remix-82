import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px 0px -10% 0px', triggerOnce = true } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
};

export const useParallax = <T extends HTMLElement = HTMLDivElement>(speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.pageYOffset;
      const elementTop = ref.current.offsetTop;
      const elementHeight = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate if element is in viewport
      if (scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight) {
        const yPos = (scrolled - elementTop) * speed;
        setOffset(yPos);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

export const useStaggerAnimation = <T extends HTMLElement = HTMLDivElement>(itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of items
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, i * delay);
          }
          observer.unobserve(container);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemCount, delay]);

  return { containerRef, visibleItems };
};

// New advanced scroll hooks for journey experience
export const useScrollProgress = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate progress based on element's position in viewport
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      if (elementBottom < 0 || elementTop > windowHeight) {
        // Element is completely out of view
        setProgress(elementTop > windowHeight ? 0 : 1);
      } else {
        // Element is partially or fully in view
        const visibleHeight = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
        const totalScrollableHeight = elementHeight + windowHeight;
        const scrolled = windowHeight - elementTop;
        const progressValue = Math.max(0, Math.min(1, scrolled / totalScrollableHeight));
        setProgress(progressValue);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
};

export const useScrollTransform = <T extends HTMLElement = HTMLDivElement>(
  inputRange: number[], 
  outputRange: number[]
) => {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState(outputRange[0]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress for this element
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
      
      // Interpolate between input and output ranges
      const interpolate = (progress: number, input: number[], output: number[]) => {
        if (progress <= input[0]) return output[0];
        if (progress >= input[input.length - 1]) return output[output.length - 1];
        
        for (let i = 0; i < input.length - 1; i++) {
          if (progress >= input[i] && progress <= input[i + 1]) {
            const t = (progress - input[i]) / (input[i + 1] - input[i]);
            return output[i] + t * (output[i + 1] - output[i]);
          }
        }
        return output[0];
      };
      
      const transformValue = interpolate(scrollProgress, inputRange, outputRange);
      setTransform(transformValue);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inputRange, outputRange]);

  return { ref, transform };
};