import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const getContainingBlock = (element: HTMLElement | null) => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null) => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}: {
  targetSelector?: string;
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  hoverDuration?: number;
  parallaxOn?: boolean;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<(HTMLDivElement | null)[]>([]);
  const isHovering = useRef(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const containingBlock = useRef<HTMLElement | null>(null);

  const defaultCornerTransforms = useMemo(
    () => [
      'translate(-150%, -150%)',
      'translate(50%, -150%)',
      'translate(50%, 50%)',
      'translate(-150%, 50%)',
    ],
    []
  );

  const hoverCornerTransforms = useMemo(
    () => [
      'translate(-250%, -250%)',
      'translate(150%, -250%)',
      'translate(150%, 150%)',
      'translate(-250%, 150%)',
    ],
    []
  );

  const moveToMouse = useCallback(
    (x: number, y: number) => {
      if (!wrapperRef.current) return;
      const offset = getContainingBlockOffset(containingBlock.current);
      gsap.set(wrapperRef.current, { x: x - offset.x, y: y - offset.y });
    },
    []
  );

  const handleTargetEnter = useCallback(() => {
    isHovering.current = true;
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        gsap.to(corner, {
          clearProps: 'transform',
          duration: hoverDuration,
          onStart: () => {
            gsap.set(corner, { transform: hoverCornerTransforms[i] });
          },
        });
      }
    });
  }, [hoverDuration, hoverCornerTransforms]);

  const handleTargetLeave = useCallback(() => {
    isHovering.current = false;
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        gsap.to(corner, {
          clearProps: 'transform',
          duration: hoverDuration,
          onStart: () => {
            gsap.set(corner, { transform: defaultCornerTransforms[i] });
          },
        });
      }
    });
  }, [hoverDuration, defaultCornerTransforms]);

  useEffect(() => {
    containingBlock.current = getContainingBlock(wrapperRef.current);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      moveToMouse(e.clientX, e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(targetSelector)) {
        handleTargetEnter();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(targetSelector)) {
        handleTargetLeave();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      const style = document.createElement('style');
      style.id = 'target-cursor-hide';
      style.textContent = '* { cursor: none !important; }';
      document.head.appendChild(style);
    }

    // Spin animation
    let spinTween: gsap.core.Tween | null = null;
    if (wrapperRef.current) {
      const cornersContainer = wrapperRef.current.querySelector('.target-cursor-corners');
      if (cornersContainer) {
        spinTween = gsap.to(cornersContainer, {
          rotation: 360,
          duration: spinDuration,
          repeat: -1,
          ease: 'none',
        });
      }
    }

    // Parallax effect
    let parallaxRaf: number;
    if (parallaxOn) {
      const parallaxLoop = () => {
        const els = document.querySelectorAll('[data-parallax]');
        els.forEach((el) => {
          const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.05');
          const x = (mousePos.current.x - window.innerWidth / 2) * speed;
          const y = (mousePos.current.y - window.innerHeight / 2) * speed;
          gsap.to(el, { x, y, duration: 0.6, ease: 'power2.out' });
        });
        parallaxRaf = requestAnimationFrame(parallaxLoop);
      };
      parallaxRaf = requestAnimationFrame(parallaxLoop);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (hideDefaultCursor) {
        document.body.style.cursor = '';
        const style = document.getElementById('target-cursor-hide');
        if (style) style.remove();
      }
      if (spinTween) spinTween.kill();
      if (parallaxOn) cancelAnimationFrame(parallaxRaf);
    };
  }, [
    targetSelector,
    spinDuration,
    hideDefaultCursor,
    parallaxOn,
    moveToMouse,
    handleTargetEnter,
    handleTargetLeave,
  ]);

  return (
    <div ref={wrapperRef} className="target-cursor-wrapper">
      <div className="target-cursor-dot" />
      <div className="target-cursor-corners">
        {['tl', 'tr', 'br', 'bl'].map((pos, i) => (
          <div
            key={pos}
            ref={(el) => { cornersRef.current[i] = el; }}
            className={`target-cursor-corner corner-${pos}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TargetCursor;
